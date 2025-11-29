// libraries
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import clsx from 'clsx'
import type { Viewport } from 'next'

// components
import Menu from '@/components/Menu'
import SmoothScroller from '@/components/Utils/SmoothScroller'
import Guidelines from '@/components/Utils/Guidelines'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'
import ViewportHeight from '@/components/Utils/ViewportHeight'

// css
import '@/assets/css/global.css'

// metadata
export const metadata: Metadata = {
	metadataBase: new URL(`https://agenciaesfera.com.br`),
	alternates: {
        canonical: './',
    },
	title: 'Agência Esfera',
	description: 'Transformamos ideias em experiências extraordinárias. Eventos corporativos 360º que conectam pessoas e resultados.',
	icons: {
		icon: '/favicon/icon.svg'
	},
	openGraph: {
		title: 'Agência Esfera',
		description: 'Transformamos ideias em experiências extraordinárias. Eventos corporativos 360º que conectam pessoas e resultados.',
		url: 'https://agenciaesfera.com.br',
		siteName: 'Agência Esfera',
		images: [
			{
				url: 'https://agenciaesfera.com.br/img/og-image.jpg',
				width: 1280,
				height: 628,
				alt: 'Agência Esfera'
			}
		],
		locale: 'pt_BR',
		type: 'website'
	}
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	userScalable: false
}

import { Poppins, Antonio } from 'next/font/google'

const poppins = Poppins({
	weight: ['400', '600', '700'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--font-poppins',
	display: 'swap'
})

const antonio = Antonio({
	weight: ['600'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--font-antonio',
	display: 'swap'
})

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({
	children
}:RootLayoutProps ) {

	// schema
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "Agência Esfera",
		"legalName": "Agência Esfera LTDA",
		"url": "https://agenciaesfera.com.br",
		"logo": "https://agenciaesfera.com.br/img/og-image.jpg",
		"description": "Transformamos ideias em experiências extraordinárias. Eventos corporativos 360º que conectam pessoas e resultados.",
		"address": {
			"@type": "PostalAddress",
			"streetAddress": "Av. Rep. Argentina, 1228",
			"addressLocality": "Água Verde, Curitiba",
			"addressRegion": "PR",
			"postalCode": "80610-260",
			"addressCountry": "BR"
		},
		"contactPoint": [
			{
				"@type": "ContactPoint",
				"email": "agenciaesfera@agenciaesfera.com.br",
				"contactType": "customer support"
			}
		],
		"email": "agenciaesfera@agenciaesfera.com.br",
		"sameAs": [
			"https://facebook.com/AgenciaEsfera/",
			"https://instagram.com/agencia_esfera/",
			"https://linkedin.com/company/agencia-esfera"
		],
		"keywords": [
			"Eventos",
			"Eventos Corporativos",
			"Eventos 360º",
			"Marketing",
			"Branding",
			"Design"
		]
	}

	return (
		<html lang='pt-BR' className={clsx(poppins.className, antonio.className)}>

			<head>
				<meta name='apple-mobile-web-app-title' content='Esfera' />

				<Script
					id='jsonld'
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>

				<GoogleAnalytics gaId='G-XXX' />

			</head>

			<body id='start'>

				<ViewportHeight />

				<div id='overlay' />

				<Preloader />

				<SmoothScroller>

					<Menu />

					{children}

					<Footer />

				</SmoothScroller>

				{ process.env.NODE_ENV === 'development' && <Guidelines /> }

			</body>

		</html>
	)
}

