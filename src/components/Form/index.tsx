'use client'

// libraries
import clsx from 'clsx'
import React, { useRef, useState, useEffect } from 'react'
import { useForm, FormProvider, useFormContext, SubmitHandler, RegisterOptions } from 'react-hook-form'

// components
import Fancybox from '@/components/Utils/Fancybox'

// svg
import UxEye from '@/assets/svg/ux/eye.svg'
import UxEyeSlash from '@/assets/svg/ux/eye-slash.svg'
import UxChevronDown from '@/assets/svg/ux/chevron-down.svg'
import UxSpinner from '@/assets/svg/ux/spinner.svg'
import UxCheck from '@/assets/svg/ux/check.svg'
import UxClose from '@/assets/svg/ux/close.svg'
import UxFile from '@/assets/svg/ux/file.svg'

// css
import styles from './form.module.scss'

export interface FormProps {
	className?: string
	children: React.ReactNode
	endpoint: string
	isFormData?: boolean
	onSuccess: {
		title: string
		text: string
	}
	onError: {
		title: string
		text: string
	}
	clearOnSubmit?: boolean
}

interface FormValues {
	[key: string]: any
}

export const Form = ({
	className,
	children,
	endpoint,
	isFormData,
	onSuccess,
	onError,
	clearOnSubmit
}: FormProps) => {
	// refs
	const form = useRef<HTMLFormElement>(null)
	const popupSuccess = useRef<HTMLAnchorElement>(null)
	const popupError = useRef<HTMLAnchorElement>(null)

	// useState to make the Modals invisible
	const [ renderSuccessModal, setRenderSuccessModal ] = useState(false)
	const [ renderErrorModal, setRenderErrorModal ] = useState(false)

	// close success modal
	const closeSuccessModal = () => {
		setRenderSuccessModal(false)
	}

	// close error modal
	const closeErrorModal = () => {
		setRenderErrorModal(false)
	}

	// form validations
	const methods = useForm({
		criteriaMode: 'all',
		mode: 'all'
	})

	// local state for any global errors
	const [globalError, setGlobalError] = useState('')

	// submit function
	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		// clear any old error messages
		setGlobalError('')

		// fake response time (1s)
		let fakeTimer = 1000

		if (form.current) {
			;(form.current as HTMLElement).classList.add('is-sending')
			document.dispatchEvent(new Event('formSending'))
		}

		let body

		if (isFormData) {
			const formData = new FormData()

			Object.keys(data).forEach((key) => {
				formData.append(key, data[key])
			})

			body = formData
		} else {
			body = JSON.stringify(data)
		}

		fetch(endpoint, {
			method: 'post',
			body: body
		})
			.then(async (response) => {
				if (!response.ok) {
					// if the response is not ok, we try to parse the error message
					const errBody = await response.json().catch(() => ({}))
					const message = errBody.message || 'Something went wrong'
					throw new Error(message)
				}

				// if response is ok, parse the JSON
				return response.json()
			})

			// if success
			.then((responseData) => {
				if (onSuccess) {
					setRenderSuccessModal(true)

					setTimeout(() => {	
						popupSuccess?.current?.click()

						if (form.current) {
							form.current.classList.remove('is-sending')
							document.dispatchEvent(new Event('formSent'))

							if (clearOnSubmit) {
								form?.current?.reset()
								document.dispatchEvent(new Event('formReset'))
							}
						}
					}, fakeTimer)
				}
			})

			// if error
			.catch((error) => {
				setTimeout(() => {
					//console.error('Error:', error)
					setGlobalError(error.message)
				}, fakeTimer)

				if (onError) {
					setRenderErrorModal(true)

					setTimeout(() => {
						popupError?.current?.click()

						if (form.current) {
							form.current.classList.remove('is-sending')
							document.dispatchEvent(new Event('formError'))
						}
					}, fakeTimer)
				}
			})
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className={clsx(styles.form, className)}
				ref={form}
			>
				{children}
			</form>

			{renderSuccessModal && 
                <Fancybox>
                    
                    <a
                        ref={popupSuccess}
                        href='#popup-success'
                        data-fancybox
                        style={{
                            position: 'absolute',
                            visibility: 'hidden'
                        }}
                    ></a>

                    <div id='popup-success' className={styles.popup}>
                        <div className={styles.wrap}>
                    
                            <h2 className='text-40 medium purple'>
                                <b>
                                    {onSuccess.title}
                                </b>
                            </h2>
                    
                            <div
								className={clsx(styles.content, 'mt-1 mb-2')}
								dangerouslySetInnerHTML={{ __html: onSuccess.text }}
							/>
                    
                            <button
								className='button button--hollow'
								data-fancybox-close
								onClick={closeSuccessModal}
							>
                                Close
                            </button>
                    
                        </div>
                    </div>
                </Fancybox>
            }

            { renderErrorModal &&
                <Fancybox>

                    <a
                        ref={popupError}
                        href='#popup-error'
                        data-fancybox
                        style={{
                            position: 'absolute',
                            visibility: 'hidden'
                        }}
                    ></a>

                    <div id='popup-error' className={styles.popup}>
                        <div className={styles.wrap}>
                    
                            <h2 className='text-40 medium purple'>
                                <b>
                                    {onError.title}
                                </b>
                            </h2>
                    
                            <div
								className={clsx(styles.content, 'mt-1 mb-2')}
								dangerouslySetInnerHTML={{ __html: onError.text }}
							/>
                    
                            <button
								className='button button--hollow'
								data-fancybox-close
								onClick={closeErrorModal}
							>
                                Close
                            </button>
                    
                        </div>
                    </div>
                </Fancybox>
            }
		</FormProvider>
	)
}

