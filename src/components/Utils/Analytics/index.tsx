'use client'

// libraries
import { useEffect } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { usePathname } from 'next/navigation'

// utils
import { pages } from '@/utils/routes'

const GA_ID = 'G-TZ9LGN811S'

const isUntrackedPath = (pathname: string) => {
	return pathname === pages.ethics || pathname.startsWith(pages.ethics + '/')
}

const isGaLoaded = () => typeof (window as unknown as { gtag?: unknown }).gtag === 'function'

// true when GA was already running as the visitor reached /etica
let tainted = false

export default function Analytics() {
	const pathname = usePathname()
	const untracked = isUntrackedPath(pathname)

	if (typeof window !== 'undefined') {
		const flags = window as unknown as Record<string, boolean>

		if (untracked && isGaLoaded()) tainted = true

		flags[`ga-disable-${GA_ID}`] = untracked || tainted
	}

	// reload so GA forgets /etica
	useEffect(() => {
		if (tainted && !untracked) window.location.reload()
	}, [untracked])

	if (untracked || tainted) return null

	return <GoogleAnalytics gaId={GA_ID} />
}
