// libraries
import type { MetadataRoute } from 'next'

// libs
import { getPortfolioList } from '@/lib/wordpress/getPortfolio'

// constants
const siteUrl = process.env.SITE_URL || 'https://agenciaesfera.com.br'

// ISR
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const lastModified = new Date()

	const pages = ['', '/home', '/sobre', '/portfolio', '/contato', '/politica-de-privacidade']

	const projects = await getPortfolioList()

	return [
		...pages.map((path) => ({
			url: `${siteUrl}${path}`,
			lastModified
		})),
		...projects.map((project) => ({
			url: `${siteUrl}/portfolio/${project.slug}`,
			lastModified: project.date ? new Date(project.date) : lastModified
		}))
	]
}
