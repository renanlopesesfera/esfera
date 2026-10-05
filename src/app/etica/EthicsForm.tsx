'use client'

// libraries
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { gsap } from 'gsap'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import { Label, Input, Textarea, Checkbox, Select, Submit } from '@/components/Form'

// svg
import UxFile from '@/assets/svg/ux/file.svg'

// utils
import { ATTACHMENT_EXTENSIONS, ETHICS_EMAIL, MAX_ATTACHMENT_MB, RELACOES, TEMAS, type Retorno } from '@/utils/ethics'

interface FormValues {
	retorno: Retorno
	email?: string
	nome?: string
	contato?: string
	relacao: string
	tema: string
	descricao: string
	quando: string
	envolvidos: string
	testemunhas: string
	jaRelatou: string
	anexo?: FileList
	website?: string
}

interface Sent {
	codigo: string
	retorno: Retorno
}

const RETORNO_OPTIONS: { value: Retorno, label: string }[] = [
	{ value: 'sem-retorno', label: 'Anônimo, sem retorno' },
	{ value: 'email-anonimo', label: 'Anônimo, com e-mail para retorno' },
	{ value: 'identificado', label: 'Quero me identificar' }
]

const getExtension = (fileName: string) => fileName.split('.').pop()?.toLowerCase() ?? ''

const readAttachment = (file?: File): Promise<{ nome: string, dados: string } | null> => {
	if (!file) return Promise.resolve(null)

	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => resolve({
			nome: file.name,
			dados: String(reader.result).split(',')[1]
		})
		reader.onerror = () => reject(new Error('anexo'))
		reader.readAsDataURL(file)
	})
}

const Help = ({ children }: { children: React.ReactNode }) => (
	<p className='text-xs text-gray-medium leading-relaxed mb-2'>
		{children}
	</p>
)

const Step = ({ title, children }: { title?: string, children: React.ReactNode }) => (
	<div className='mb-6 lg:mb-8 last:mb-0 first:border-t first:border-gray-lighter/60 first:pt-10 lg:first:pt-14'>
		<div className='row'>

			<div className='col-lg-4 mb-6 lg:mb-0'>
				{title && (
					<h3 className='font-heading text-36 font-semibold text-yellow uppercase'>
						{title}
					</h3>
				)}
			</div>

			<div className='col-lg-8 col-xl-6'>
				<div className='flex flex-col gap-2'>
					{children}
				</div>
			</div>

		</div>
	</div>
)