export const FormPHP = ({
	className,
	children,
	endpoint,
	isFormData = true,
	onSuccess,
	onError,
	clearOnSubmit
  }: FormProps) => {
	const form = useRef<HTMLFormElement>(null);
	const popupSuccess = useRef<HTMLAnchorElement>(null);
	const popupError = useRef<HTMLAnchorElement>(null);
	const [renderSuccessModal, setRenderSuccessModal] = useState(false);
	const [renderErrorModal, setRenderErrorModal] = useState(false);
	const [globalError, setGlobalError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
  
	const methods = useForm({
	  criteriaMode: 'all',
	  mode: 'all'
	});
  
	const closeSuccessModal = () => setRenderSuccessModal(false);
	const closeErrorModal = () => setRenderErrorModal(false);
  
	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		if (isSubmitting) return;
		setIsSubmitting(true);

		setGlobalError('');
		
		if (form.current) {
		  form.current.classList.add('is-sending');
		  document.dispatchEvent(new Event('formSending'));
		}
	  
		try {
		  const formData = new FormData(form.current!);
	  
		  const response = await fetch(endpoint, {
			method: 'POST',
			body: formData
		  });
	  
		  if (!response.ok) {
			const errorText = await response.text();
			throw new Error(errorText || 'Failed to submit form');
		  }
	  
		  setRenderSuccessModal(true);
		  setTimeout(() => {
			popupSuccess?.current?.click();
			if (form.current) {
			  form.current.classList.remove('is-sending');
			  document.dispatchEvent(new Event('formSent'));
			  if (clearOnSubmit) {
				form.current.reset();
				document.dispatchEvent(new Event('formReset'));
			  }
			}
		  }, 1000);
	  
		} catch (error) {
		  console.error('Submission error:', error);
		  
		  if (error instanceof Error) {
			setGlobalError(error.message);
		  } else {
			setGlobalError('An unknown error occurred');
		  }
		  
		  setRenderErrorModal(true);
		  
		  setTimeout(() => {
			popupError?.current?.click();
			if (form.current) {
			  form.current.classList.remove('is-sending');
			  document.dispatchEvent(new Event('formError'));
			}
		  }, 1000);
		} finally {
			setIsSubmitting(false);
		}
	  };
  
	return (
	  <FormProvider {...methods}>
		<form
		  onSubmit={methods.handleSubmit(onSubmit)}
		  className={clsx(styles.form, className)}
		  ref={form}
		>
		  {children}
		</form>
  
		{renderSuccessModal && (
		  <Fancybox>
			<a ref={popupSuccess} href="#popup-success" data-fancybox style={{ position: 'absolute', visibility: 'hidden' }}></a>
			<div id="popup-success" className={styles.popup}>
			  <div className={styles.wrap}>
				<h2 className="text-40 medium purple">
				  <b>{onSuccess.title}</b>
				</h2>
				<div className={clsx(styles.content, 'mt-1 mb-2')} dangerouslySetInnerHTML={{ __html: onSuccess.text }} />
				<button className="button button--hollow" data-fancybox-close onClick={closeSuccessModal}>
				  Close
				</button>
			  </div>
			</div>
		  </Fancybox>
		)}
  
		{renderErrorModal && (
		  <Fancybox>
			<a ref={popupError} href="#popup-error" data-fancybox style={{ position: 'absolute', visibility: 'hidden' }}></a>
			<div id="popup-error" className={styles.popup}>
			  <div className={styles.wrap}>
				<h2 className="text-40 medium purple">
				  <b>{onError.title}</b>
				</h2>
				<div className={clsx(styles.content, 'mt-1 mb-2')} dangerouslySetInnerHTML={{ __html: onError.text }} />
				<button className="button button--hollow" data-fancybox-close onClick={closeErrorModal}>
				  Close
				</button>
			  </div>
			</div>
		  </Fancybox>
		)}
	  </FormProvider>
	);
  };

