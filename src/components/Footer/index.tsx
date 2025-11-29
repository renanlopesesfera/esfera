// libraries
import Link from 'next/link'
import Image from 'next/image'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'

// utils
import { contact, pages, socialLinks } from '@/utils/routes'
import { email, getYear, phone } from '@/utils/functions'

export default function Footer() {

	const year = getYear(new Date().getFullYear().toString())

	return (
		<footer className='pb-35 md:pb-10 pt-14 sm:pt-17 bg-white'>
			<div className='base-container'>

				<div className='flex flex-col xl:flex-row xl:items-center xl:justify-between gap-2'>

					<ul className='flex flex-col xs:flex-row xs:flex-wrap sm:flex-nowrap xs:items-center xs:gap-5 sm:gap-6'>

						<li className='w-full sm:w-fit xl:hidden mb-4 xs:mb-0'>
							<MagneticButton>
								<Link
									href={pages.home}
									className='w-12 min-w-12 h-12 flex transition-opacity duration-200 hover:opacity-70'
								>
									<Image
										src='/img/svg/logo/icon-black.svg'
										alt='Esfera'
										width={65}
										height={65}
										loading='lazy'
										className='w-full h-full'
									/>
								</Link>
							</MagneticButton>
						</li>

						{[
							{
								label: 'Sobre',
								href: pages.about
							},
							{
								label: 'Serviços',
								href: pages.services
							},
							{
								label: 'Portfólio',
								href: pages.portfolio
							},
							{
								label: 'Contato',
								href: pages.contact
							}
						].map((item, i) => (
							<li key={i}>
								<MagneticButton>
									<Link
										href={item.href}
										className='hover-underline text-36 font-heading font-semibold uppercase max-xs:text-5xl!'
									>
										{item.label}
									</Link>
								</MagneticButton>
							</li>
						))}

					</ul>

					<div className='xl:flex xl:items-center xl:gap-6 mt-6 xl:mt-0'>

						<MagneticButton>
							<Link
								href={email(contact.email)}
								className='hover-underline-white text-24 max-xs:text-[4.5vw]!'
							>
								{contact.email}
							</Link>
						</MagneticButton>

						<MagneticButton>
							<Link
								href={pages.home}
								className='w-14 min-w-14 h-14 hidden xl:flex transition-opacity duration-200 hover:opacity-70'
							>
								<Image
									src='/img/svg/logo/icon-black.svg'
									alt='Esfera'
									width={65}
									height={65}
									loading='lazy'
									className='w-full h-full'
								/>
							</Link>
						</MagneticButton>

					</div>

				</div>

				<div className='flex xl:justify-end mt-10 xl:mt-19 mb-8 xl:mb-12'>
					<MagneticButton>
						<Link
							href={phone(contact.phone)}
							className='hover-underline text-gray-light text-20'
						>
							{contact.phone}
						</Link>
					</MagneticButton>
				</div>

				<div className='flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8 lg:gap-4'>

					<div className='flex flex-col sm:flex-row sm:items-center gap-5 lg:gap-7'>

						<ul className='flex gap-2 lg:gap-3'>
							{socialLinks.map((item, i) => (
								<li key={i}>
									<MagneticButton>
										<Link
											href={item.href}
											target='_blank'
											rel='noopener noreferrer'
											className='flex items-center justify-center w-12 lg:w-15 min-w-12 lg:min-w-15 h-12 lg:h-15 border border-gray-light text-gray-light rounded-full transition-colors duration-200 hover:text-white hover:bg-gray-medium hover:border-gray-medium p-4 lg:p-5'
											aria-label={item.name}
										>
											<item.icon className='w-full h-full' />
										</Link>
									</MagneticButton>
								</li>
							))}
						</ul>

						<p className='text-gray-light'>
							Agência Esfera © {year} <br />
							Todos os direitos reservados
						</p>

					</div>

					<MagneticButton className='lg:text-right'>
						<Link
							href={contact.gmaps}
							target='_blank'
							rel='noopener noreferrer'
							className='text-18 transition-opacity duration-200 hover:opacity-70'
						>
							<b className='font-semibold'>Av. Rep. Argentina, 1228</b> <br />
							Água Verde, Curitiba - PR, 80610-260
						</Link>
					</MagneticButton>

				</div>

			</div>
		</footer>
	)
}