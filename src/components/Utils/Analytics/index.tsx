'use client'

// libraries
import { GoogleAnalytics } from '@next/third-parties/google'
import { usePathname } from 'next/navigation'

// utils
import { pages } from '@/utils/routes'

const GA_ID = 'G-TZ9LGN811S'

// the ethics channel promises anonymity, so it must never load or send analytics
const isUntrackedPath = (pathname: string) => {
	return pathname === pages.ethics || pathname.startsWith(pages.ethics + '/')
}

export default function Analytics() {
	const pathname = usePathname()
	const untracked = isUntrackedPath(pathname)

	// GA's own opt-out flag: covers the case where gtag was already loaded by
	// another page and the visitor reaches the ethics page through client-side navigation
	if (typeof window !== 'undefined') {
		(window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = untracked
	}

	if (untracked) return null

	return <GoogleAnalytics gaId={GA_ID} />
}
