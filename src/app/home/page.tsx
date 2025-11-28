// libraries
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

// components
import TagSwap from '@/components/TagSwap'
import ClientsSlider from '@/components/ClientsSlider'
import Portfolio from '@/components/Portfolio'

import TextReveal from '@/components/Utils/Animations/TextReveal'
import Counter from '@/components/Utils/Animations/Counter'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'

// utils
import { pages } from '@/utils/routes'

export default function Home() {
	return (
		<main>

			<div style={{ height: '100vh' }} />

			<section className='bg-white py-15 sm:py-20 mg:py-25'>
				<div className='base-container'>
					
					<div className='row'>
						<div className='col-lg-6 xl:pr-15!'>
							<TextReveal className='[&_.block-revealer]:h-[115%]!'>
								<p className='text-60 text-center lg:text-left'>
									Na <Link href={pages.about} className='relative font-semibold before:content-[""] before:absolute before:bottom-3 before:left-0 before:w-full before:h-1 before:bg-yellow before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100'>Esfera</Link> trabalhamos com energia, paixão e respeito.
								</p>
							</TextReveal>
						</div>
					</div>

					<StaggerUp
						className='flex flex-col lg:flex-row items-center justify-between gap-12 sm:gap-15 md:gap-25 lg:gap-5 xl:gap-10 2xl:gap-20 my-15 md:my-20 lg:my-25'
						infinite
					>
						{[
							{
								sub: '20ª Mostra de <br />Comunicação do Agro ABMRA',
								title: 'Ouro em Programa e <br />Campanha de Incentivo',
								text: 'Case: Expo Latin America <br />2021 John Deere'
							},
							{
								sub: 'Prêmio Live 2021',
								title: 'Ouro em Agência Regional <br />de Brand Experience'
							},
							{
								sub: 'Premio Caio 2024',
								title: 'Ouro em evento promocional',
								text: 'Case: M&T Expo 24 <br />John Deere & Wirtgen Group'
							}
						].map((item, i) => (
							<div
								key={i}
								className='relative flex flex-col items-center justify-center gap-1 text-center px-15 sm:px-25 lg:px-10 xl:px-14 2xl:px-16 lg:w-full'
							>

								<Image
									src='/img/svg/laurel-left.svg'
									alt='Lauréola'
									width={68}
									height={115}
									className='absolute top-1/2 -translate-y-1/2 left-0 z-0 w-15 sm:w-20 lg:w-12 xl:w-16 h-auto'
								/>

								{item.sub && (
									<p
										className='text-sm uppercase tracking-tight text-gray-light leading-[1.2]'
										dangerouslySetInnerHTML={{ __html: item.sub }}
									/>
								)}

								{item.title && (
									<h3
										className='text-18 uppercase tracking-tight font-semibold leading-[1.1]'
										dangerouslySetInnerHTML={{ __html: item.title }}
									/>
								)}

								{item.text && (
									<p
										className='text-sm uppercase tracking-tight text-gray-medium font-medium leading-[1.2] px-4'
										dangerouslySetInnerHTML={{ __html: item.text }}
									/>
								)}

								<Image
									src='/img/svg/laurel-right.svg'
									alt='Lauréola'
									width={68}
									height={115}
									className='absolute top-1/2 -translate-y-1/2 right-0 z-0 w-15 sm:w-20 lg:w-12 xl:w-16 h-auto'
								/>

							</div>
						))}
					</StaggerUp>

					<div className='flex items-center justify-center gap-4'>

						<div className='hidden lg:block w-2 h-2 min-w-2 rounded-full bg-yellow' />

						<AnimatedTitle
							className='font-heading uppercase text-30 font-bold text-gray-medium max-lg:text-4xl! text-center'
							style='gray-black'
						>
							Grandes conquistas rendem uma coleção de memórias únicas
						</AnimatedTitle>

						<div className='hidden lg:block w-2 h-2 min-w-2 rounded-full bg-yellow' />

					</div>

				</div>
			</section>

			<TagSwap />

			<section className='bg-black pt-10 pb-20 sm:pt-20 md:py-25 xl:py-30'>
				<div className='base-container'>

					<h2 className='font-heading uppercase text-100 font-semibold tracking-tighter text-white block mb-6 md:mb-10'>
						<AnimatedText text='Seu evento, nossa missão' />
					</h2>

					<TextReveal>
						<p className='text-30 text-yellow w-150 max-w-full leading-relaxed tracking-normal max-sm:text-base!'>
							A gente soma números com expertise e mostra resultados com orgulho.
						</p>
					</TextReveal>

					<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1fr_1.275fr_1fr_1fr] gap-10 sm:gap-y-15 md:gap-y-20 gap-x-7.5 mt-10 xs:mt-15 sm:mt-20'>
						{[
							{
								hasPlus: false,
								number: 26,
								text: 'Anos de <br />experiência'
							},
							{
								hasPlus: true,
								number: 6500,
								text: 'Projetos <br/>executados'
							},
							{
								hasPlus: true,
								number: 350,
								text: 'Clientes <br />satisfeitos'
							},
							{
								hasPlus: false,
								number: 25,
								text: 'Prêmios <br />no setor'
							}
						].map((item, i) => (
							<div key={i}>

								<div className='block w-full h-px bg-gray-dark' />

								<p className='block text-white text-sm my-5 sm:mb-10'>
									{i+1}
								</p>

								<div className='relative flex items-end gap-4'>

									{item.hasPlus && (
										<p className='absolute -top-2 sm:-top-4 left-0 sm:-left-2 text-white text-36 max-sm:text-base!'>
											+
										</p>
									)}

									<p className={clsx(
										'text-7xl sm:text-6xl md:text-7xl xl:text-[5vw] text-white tracking-tighter leading-none',
										item.hasPlus && 'pl-3'
									)}>
										<Counter number={item.number} />
									</p>

									<p
										className='text-gray-medium text-sm uppercase pb-2 tracking-normal'
										dangerouslySetInnerHTML={{ __html: item.text }}
									/>

								</div>

							</div>
						))}
					</div>

				</div>
			</section>

			<ClientsSlider />

			<Portfolio />

		</main>
	)
}
