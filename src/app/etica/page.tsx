// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import MultiText from '@/components/PortfolioBlocks/MultiText'
import EthicsForm from './EthicsForm'

// svg
import UxDownload from '@/assets/svg/ux/download.svg'

// utils
import { documents } from '@/utils/routes'

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

							<p className='text-24 leading-normal mt-5 lg:mt-10'>
								Reunimos aqui o que orienta a conduta de quem trabalha com a Esfera e o canal para relatar o que estiver fora disso. A página é aberta a qualquer pessoa, dentro ou fora da agência.
							</p>

						</div>
					</div>
				</div>
			</section>

			<section className='mb-16 sm:mb-28 lg:mb-32'>
				<div className='base-container'>
					<div className='bg-yellow py-8 lg:py-15 px-8 lg:px-10 rounded-xl'>
						<div className='row'>

							<div className='col-lg-4 mb-6 lg:mb-0'>
								<h2 className='font-heading uppercase text-60 font-semibold tracking-tighter'>
									Código de Ética Esfera
								</h2>
							</div>

							<div className='col-lg-8'>

								<div className='flex flex-col gap-6 text-18'>
									<p>
										Nosso Código estabelece os princípios e as regras que valem para colaboradores, prestadores, estagiários e aprendizes, e alcança fornecedores, subcontratados e parceiros por cláusula contratual. Trata de condições de trabalho, jornada e remuneração, liberdade de associação, saúde e segurança, meio ambiente, conflito de interesses, anticorrupção, concorrência leal, integridade de registros e confidencialidade.
									</p>
									<p>
										Esta é a versão que vale. Cópias impressas e arquivos salvos em outro lugar não a substituem.
									</p>
								</div>

								<MagneticButton className='mt-8'>
									<a
										href={documents.ethicsCode}
										download
										className='button button--white max-sm:px-6! leading-normal!'
									>
										Baixar o Código de Ética <UxDownload className='w-4 h-4 ml-2 [&>path]:fill-current max-sm:hidden' />
									</a>
								</MagneticButton>

							</div>

						</div>
					</div>
				</div>
			</section>

			<MultiText
				title='Canal de Denúncia'
				subTitle='Como funciona'
				wide
			>
				<div>
					<p className='text-20 leading-relaxed!'>
						Este canal recebe relatos de condutas contrárias ao nosso Código de Ética, à legislação ou às nossas políticas. Está aberto a colaboradores, prestadores, fornecedores, subcontratados, clientes e à comunidade.
					</p>
					<p>
						<b>Você não precisa se identificar.</b> O relato anônimo é apurado da mesma forma. Se quiser receber a resposta sem dizer quem é, pode deixar só um e-mail. Tudo o que você informar fica apenas com os membros do Comitê de Ética e não é revelado a quem for objeto do relato nem à liderança. Ninguém será prejudicado por relatar de boa-fé: retaliação é, por si só, uma violação do Código.
					</p>
					<p>
						<b>Para dúvidas do dia a dia, procure a área de Pessoas.</b> Assuntos como folha, benefícios, férias, ponto e equipamentos são resolvidos direto com a liderança ou com Pessoas. Relatos desse tipo recebidos aqui são apenas redirecionados.
					</p>
				</div>
			</MultiText>

			<section className='pb-15 sm:pb-20 md:pb-25 xl:pb-30'>
				<div className='base-container'>
					<EthicsForm />
				</div>
			</section>

		</main>
	)
}