export default function EthicsForm() {

	const wrapper = useRef<HTMLDivElement>(null)
	const [sending, setSending] = useState(false)
	const [error, setError] = useState('')
	const [sent, setSent] = useState<Sent | null>(null)

	// shouldUnregister: hidden fields are never sent
	const methods = useForm<FormValues>({
		mode: 'onTouched',
		shouldUnregister: true,
		defaultValues: {
			retorno: 'sem-retorno'
		}
	})

	const retorno = methods.watch('retorno')
	const attachment = methods.watch('anexo')?.[0]

	const scrollToTop = () => {
		const viewport = document.getElementById('viewport')
		if (!viewport || !wrapper.current) return

		gsap.to(viewport, {
			scrollTop: viewport.scrollTop + wrapper.current.getBoundingClientRect().top - 140,
			duration: 1,
			ease: 'power1.inOut'
		})
	}

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		setError('')
		setSending(true)

		try {
			const contato = data.retorno === 'identificado'
				? data.contato
				: data.retorno === 'email-anonimo' ? data.email : ''

			const response = await fetch('/api/etica', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					retorno: data.retorno,
					nome: data.retorno === 'identificado' ? data.nome : '',
					contato,
					relacao: data.relacao,
					tema: data.tema,
					descricao: data.descricao,
					quando: data.quando,
					envolvidos: data.envolvidos,
					testemunhas: data.testemunhas,
					jaRelatou: data.jaRelatou,
					anexo: await readAttachment(data.anexo?.[0]),
					website: data.website
				})
			})

			const result = await response.json().catch(() => ({}))
			if (!response.ok || !result.ok) throw new Error(result.erro)

			setSent({ codigo: result.codigo, retorno: data.retorno })
			scrollToTop()
		} catch (e) {
			setError(e instanceof Error && e.message === 'anexo'
				? `Não foi possível enviar o anexo. Use um arquivo PDF, JPG, PNG, DOCX ou XLSX de até ${MAX_ATTACHMENT_MB} MB.`
				: `Não foi possível enviar agora. Tente de novo em alguns minutos ou escreva para ${ETHICS_EMAIL}.`
			)
		} finally {
			setSending(false)
		}
	}

	const startOver = () => {
		methods.reset()
		setSent(null)
		scrollToTop()
	}

	if (sent) {
		return (
			<div ref={wrapper}>
				<Step title='Relato recebido'>

					<p className='text-20 mb-4'>
						Seu relato foi registrado e será tratado pelo Comitê de Ética.
					</p>

					<p className='text-18 font-semibold mb-1'>
						Código de acompanhamento
					</p>

					<p
						className='w-fit bg-yellow text-black font-heading font-semibold text-60 tracking-wide rounded-lg px-6 py-3 mb-4 select-all'
						aria-live='polite'
					>
						{sent.codigo}
					</p>

					<div className='bg-gray-lightest border-l-4 border-yellow rounded-r-lg p-6 mb-4'>
						<p className='font-semibold mb-1'>
							Anote este código antes de fechar a página.
						</p>
						<p>
							Ele não é enviado por e-mail e não há como recuperá-lo depois. É com ele que você acompanha o caso e acrescenta informações, escrevendo para <b className='font-semibold break-all'>{ETHICS_EMAIL}</b> e citando apenas o código.
						</p>
					</div>

					{sent.retorno === 'sem-retorno' ? (
						<p>
							Como você não deixou nenhum contato, o retorno depende de você: escreva para o e-mail do Canal citando o código, quando quiser saber do andamento. A apuração é concluída em até 30 dias úteis, prazo que pode ser prorrogado uma vez em casos complexos, sempre com justificativa registrada.
						</p>
					) : (
						<p>
							Você receberá a confirmação de recebimento em até 5 dias úteis, no contato que informou. A apuração é concluída em até 30 dias úteis, prazo que pode ser prorrogado uma vez em casos complexos, sempre com justificativa registrada.
						</p>
					)}

					<MagneticButton className='mt-8'>
						<button
							type='button'
							className='button button--yellow'
							onClick={startOver}
						>
							Fazer outro relato
						</button>
					</MagneticButton>

				</Step>
			</div>
		)
	}

	return (
		<div ref={wrapper}>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className='[&[data-is-sending="true"]_[data-submit-text]]:opacity-0 [&[data-is-sending="true"]_[data-submit-spinner]]:opacity-100 [&[data-is-sending="true"]_[data-submit-button]]:pointer-events-none [&[data-is-sending="true"]_[data-submit-button]]:bg-black'
					data-is-sending={sending}
					noValidate
				>

					<Step title='Identificação'>

						<fieldset className='mb-4 sm:mb-6'>
							<legend className='block text-sm mb-3'>
								Como você quer receber o retorno?
							</legend>

							<div className='flex flex-col gap-3'>
								{RETORNO_OPTIONS.map((option) => (
									<Checkbox
										key={option.value}
										type='radio'
										id={`retorno-${option.value}`}
										name='retorno'
										value={option.value}
										label={option.label}
										checked={option.value === 'sem-retorno'}
										className='mb-0!'
									/>
								))}
							</div>
						</fieldset>

						{retorno === 'email-anonimo' && (
							<div>
								<Label id='email' label='E-mail para o retorno' required />
								<Help>
									Fica apenas com o Comitê de Ética e é usado só para responder este relato. Seu nome não é pedido. Atenção: se o seu e-mail contiver o seu nome, ele revela quem é você. Para manter o anonimato completo, use um endereço que não identifique você.
								</Help>
								<Input
									id='email'
									name='email'
									type='email'
									placeholder='Digite o e-mail para o retorno'
									autoComplete='off'
									hideLabel
									required
								/>
							</div>
						)}

						{retorno === 'identificado' && (
							<>
								<Input
									id='nome'
									name='nome'
									label='Nome'
									type='text'
									placeholder='Digite seu nome'
									autoComplete='off'
									maxLength={200}
								/>

								<div>
									<Label id='contato' label='Como podemos falar com você' required />
									<Help>
										E-mail ou telefone. Só será usado para o retorno sobre este relato.
									</Help>
									<Input
										id='contato'
										name='contato'
										type='text'
										placeholder='E-mail ou telefone'
										autoComplete='off'
										maxLength={200}
										hideLabel
										required
									/>
								</div>
							</>
						)}

						<Select
							id='relacao'
							name='relacao'
							label='Sua relação com a Esfera'
							placeholder='Prefiro não informar'
							options={RELACOES}
						/>

					</Step>

					{/* honeypot */}
					<div className='absolute -left-[9999px] w-px h-px overflow-hidden' aria-hidden='true'>
						<label htmlFor='website'>Não preencha este campo</label>
						<input
							type='text'
							id='website'
							tabIndex={-1}
							autoComplete='off'
							{...methods.register('website')}
						/>
					</div>

					<Step title='O relato'>

						<Select
							id='tema'
							name='tema'
							label='Tema'
							placeholder='Prefiro não classificar'
							options={TEMAS}
						/>

						<div>
							<Label id='descricao' label='O que aconteceu' required />
							<Help>
								Descreva com o máximo de detalhe que conseguir. Quanto mais concreto, maior a chance de a apuração chegar a algum lugar. Evite incluir dados pessoais que não sejam necessários.
							</Help>
							<Textarea
								id='descricao'
								name='descricao'
								placeholder='Descreva o que aconteceu'
								maxLength={20000}
								hideLabel
								required
							/>
						</div>

						<Input
							id='quando'
							name='quando'
							label='Quando aconteceu e com que frequência'
							type='text'
							placeholder='Ex.: desde março, quase toda semana'
							autoComplete='off'
							maxLength={500}
						/>

						<Input
							id='envolvidos'
							name='envolvidos'
							label='Quem está envolvido'
							type='text'
							placeholder='Nomes, cargos ou áreas'
							autoComplete='off'
							maxLength={500}
						/>

						<Input
							id='testemunhas'
							name='testemunhas'
							label='Há testemunhas? Quem?'
							type='text'
							placeholder='Nomes, cargos ou áreas'
							autoComplete='off'
							maxLength={500}
						/>

						<div className='relative block w-full mb-2 sm:mb-4'>
							<Label id='anexo' label='Evidência (opcional)' />
							<Help>
								Documento, mensagem, foto ou outro arquivo: PDF, JPG, PNG, DOCX ou XLSX, até {MAX_ATTACHMENT_MB} MB. Arquivos de texto e planilhas podem guardar o nome de quem os criou; se isso importa para você, prefira um PDF ou uma captura de tela.
							</Help>

							<label
								htmlFor='anexo'
								className={clsx(
									'flex items-center gap-3 w-full border border-dashed rounded-md p-4 cursor-pointer transition-colors duration-200 hover:border-black has-[input:focus-visible]:outline-1 has-[input:focus-visible]:outline-gray-light',
									methods.formState.errors.anexo ? 'border-red-600 text-red-600' : 'border-gray-lighter'
								)}
							>
								<UxFile className='w-4 min-w-4 h-4 [&>path]:fill-current' />
								<span className='text-sm truncate'>
									{attachment ? attachment.name : 'Selecionar arquivo'}
								</span>
								<input
									type='file'
									id='anexo'
									accept={ATTACHMENT_EXTENSIONS.map((ext) => `.${ext}`).join(',')}
									className='sr-only'
									{...methods.register('anexo', {
										validate: (files) => {
											const file = files?.[0]
											if (!file) return true
											if (!ATTACHMENT_EXTENSIONS.includes(getExtension(file.name))) return 'Formato não aceito'
											if (file.size > MAX_ATTACHMENT_MB * 1024 * 1024) return `O arquivo passa de ${MAX_ATTACHMENT_MB} MB`
											return true
										}
									})}
								/>
							</label>

							{methods.formState.errors.anexo && (
								<p className='text-[.5rem] text-white px-1 py-px absolute z-2 bg-red-600 -bottom-2 right-4 rounded-xs'>
									{String(methods.formState.errors.anexo.message)}
								</p>
							)}
						</div>

						<Input
							id='jaRelatou'
							name='jaRelatou'
							label='Você já relatou isso a alguém na empresa?'
							type='text'
							placeholder='A quem e quando'
							autoComplete='off'
							maxLength={500}
						/>

						{error && (
							<p className='text-sm text-red-600 font-semibold mt-4' role='alert'>
								{error}
							</p>
						)}

						<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mt-4 sm:mt-6'>

							<p className='text-xs text-gray-medium leading-relaxed sm:max-w-80'>
								O tratamento dos dados deste formulário segue a Lei nº 13.709/2018 (LGPD) e se limita ao necessário para a apuração.
							</p>

							<MagneticButton className='max-sm:w-full!'>
								<Submit
									text='Enviar relato'
									className='max-sm:w-full! whitespace-nowrap'
									disabled={sending}
								/>
							</MagneticButton>

						</div>

					</Step>

				</form>
			</FormProvider>
		</div>
	)
}
