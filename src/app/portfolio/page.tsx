// components
import Section from './Section'

export const metadata = {
	title: 'Portfólio Agência Esfera',
	description: 'Confira o nosso portfólio de projetos.',
	canonical: '/portfolio'
}

export default function Portfolio() {

	const projects = [
		{
			link: '/portfolio/intermodal-25',
			image: '/img/portfolio/thumbnail-01.jpg',
			date: '01/01/2025',
			title: 'Intermodal 25',
			text: 'Multilog',
			category: 'portfolio'
		},
		{
			link: '/portfolio/agrishow-24',
			image: '/img/portfolio/thumbnail-02.jpg',
			date: '01/02/2025',
			title: 'Agrishow 24',
			text: 'John Deere',
			category: 'portfolio'
		},
		{
			link: '/portfolio/agrinho-24',
			image: '/img/portfolio/thumbnail-03.jpg',
			date: '01/03/2025',
			title: 'Agrinho 24',
			text: 'Programa Agrinho',
			category: 'portfolio'
		},
		{
			link: '/portfolio/intermodal-25',
			image: '/img/portfolio/thumbnail-01.jpg',
			date: '01/04/2025',
			title: 'Intermodal 25',
			text: 'Multilog',
			category: 'portfolio'
		},
		{
			link: '/portfolio/agrishow-24',
			image: '/img/portfolio/thumbnail-02.jpg',
			date: '01/05/2025',
			title: 'Agrishow 24',
			text: 'John Deere',
			category: 'portfolio'
		},
		{
			link: '/portfolio/agrinho-24',
			image: '/img/portfolio/thumbnail-03.jpg',
			date: '01/06/2025',
			title: 'Agrinho 24',
			text: 'Programa Agrinho',
			category: 'portfolio'
		},
		{
			link: '/portfolio/intermodal-25',
			image: '/img/portfolio/thumbnail-01.jpg',
			date: '01/07/2025',
			title: 'Intermodal 25',
			text: 'Multilog',
			category: 'portfolio'
		},
		{
			link: '/portfolio/agrishow-24',
			image: '/img/portfolio/thumbnail-02.jpg',
			date: '01/08/2025',
			title: 'Agrishow 24',
			text: 'John Deere',
			category: 'portfolio'
		},
		{
			link: '/portfolio/agrinho-24',
			image: '/img/portfolio/thumbnail-03.jpg',
			date: '01/09/2025',
			title: 'Agrinho 24',
			text: 'Programa Agrinho',
			category: 'portfolio'
		},
		{
			link: '/portfolio/intermodal-25',
			image: '/img/portfolio/thumbnail-01.jpg',
			date: '01/10/2025',
			title: 'Intermodal 25',
			text: 'Multilog',
			category: 'portfolio'
		},
		{
			link: '/portfolio/agrishow-24',
			image: '/img/portfolio/thumbnail-02.jpg',
			date: '01/11/2025',
			title: 'Agrishow 24',
			text: 'John Deere',
			category: 'portfolio'
		},
		{
			link: '/portfolio/agrinho-24',
			image: '/img/portfolio/thumbnail-03.jpg',
			date: '01/12/2025',
			title: 'Agrinho 24',
			text: 'Programa Agrinho',
			category: 'portfolio'
		}
	]

	return (
		<main>
			<Section projects={projects} />
		</main>
	)
}