export interface InputProps {
	id: string
	label?: string
	name: string
	hideLabel?: boolean
	type: string
	placeholder: string
	className?: string
	required?: boolean
	maxLength?: number
	minLength?: number
	hideValidations?: boolean
	hidePasswordToggle?: boolean
	disabled?: boolean
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
	match?: string
	noMargin?: boolean
	isWhite?: boolean
}

export const Input = ({
	id,
	label,
	name,
	hideLabel,
	type,
	placeholder,
	className,
	required,
	maxLength,
	minLength,
	hideValidations,
	hidePasswordToggle,
	disabled,
	onChange = () => {},
	onKeyDown,
	match,
	noMargin,
	isWhite
}: InputProps) => {
	const {
		register,
		watch,
		formState: { errors }
	} = useFormContext()

	// watch the input value
	const inputValue = watch(name)

	// track focus state
	const [isFocused, setIsFocused] = useState(false)

	let validations: RegisterOptions = {
		onChange: (e) => onChange(e),
		required
	}

	if (match) {
		validations.validate = (value) =>
			value === watch(match) || 'Password does not match'
	}

	let text = type === 'password' ? 'password' : 'message'

	if (!hideValidations) {
		validations = {
			...validations,
			required: required && 'This field is required',
			maxLength: maxLength && {
				value: maxLength,
				message: `Maximum characters exceeded`
			},
			minLength: minLength && {
				value: minLength,
				message: `The ${text} is too short`
			}
		}

		// add pattern validation for email type
		if (type === 'email') {
			validations = {
				...validations,
				pattern: {
					value: /\S+@\S+\.\S+/,
					message: 'Invalid email'
				}
			} as {
				required: string | false | undefined
				maxLength: | 0 | {
					value: number
					message: string
				} | undefined
				minLength: | 0 | {
					value: number
					message: string
				} | undefined
				pattern: {
					value: RegExp
					message: string
				}
			}
		}
	}

	// track visibility for password fields
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	// decide which input type to use (if 'password', swap to 'text' when toggled)
	const currentInputType =
		type === 'password' && isPasswordVisible ? 'text' : type

	const handleTogglePassword = () => {
		setIsPasswordVisible(!isPasswordVisible)
	}

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && onKeyDown) {
			onKeyDown(event)
		}
	}

	// determine whether the label should shrink based on focus or input value
	const shouldShrinkLabel = isFocused || (inputValue && inputValue !== '')

	return (
		<>
			<div
				className={clsx(
					styles.formLine,
					className,
					!hideValidations && errors[name] && styles.error,
					noMargin && styles.noMargin,
					isWhite && styles.isWhite
				)}
				data-form-line
			>
				{!hideLabel && (
					<label
						className={clsx(styles.label, 'text-16')}
						htmlFor={id}
						data-shrink={shouldShrinkLabel ? 'false' : 'true'}
						data-label
					>
						{label}{' '}
						{required && !hideValidations && (
							<span className='red'>*</span>
						)}
					</label>
				)}

				<div className={styles.lineWrapper}>
					<input
						type={currentInputType}
						id={id}
						placeholder={placeholder}
						className={styles.input}
						disabled={disabled || false}
						onKeyDown={handleKeyPress}
						onFocus={() => setIsFocused(true)}
						{...register(name, {
							...validations,
							onBlur: () => {
								setIsFocused(false)
							}
						})}
					/>

					{type === 'password' && !hidePasswordToggle && (
						<button
							className={styles.sideIcon}
							onClick={handleTogglePassword}
							type='button'
						>
							{isPasswordVisible ? <UxEyeSlash /> : <UxEye />}
						</button>
					)}
				</div>

				{!hideValidations && errors[name] && (
					<p className={styles.errorMsg}>
						{String(errors[name].message)}
					</p>
				)}

			</div>
		</>
	)
}

