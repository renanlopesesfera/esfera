// libraries
import Image from 'next/image'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'

export default function ISO20121() {
    return (
        <section className='bg-black pb-15 sm:pb-20 md:pb-25 xl:pb-30'>
            <div className='base-container'>
                <div className='bg-yellow pb-8 pt-5 lg:py-15 px-8 lg:px-10 rounded-xl'>
                    <div className='row'>

                        <div className='col-lg-4 flex lg:items-center justify-end lg:justify-center mb-15 lg:mb-0'>
                            <div className='relative flex items-center justify-center w-30 sm:w-40 lg:w-60 min-w-30 sm:min-w-40 lg:min-w-60 h-30 sm:h-40 lg:h-60 -mr-4 lg:mr-0'>

                                <Image
                                    src='/img/svg/iso.svg'
                                    alt='ISO9001'
                                    width={150}
                                    height={150}
                                    className='w-full h-full animate-spin'
                                    style={{ animationDuration: '20s' }}
                                />

                                <Image
                                    src='/img/svg/logo/icon-black.svg'
                                    alt='Esfera'
                                    width={65}
                                    height={65}
                                    className='absolute w-1/3 h-1/3 object-contain -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 -mt-0.5'
                                />

                            </div>
                        </div>

                        <div className='col-lg-8 flex flex-col gap-6 md:gap-8'>

                            <h2 className='font-heading font-semibold tracking-tighter uppercase -ml-2 text-[12vw] md:text-[10vw] lg:text-[8vw] leading-none'>
                                <AnimatedText text='Responsabilidade' />
                                <AnimatedText text='Corporativa' />
                            </h2>

                            <p className='text-18'>
                                <b>CERTIFICAÇÃO ISO 20121 - Sistemas de Gestão para a Sustentabilidade de Eventos</b><br /><br />

                                Temos orgulho em ser uma empresa certificada na ISO 20121, a principal norma internacional voltada à gestão sustentável de eventos. Ela estabelece diretrizes para que todas as etapas do projeto, do planejamento à execução, sejam conduzidas com responsabilidade ambiental, social e econômica.<br /><br />

                                Ser uma empresa certificada ISO 20121 significa que adotamos processos que reduzem impactos ambientais, promovem relações éticas com fornecedores, valorizam as pessoas envolvidas e garantem a melhoria contínua de nossas entregas.<br /><br />

                                Na prática, isso se traduz em eventos mais conscientes, eficientes e alinhados às exigências de um mercado que valoriza transparência, governança e legado.
                            </p>

                            {/*
                            <MagneticButton>
                                <a
                                    href='#'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='button button--white lowercase'
                                >
                                   Saiba mais 
                                </a>
                            </MagneticButton>
                            */}

                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}