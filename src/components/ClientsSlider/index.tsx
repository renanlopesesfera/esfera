// components
import TextReveal from '@/components/Utils/Animations/TextReveal'
import Marquee from '@/components/Marquee'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'

export default function ClientsSlider() {

    const logos = [
        {
            src: '/img/clients/bosch.svg',
            alt: 'Bosch'
        },
        {
            src: '/img/clients/corteva-biologicals.png',
            alt: 'Corteva Biologicals'
        },
        {
            src: '/img/clients/corteva.png',
            alt: 'Corteva'
        },
        {
            src: '/img/clients/credaluga.png',
            alt: 'CredAluga'
        },
        {
            src: '/img/clients/cupola.png',
            alt: 'Cupola'
        },
        {
            src: '/img/clients/electrolux.png',
            alt: 'Electrolux'
        },
        {
            src: '/img/clients/huawei.png',
            alt: 'Huawei'
        },
        {
            src: '/img/clients/john-deere-agrishow-2025.png',
            alt: 'John Deere Agrishow 2025'
        },
        {
            src: '/img/clients/john-deere-wirtgen-group.png',
            alt: 'John Deere | Wirtgen Group'
        },
        {
            src: '/img/clients/john-deere.png',
            alt: 'John Deere'
        },
        {
            src: '/img/clients/mosaic.png',
            alt: 'Mosaic'
        },
        {
            src: '/img/clients/multilog.png',
            alt: 'Multilog'
        },
        {
            src: '/img/clients/nutrien.png',
            alt: 'Nutrien'
        },
        {
            src: '/img/clients/portos-do-parana.png',
            alt: 'Portos do Paraná'
        },
        {
            src: '/img/clients/sistema-faep.png',
            alt: 'Sistema FAEP'
        },
        {
            src: '/img/clients/tetra-pack.svg',
            alt: 'Tetra Pack'
        },
        {
            src: '/img/clients/vitol.png',
            alt: 'Vitol'
        },
        {
            src: '/img/clients/volvo.png',
            alt: 'Volvo'
        }
    ]

    return (
        <section className='py-15 lg:py-20 xl:py-25 bg-white'>
            
            <div className='base-container'>
                <div className='md:flex md:gap-4 md:justify-between'>

                    <AnimatedTitle
                        className='uppercase font-heading text-[31vw] sm:text-[33vw] md:text-[18vw] tracking-tighter leading-none text-yellow whitespace-nowrap -ml-2 md:ml-0 pr-1 [&_small]:opacity-0'
                    >
                        Clientes<small>.</small>
                    </AnimatedTitle>

                    <TextReveal className='md:text-right mt-6 md:mt-4'>
                        <p className='text-18 md:w-80 lg:mt-5 xl:mt-7 2xl:mt-10'>
                            Transformamos ideias que ganham forma porque são construídas junto de quem nos inspira<span className='md:hidden'>.</span>
                        </p>
                    </TextReveal>

                </div>

            </div>

            <div className='relative overflow-hidden flex flex-col gap-10 sm:gap-15 md:gap-20 xl:gap-30 mt-14 md:mt-20 lg:mt-25 xl:mt-30'>

                <Marquee logos={logos} />

                <Marquee logos={logos} reverse />
                
            </div>

        </section>
    )
}