export interface SelectProps {
	id: string
	label?: string
	name: string
	hideLabel?: boolean
	className?: string
	required?: boolean
	hideValidations?: boolean
	defaultValue?: string
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
	children: React.ReactNode
	disabled?: boolean
	noMargin?: boolean
	isWhite?: boolean
}

export const Select = ({
	id,
	label,
	name,
	hideLabel,
	className,
	required,
	hideValidations,
	defaultValue,
	onChange = () => {},
	children,
	disabled,
	noMargin,
	isWhite
}: SelectProps) => {
	const {
		register,
		watch,
		formState: { errors }
	} = useFormContext()

	// watch the input value
	const inputValue = watch(name)

	// track focus state
	const [isFocused, setIsFocused] = useState(false)

	let validations: RegisterOptions = {
		onChange: (e) => onChange(e),
		required
	}

	if (!hideValidations) {
		validations = {
			required: required && 'This field is required'
		}
	}

	// determine whether the label should shrink based on focus or input value
	const shouldShrinkLabel = isFocused || (inputValue && inputValue !== '')

	return (
		<div
			className={clsx(
				styles.formLine,
				className,
				!hideValidations && errors[name] && styles.error,
				noMargin && styles.noMargin,
				isWhite && styles.isWhite
			)}
			data-form-line
		>
			{!hideLabel && (
				<label
					className={clsx(styles.label, 'text-16')}
					htmlFor={id}
					data-shrink={shouldShrinkLabel ? 'false' : 'true'}
				>
					{label}{' '}
					{required && !hideValidations && (
						<span className='red'>*</span>
					)}
				</label>
			)}

			<div className={styles.lineWrapper}>
				<select
					id={id}
					className={clsx(styles.input, styles.select)}
					defaultValue={defaultValue}
					disabled={disabled || false}
					{...register(name, {
						onChange: (e) => onChange && onChange(e),
						...validations
					})}
				>
					{children}
				</select>

				<span className={styles.sideIcon}>
					<UxChevronDown />
				</span>
			</div>

			{!hideValidations && errors[name] && (
				<p className={styles.errorMsg}>
					{String(errors[name].message)}
				</p>
			)}
		</div>
	)
}

export interface TextareaProps {
	id: string
	label?: string
	name: string
	hideLabel?: boolean
	placeholder?: string
	className?: string
	required?: boolean
	maxLength?: number
	minLength?: number
	hideValidations?: boolean
	noMargin?: boolean
	isWhite?: boolean
}

export const Textarea = ({
	id,
	label,
	name,
	hideLabel,
	placeholder,
	required,
	minLength,
	maxLength,
	className,
	hideValidations,
	noMargin,
	isWhite
}: TextareaProps) => {
	const {
		watch,
		register,
		formState: { errors }
	} = useFormContext() ?? {}

	// watch the input value
	const textareaValue = watch(name)

	// track focus state
	const [isFocused, setIsFocused] = useState(false)

	let validations = {}

	if (!hideValidations) {
		validations = {
			required: required && 'This field is required',
			maxLength: maxLength && {
				value: maxLength,
				message: `Maximum characters exceeded`
			},
			minLength: minLength && {
				value: minLength,
				message: `The message is too short`
			}
		}
	}

	// determine whether the label should shrink based on focus or input value
	const shouldShrinkLabel = isFocused || (textareaValue && textareaValue !== '')

	return (
		<div
			className={clsx(
				styles.formLine,
				className,
				!hideValidations && errors[name] && styles.error,
				noMargin && styles.noMargin,
				isWhite && styles.isWhite
			)}
		>
			{!hideLabel && (
				<label
					className={clsx(styles.label, 'text-16')}
					htmlFor={id}
					data-shrink={shouldShrinkLabel ? 'false' : 'true'}
				>
					{label}{' '}
					{required && !hideValidations && (
						<span className='red'>*</span>
					)}
				</label>
			)}

			<div className={styles.lineWrapper}>
				<textarea
					id={id}
					placeholder={placeholder}
					className={clsx(styles.input, styles.textarea)}
					onFocus={() => setIsFocused(true)}
					{...register(name, {
						...validations,
						onBlur: () => {
							setIsFocused(false)
						}
					})}
				/>
			</div>

			{!hideValidations && errors[name] && (
				<p className={styles.errorMsg}>
					{String(errors[name].message)}
				</p>
			)}
		</div>
	)
}

