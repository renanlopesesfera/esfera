'use client'

// libraries
import clsx from 'clsx'
import { useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { SplitText } from 'gsap/dist/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface AnimatedTitleProps {
    children: React.ReactNode
	style?: 'gray-yellow' | 'gray-black' | 'white-yellow'
    className?: string
}

export default function AnimatedTitle({
    children,
	style = 'gray-yellow',
    className
}: AnimatedTitleProps) {

    const item = useRef<HTMLHeadingElement>(null)

    useGSAP(() => {
		if (!item.current) return

		const split = new SplitText(item.current, {
			type: 'lines',
			tag: 'span'
		})

		split.lines.forEach((line) => {
			gsap.to(line, {
				backgroundPositionX: 0,
				ease: 'none',
				scrollTrigger: {
					trigger: line,
					scrub: true,
					start: 'top 75%',
					end: 'bottom 60%'
				}
			})
		})

		// cleanup
		return () => {
			split.revert()
		}
	})

    return (
        <h2
			className={clsx(
				'fill-title',
				style === 'gray-yellow' && 'gray-yellow',
				style === 'gray-black' && 'gray-black',
				style === 'white-yellow' && 'white-yellow',
				className
			)}
			ref={item}
		>
            {children}
        </h2>
    )
}