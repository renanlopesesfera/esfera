'use client'

// libraries
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards, Mousewheel, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cards'

// components
import TextReveal from '@/components/Utils/Animations/TextReveal'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import FollowMouse from '@/components/Utils/Animations/FollowMouse'

export default function Services() {
    return (
        <section className='bg-black py-16 sm:py-28 lg:py-32'>

            <div className='base-container'>
                <div className='flex flex-col text-center gap-6 sm:gap-10'>

                    <h2 className='font-heading uppercase text-100 font-semibold tracking-tighter text-yellow'>
                        <AnimatedText text='O que fazemos' />
                    </h2>

                    <TextReveal>
                        <p className='text-20 text-white'>
                            Tudo para sua marca ser lembrada
                        </p>
                    </TextReveal>

                </div>
            </div>

            <div className='relative mt-10 sm:mt-15'>
                <FollowMouse text='Arraste'>
                    <div className='base-container'>
                        <Swiper
                            modules={[EffectCards, Mousewheel, Autoplay]}
                            effect='cards'
                            grabCursor
                            loop
                            cardsEffect={{
                                perSlideOffset: 10,
                                perSlideRotate: 2,
                                slideShadows: false
                            }}
                            mousewheel={{
                                forceToAxis: true
                            }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false
                            }}
                            speed={500}
                            className='overflow-visible!'
                        >
                            {[
                                { text: 'Eventos Corporativos' },
                                { text: 'Eventos Presenciais, Híbridos & Online' },
                                { text: 'Eventos Internacionais' },
                                { text: 'Operação de Campo' },
                                { text: 'Live Marketing' },
                                { text: 'Ativações de Marca' },
                                { text: 'Relacionamento & Lançamentos' },
                                { text: 'Congresso & Conveções' },
                                { text: 'Capacitações & Workshops' },
                                { text: 'Feiras & Stands' },
                                { text: 'Viagens de Incentivo' },
                                { text: 'Experiências Web & Mobile Exclusivas' }
                            ].map((item, i) => (
                                <SwiperSlide
                                    key={i}
                                    className='overflow-hidden group'
                                >
                                    <div className='relative overflow-hidden bg-white p-8 md:p-10 flex items-end max-w-[90%] w-100 lg:w-120 h-120 lg:h-140 rounded-lg mx-auto'>

                                        <div className='absolute inset-0 bg-black/50 z-3 pointer-events-none group-[.swiper-slide-active]:opacity-0 transition-opacity duration-300 group-[.swiper-slide-prev]:opacity-50 group-[.swiper-slide-next]:opacity-50' />

                                        <p className='absolute top-5 right-10 text-100 font-heading z-0 uppercase font-semibold text-gray-lightest'>
                                            {i +1}
                                        </p>

                                        <p className='relative z-2 font-heading text-60 uppercase font-semibold tracking-tight max-md:text-[3rem]!'>
                                            {item.text}
                                        </p>

                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </FollowMouse>
            </div>

        </section>
    )
}