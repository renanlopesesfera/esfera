// components
import DoubleSlider from '@/components/PortfolioBlocks/DoubleSlider'
import ExpandingGrid from '@/components/PortfolioBlocks/ExpandingGrid'
import TwoMedia from '@/components/PortfolioBlocks/TwoMedia'
import StoriesSlider from '@/components/PortfolioBlocks/StoriesSlider'

export default async function Project({
    params
}: {
    params: any
}) {


    return (
        <main className='portfolio-internal-page'>
            <div className='bg-white pt-20 lg:pt-32 pb-px'>

                <TwoMedia
                    media={[
                        {
                            image: '/img/portfolio/03.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/04.jpg',
                            alt: 'Multilog Intermodal 2025'
                        }
                    ]}
                />

                <StoriesSlider
                    media={[
                        {
                            image: '/img/portfolio/03.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/04.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/05.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/03.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/04.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/05.jpg',
                            alt: 'Multilog Intermodal 2025'
                        }
                    ]}
                />

            </div>
        </main>
    )
}