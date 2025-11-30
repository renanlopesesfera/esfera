// components
import Banner from './Banner'

export const metadata = {
	title: 'Sobre a Esfera',
	description: 'Conheça a Agência Esfera, uma agência de marketing digital que transforma ideias em resultados.',
	canonical: '/sobre'
}

export default function About() {
    return (
        <main>

            <Banner
                image='/img/team.jpg'
                subtitle='Sobre'
                title='Somos uma agência de eventos corporativos'
            >
                <p className='text-20 leading-loose! text-white'>
                    Trabalhamos com <b>energia, paixão e respeito,</b> e acreditamos que transparência e confiança são a base para construir boas parcerias. 
                </p>
            </Banner>

            <div style={{ height: '200svh' }} />

        </main>
    )
}