// components
import Banner from './(fragments)/Banner'
import MultiText from './(fragments)/MultiText'
import FullscreenMedia from './(fragments)/FullscreenMedia'

export default function Project() {

    const data = {
        image: '/img/portfolio/banner.jpg',
        category: 'portfolio',
        title: 'Multilog',
        subtitle: 'Intermodal 25',
        text: 'Imagine um lugar onde as mentes mais brilhantes e as empresas mais inovadoras da logística na América Latina se reúnem. Esse lugar é a Intermodal South America!',
        client: 'Multilog',
        year: 2025,
        area: 'Automotivo e Industrial'
    }
    return (
        <main>

            <Banner
                image={data.image}
                category={data.category}
                title={data.title}
                subtitle={data.subtitle}
                text={data.text}
                client={data.client}
                year={data.year}
                area={data.area}
            />

            <div className='bg-white pt-20 lg:pt-32 pb-px'>

                <MultiText
                    title='Multilog Intermodal onde a logística da América Latina se encontra'
                    subTitle='Introdução'
                >
                    <p>
                        Na participação da Multilog na Intermodal South America 2025, a Esfera atuou no desenvolvimento do estande, desde o conceito até a execução. Criamos um espaço funcional e impactante, que reforçou a presença da marca no setor logístico.<br /><br />

                        O resultado foi uma presença marcante, unindo sofisticação, praticidade e inovação — transformando a participação da Multilog em uma experiência memorável.
                    </p>
                </MultiText>

                <FullscreenMedia
                    //video='/img/portfolio/fs-video.mp4'
                    image='/img/portfolio/banner.jpg'
                />

            </div>

        </main>
    )
}