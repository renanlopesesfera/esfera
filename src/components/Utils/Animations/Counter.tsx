'use client'

import { useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CounterProps {
	number: number
	className?: string
}

export default function Counter({ number, className }: CounterProps) {
	const item = useRef<HTMLSpanElement>(null)

	useGSAP(() => {
		if (item.current) {

			// format the number in Brazilian standard (e.g., 1.000, 10.000)
			function formatBrazilianNumber(value: number | string) {
				return Math.floor(+value).toLocaleString('pt-BR')
			}

			gsap.fromTo(item.current, 
				{
					textContent: 0
				},
				{
					textContent: number,
					duration: 3,
					ease: 'power2.inOut',
					modifiers: {
						textContent: (value) => formatBrazilianNumber(value)
					},
				scrollTrigger: {
					scroller: document.getElementById('viewport') as HTMLElement,
					trigger: item.current,
					start: 'top 90%',
					toggleActions: 'play none none none'
				}
				}
			)
		}
	}, { dependencies: [number] })

	return (
		<span
			ref={item}
			className={className}
		>
			{number.toLocaleString('pt-BR')}
		</span>
	)
}
