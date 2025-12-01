'use client'

// libraries
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

// components
import PortfolioBlock from '@/components/PortfolioBlock'
import StaggerScale from '@/components/Utils/Animations/StaggerScale'

// interface
interface Props {
    projects: {
        link: string
        image: string
        date: string
        title: string
        text: string
        category: string
    }[]
}

export default function Section({
    projects
}: Props) {

    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (sectionRef.current) {
            gsap.to(sectionRef.current, {
                backgroundColor: 'var(--color-white)',
                scrollTrigger: {
                    scroller: document.getElementById('viewport') as HTMLElement,
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true
                }
            })
        }
    })

    return (
        <section
            className='bg-black pt-35 md:pt-40 xl:pt-50 pb-15 md:pb-20 xl:pb-30'
            ref={sectionRef}
        >
            <div className='base-container'>
                
                <div className='flex flex-col xl:flex-row xl:items-baseline xl:justify-between gap-15 md:gap-10 xl:gap-4'>

                    <div className='flex flex-col md:flex-row md:items-baseline gap-4'>

                        <h1 className='font-heading uppercase text-100 font-semibold text-white'>
                            Portfólio
                        </h1>

                        <h2 className='text-yellow text-20'>
                            Paixão por fazer
                        </h2>

                    </div>

                    <div className='flex items-center gap-4 text-white text-20'>

                        <button
                            className='hover-underline text-yellow mr-4'
                        >
                            Tudo
                        </button>

                        <button
                            className='hover-underline'
                        >
                            Portfólio <small className='text-xs -translate-y-3 -translate-x-0.5 inline-block'>(12)</small>
                        </button>

                        <button
                            className='hover-underline'
                        >
                            Cases <small className='text-xs -translate-y-3 -translate-x-0.5 inline-block'>(6)</small>
                        </button>

                    </div>

                </div>

                <StaggerScale
                    className='grid mt-6 md:mt-10 xl:mt-20 md:grid-cols-2 xl:grid-cols-3 gap-4'
                    infinite
                >
                    {projects.map((item, i) => (
                        <PortfolioBlock
                            href={item.link}
                            image={item.image}
                            date={item.date}
                            title={item.title}
                            text={item.text}
                            category={item.category}
                            key={i}
                        />
                    ))}
                </StaggerScale>

            </div>
        </section>
    )
}