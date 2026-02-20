// libraries
import Image from 'next/image'
import Link from 'next/link'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import Accordion from '@/components/Accordion'

// svg
import UxPdf from '@/assets/svg/ux/pdf.svg'

export default function ISO20121() {
    return (
        <section className='bg-black pb-15 sm:pb-20 md:pb-25 xl:pb-30'>
            <div className='base-container'>
                <div className='bg-yellow pb-8 pt-5 lg:py-15 px-8 lg:px-10 rounded-xl'>
                    <div className='row'>

                        <div className='col-lg-4 flex justify-end lg:justify-center mb-15 lg:mb-0'>
                            <div className='sticky top-10 flex items-center justify-center w-30 sm:w-40 lg:w-60 min-w-30 sm:min-w-40 lg:min-w-60 h-30 sm:h-40 lg:h-60 -mr-4 lg:mr-0'>

                                <Image
                                    src='/img/svg/circle-text.svg'
                                    alt='Responsabilidade Corporativa'
                                    width={170}
                                    height={170}
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

                        <div className='col-lg-8'>

                            <Accordion
                                isBlack
                                question='Responsabilidade Corporativa'
                                answer={`
                                    <p>
                                        A atuação da Agência Esfera é orientada por práticas de governança, sustentabilidade e conformidade, integrando políticas institucionais e certificações que norteiam nossa operação.
                                    </p>
                                `}
                            />

                            <Accordion
                                isBlack
                                question='ISO 20121 - Sistema de Gestão para Eventos Sustentáveis'
                            >

                                <p>
                                    A ISO 20121 estabelece diretrizes para planejamento e execução de eventos com foco em sustentabilidade, gestão de impactos e melhoria contínua.<br /><br />

                                    Estamos entre as primeiras empresas brasileiras a adotar essa norma, reforçando nosso compromisso com práticas estruturadas de gestão em eventos.
                                </p>

                                <MagneticButton className='mb-4'>
                                    <a
                                        href='/pdf/politica-de-sustentabilidade.pdf'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='button button--white lowercase before:content-none! after:content-none!'
                                    >
                                        Política de Sustentabilidade <UxPdf className='w-4 h-4 ml-2 [&>path]:fill-current' />
                                    </a>
                                </MagneticButton>

                            </Accordion>

                            <Accordion
                                isBlack
                                question='Código de Conduta de Fornecedores'
                            >

                                <p>
                                    Diretrizes que orientam relações transparentes, éticas e responsáveis fornecedores.<br /><br />

                                    O alinhamento com nossos parceiros é parte essencial da consistência operacional e da integridade dos projetos.
                                </p>

                                <MagneticButton className='mb-4'>
                                    <a
                                        href='/pdf/codigo-de-conduta-fornecedores.pdf'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='button button--white lowercase before:content-none! after:content-none!'
                                    >
                                        Código de Conduta de Fornecedores <UxPdf className='w-4 h-4 ml-2 [&>path]:fill-current' />
                                    </a>
                                </MagneticButton>

                            </Accordion>

                            <Accordion
                                isBlack
                                question='Política de Privacidade'
                            >

                                <p>
                                    Informações sobre coleta, uso e proteção de dados, em conformidade com as normas aplicáveis.<br /><br />

                                    Tratamos a privacidade e a segurança das informações como parte integrante de nossas práticas de responsabilidade corporativa.
                                </p>

                                <MagneticButton className='mb-4'>
                                    <a
                                        href='/pdf/politica-de-seguranca-da-informacao-e-protecao-de-privacidade.pdf'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='button button--white lowercase before:content-none! after:content-none!'
                                    >
                                        Política de Privacidade <UxPdf className='w-4 h-4 ml-2 [&>path]:fill-current' />
                                    </a>
                                </MagneticButton>

                            </Accordion>

                            <Accordion
                                isBlack
                                question='Apoios Institucionais'
                            >

                                <p>
                                    Apoiamos iniciativas que geram impacto positivo em comunidades locais e internacionais.
                                </p>

                                <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4'>
                                    {[
                                        {
                                            src: '/img/badges/pequeno-principe.png',
                                            url: 'https://pequenoprincipe.org.br/',
                                            alt: 'Pequeno Príncipe',
                                            width: 840,
                                            height: 840
                                        },
                                        {
                                            src: '/img/badges/fadc.png',
                                            url: 'https://www.fadc.org.br/',
                                            alt: 'FADC',
                                            width: 246,
                                            height: 183
                                        }
                                    ].map((item, i) => (
                                        <Link
                                            key={i}
                                            href={item.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='flex items-center justify-center bg-white rounded-md md:rounded-lg p-8 w-full aspect-square before:content-none! after:content-none! hover:scale-95 transition-all duration-200'
                                        >
                                            <Image
                                                src={item.src}
                                                alt={item.alt}
                                                width={item.width}
                                                height={item.height}
                                                className='w-full h-auto object-contain'
                                                loading='lazy'
                                            />
                                        </Link>
                                    ))}
                                </div>

                            </Accordion>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}