// libraries
import clsx from 'clsx'
import Link from 'next/link'

// components
import { Form, Input, InputHidden, Submit, Textarea, Select, Checkbox } from '@/components/Form'

// css
import styles from './index.module.scss'

// svg
import UxPhone from '@/assets/svg/ux/phone.svg'
import UxEmail from '@/assets/svg/ux/envelope.svg'

// utils
import { phone, email } from '@/utils/functions'
import { pages } from '@/utils/routes'
import { countries } from '@/utils/countries'

export const metadata = {
	title: 'Contact PureKana CBD: Address | Phone | Email | Social Media',
	description: 'Contact PureKana for current answers regarding CBD Oil questions, questions about our returns and refunds policy, or concerns about product use or product availability.',
	canonical: '/contact'
}

export default function Contact() {
	return (
		<main className={styles.page}>

			<p>
				Banner goes here
			</p>

			<section className={clsx(styles.formSection, 'pb-small')}>
				<div className='container'>
					<div className='row'>
						
						<div className={clsx(styles.flex, 'col-md-6 pb-smaller pb-md-0 py-xl-smaller pr-md-smaller pr-xl-small')}>

						</div>

						<div className={clsx(styles.form, 'col-md-6')}>
							<Form
								className={styles.form}
								endpoint='#'
								onSuccess={{
									title: 'Success',
									text: 'We have received your message. We will review your message and get back to you as soon as possible.'
								}}
								onError={{
									title: 'Error',
									text: 'An error occurred while submitting your message, please try again in a few minutes. <br /><br />If the problem persists, contact us directly via email: <a href="mailto:info@purekana.com"><u>info@purekana.com</u></a>.'
								}}
								clearOnSubmit
								//isFormData
							>

								<InputHidden
									name='Sent from'
									id='sent-from'
									value='Contact Us page'
								/>

								<div className='row'>

									<div className='col-xl-6'>
										<Input
											label='Name'
											name='Name'
											type='text'
											required
											id='name'
											placeholder='Type here'
										/>
									</div>

									<div className='col-xl-6'>
										<Input
											label='Last Name'
											name='Last Name'
											type='text'
											required
											id='last-name'
											placeholder='Type here'
										/>
									</div>

									<div className='col-xl-6'>
										<Input
											label='Email'
											name='Email'
											type='email'
											required
											id='email'
											placeholder='Type here'
										/>
									</div>

									<div className='col-xl-6'>
										<Select
											label='Country / Region'
											name='Country / Region'
											defaultValue=''
											id='country-region'
											required
										>

											<option value='' disabled>Select one</option>

											{countries.map((country) => (
												<option key={country.name} value={country.name}>
													{country.name}
												</option>
											))}

										</Select>
									</div>

								</div>

								<Textarea
									label='Message'
									name='Message'
									id='message'
									placeholder='Type here'
									required
								/>

								<div className={styles.bottom}>

									<div className={clsx(styles.left, 'relative')}>

										<p className='text-12 mb-half'>
											We will process your personal data according to our <Link href={pages.privacy} className='hover-underline'>Terms and Conditions</Link>.
										</p>

										<Checkbox
											label='I agree to the Terms and Conditions'
											id='terms'
											required
											type='checkbox'
											name='Terms'
										/>

									</div>

									<Submit
										style='solid'
										text='Submit'
									/>

								</div>

							</Form>
						</div>

					</div>
				</div>
			</section>

		</main>
	)
}
