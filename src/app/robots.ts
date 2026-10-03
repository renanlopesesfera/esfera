// libraries
import type { MetadataRoute } from 'next'

// constants
const siteUrl = process.env.SITE_URL || 'https://agenciaesfera.com.br'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/404', '/500']
		},
		host: siteUrl,
		sitemap: `${siteUrl}/sitemap.xml`
	}
}