export interface InputHiddenProps {
	name: string
	value: string
	id: string
}

export const InputHidden = ({
	name,
	value,
	id
}: InputHiddenProps) => {
	const { register } = useFormContext() ?? {}

	return (
		<input
			type='hidden'
			id={id}
			value={value}
			{...register(name)}
		/>
	)
}

export interface SubmitProps {
	style: 'solid' | 'hollow' | 'hollow-white' | 'white'
	text: string
	className?: string
	disabled?: boolean
	isLoading?: boolean,
	onClick?: () => void
}

export const Submit = ({
	style,
	text,
	className,
	disabled,
	isLoading,
	onClick
}: SubmitProps) => {
	return (
		<button
			className={clsx(
				styles.submit,
				className,
				'button',
				style === 'solid' && 'button--purple',
				style === 'hollow' && 'button--hollow',
				style === 'hollow-white' && 'button--hollow-white',
				style === 'white' && 'button--white',
				isLoading && 'button--loading'
			)}
			type='submit'
			disabled={disabled}
			onClick={onClick}
		>
			<span className='button__text'>{text}</span>

			<span className='button__loading'>
				<span className='rotation' style={{ '--speed': '.3' } as any}>
					<UxSpinner />
				</span>
			</span>
		</button>
	)
}

export interface CheckboxProps {
	type: 'checkbox' | 'radio'
	id: string
	label: string
	name: string
	className?: string
	required?: boolean
	hideValidations?: boolean
	disabled?: boolean
	checked?: boolean
	noMargin?: boolean
	isWhite?: boolean
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = ({
	type,
	id,
	label,
	name,
	className,
	required,
	hideValidations,
	disabled,
	checked,
	noMargin,
	isWhite,
	onChange = () => {}
}: CheckboxProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext()

	let validations: RegisterOptions = {
		onChange: (e) => onChange(e),
		required
	}

	if (!hideValidations) {
		validations = {
			...validations,
			required: required && 'This field is required'
		}
	}

	return (
		<>
			<label
				htmlFor={id}
				className={clsx(
					styles.radioWrapper,
					className,
					noMargin && styles.noMargin,
					isWhite && styles.isWhite
				)}
				data-error={errors[name] ? true : false}
				data-label
				data-checkbox
			>
				<input
					type={type}
					id={id}
					className={styles.checkbox}
					defaultChecked={checked}
					disabled={disabled || false}
					value={label}
					{...register(name, { ...validations })}
				/>

				<span className={styles.radioWrapperInner}>

					<span className={styles.radioBox} data-radio-box>
						<UxCheck />
					</span>

					<span className={styles.radioText} data-radio-text>
						{label}
					</span>
					
				</span>
			</label>

			{!hideValidations && errors[name] && (
				<p className={clsx(styles.errorMsg, styles.errorMsgCheckbox)} data-error-msg>
					{String(errors[name].message)}
				</p>
			)}
		</>
	)
}

export interface UploadProps {
	id: string
	label?: string
	name: string
	hideLabel?: boolean
	text: string
	className?: string
	required?: boolean
	accept: string
	maxFileSize?: number
	hideValidations?: boolean
	allowMultipleFiles?: boolean
	disabled?: boolean
	noMargin?: boolean
	isWhite?: boolean
	uploadButtonText: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Upload = ({
	id,
	label,
	name,
	hideLabel,
	text,
	className,
	required,
	maxFileSize,
	accept,
	hideValidations,
	allowMultipleFiles,
	disabled,
	noMargin,
	isWhite,
	uploadButtonText,
	onChange
}: UploadProps) => {
	const [files, setFiles] = useState<File[]>([])

	const formContext = useFormContext()
	const register = formContext ? formContext.register : () => ({})
	const errors = formContext ? formContext.formState.errors : {}

	let validations: RegisterOptions = {
		required
	}

	if (!hideValidations) {
		validations = {
			required: required && 'This field is required',
			validate: {
				maxFileSize: (value: FileList) => {
					if (!value?.length) return true

					// if multiple files, check each one
					for (const file of Array.from(value)) {
						if (file.size > (maxFileSize as number) * 1024 * 1024) {
							return `One of your files is too large (max ${maxFileSize} MB)`
						}
					}

					return true
				}
			}
		}
	}

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files
		if (selectedFiles) {
			const max_file_size = maxFileSize
				? maxFileSize * 1024 * 1024
				: 10 * 1024 * 1024
			const newFiles: File[] = []

			for (let i = 0; i < selectedFiles.length; i++) {
				const file = selectedFiles[i]

				if (file.size > max_file_size) {
					return
				}

				// only add the file if it's not already in the state
				if (
					!files.some(
						(existingFile) => existingFile.name === file.name
					)
				) {
					newFiles.push(file)
				}
			}

			// append the new files to the existing ones
			setFiles((prevFiles) => [...prevFiles, ...newFiles])
			const fileInput = document.getElementById(id) as HTMLInputElement
			const newFilesDT = new DataTransfer()

			if (fileInput) {
				;(files || []).concat(newFiles).forEach((f) => {
					newFilesDT.items.add(f)
				})

				fileInput.files = newFilesDT.files
			}

			if (onChange) {
				onChange(event)
			}
		}
	}

