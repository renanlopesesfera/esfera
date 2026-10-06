// components
import MultiText from '@/components/PortfolioBlocks/MultiText'
import EthicsForm from './EthicsForm'

export const metadata = {
	title: 'Ética e Conduta Agência Esfera: Código de Ética | Canal de Denúncia',
	description: 'Código de Ética Esfera e canal seguro e confidencial para relatar, de forma anônima, condutas em desacordo com o Código.',
	canonical: '/etica',
	referrer: 'no-referrer',
	robots: {
		index: false,
		follow: false
	}
}

export default function Ethics() {
	return (
		<main>

			<section className='bg-white pt-35 md:pt-40 xl:pt-50 pb-16 sm:pb-28 lg:pb-32'>
				<div className='base-container'>
					<div className='row'>
						<div className='col-lg-8 col-xl-6'>

							<h1 className='text-100 font-heading font-semibold uppercase tracking-tighter'>
								Ética e Conduta
							</h1>

						</div>
					</div>
				</div>
			</section>

			<MultiText
				subTitle='Canal de Denúncia'
				wide
			>
				<p className='text-20 leading-relaxed!'>
					Deixe seu relato sobre a ocorrência.
				</p>
			</MultiText>

			<section className='pb-15 sm:pb-20 md:pb-25 xl:pb-30'>
				<div className='base-container'>
					<EthicsForm />
				</div>
			</section>

		</main>
	)
}
