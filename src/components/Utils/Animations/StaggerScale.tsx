'use client'

import { useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface StaggerScaleProps {
	className?: string
	children: React.ReactNode
	infinite?: boolean
}

export default function StaggerScale({
	className,
	children,
	infinite = false
}: StaggerScaleProps) {
	
	const item = useRef(null)

	useGSAP(() => {
		if (item.current) {
		
			const children = (item.current as HTMLElement).children

			gsap.set(children, {
				scale: 0
			})

			ScrollTrigger.batch(children, {
				scroller: document.getElementById('viewport') as HTMLElement,
				start: '-50% 100%',
				onEnter: elements => {
					gsap.to(elements, {
						scale: 1,
						stagger: 0.125,
						duration: .5
					})
				},
				...(infinite && {
					onLeaveBack: elements => {
						gsap.to(elements, {
							scale: 0,
							stagger: 0.125,
							duration: .5
						})
					}
				})
			})
		}
	})

	return (
		<div ref={item} data-stagger className={className}>
			{children}
		</div>
	)
}