	const handleRemoveFile = (fileNameToRemove: string) => {
		const updatedFiles = files.filter(
			(file) => file.name !== fileNameToRemove
		)

		setFiles(updatedFiles)
		const fileInput = document.getElementById(id) as HTMLInputElement

		if (updatedFiles.length === 0) {
			document.dispatchEvent(new Event('fileDeleted'))
		}

		if (fileInput && fileInput.files) {
			const newFiles = new DataTransfer()

			Array.from(fileInput.files).forEach((file) => {
				if (file.name != fileNameToRemove) {
					newFiles.items.add(file)
				}
			})

			fileInput.files = newFiles.files
		}
	}

	useEffect(() => {
		document.addEventListener('formReset', () => {
			setFiles([])
		})
	}, [])

	return (
		<div
			className={clsx(
				styles.formLine,
				className,
				!hideValidations && errors[name] && styles.error,
				noMargin && styles.noMargin,
				isWhite && styles.isWhite
			)}
		>
			{!hideLabel && (
				<label
					className={clsx(styles.label, 'text-16')}
					htmlFor={id}
					data-shrink='false'
				>
					{label}{' '}
					{required && !hideValidations && (
						<span className='red'>*</span>
					)}
				</label>
			)}

			<div
				className={clsx(styles.lineWrapper, styles.uploadWrapper)}
				data-has-files={files.length > 0 ? 'true' : 'false'}
			>
				<input
					type='file'
					multiple={allowMultipleFiles}
					accept={accept}
					id={id}
					className={styles.input}
					disabled={disabled || false}
					{...register(name, {
						...validations,
						onChange: handleFileChange
					})}
				/>

				<div className={styles.uploadText}>
					{files.length
						? files.map((file, i) => (
								<button
									type='button'
									className={styles.uploadedFiles}
									key={i}
									onClick={() => handleRemoveFile(file.name)}
								>
									{file.name}

									<span>
										<UxClose />
									</span>
								</button>
							))
						: null}

					<label
						htmlFor={id}
						dangerouslySetInnerHTML={{ __html: text }}
						className={styles.placeholder}
					/>
				</div>

				<label
					htmlFor={id}
					className={clsx(styles.button, 'button button--purple')}
				>
					<span>{uploadButtonText}</span> <UxFile />
				</label>
			</div>

			{!hideValidations && errors[name] && (
				<p className={styles.errorMsg}>
					{String(errors[name].message)}
				</p>
			)}
		</div>
	)
}
