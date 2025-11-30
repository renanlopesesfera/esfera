'use client'

// libraries
import { useEffect, useRef } from 'react'
import { TransitionRouter } from 'next-transition-router'
import gsap from 'gsap'

interface Props {
    children: React.ReactNode
}

export default function PageTransition({
    children
}: Props) {
    const transitionContainerRef = useRef<HTMLElement | null>(null)
    const isInitializedRef = useRef(false)

    // initialize transition elements on mount
    useEffect(() => {
        if (typeof window === 'undefined') return

        const container = document.querySelector('[data-page-transition]') as HTMLElement
        if (!container) return

        transitionContainerRef.current = container
        const transitionDivs = container.querySelectorAll('div')

        if (transitionDivs.length === 0) return

        // ensure initial state: all divs at translateY 100% (below viewport)
        gsap.set(transitionDivs, { yPercent: 100 })

        isInitializedRef.current = true
    }, [])

    const leaveAnimation = async () => {
        if (typeof window === 'undefined') return

        return new Promise((resolve) => {
            const container = document.querySelector('[data-page-transition]')
            if (!container) {
                resolve(undefined)
                return
            }

            const transitionDivs = container.querySelectorAll('div')
            if (transitionDivs.length === 0) {
                resolve(undefined)
                return
            }

            // ensure elements are at starting position
            gsap.set(transitionDivs, { yPercent: 100 })

            const tl = gsap.timeline({
                onComplete: resolve
            })

            // animate from 100% (below) to 0% (covering page)
            tl.to(transitionDivs, {
                yPercent: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power2.inOut'
            })
        })
    }

    const enterAnimation = async () => {
        if (typeof window === 'undefined') return

        return new Promise((resolve) => {
            const container = document.querySelector('[data-page-transition]')
            if (!container) {
                resolve(undefined)
                return
            }

            const transitionDivs = container.querySelectorAll('div')
            if (transitionDivs.length === 0) {
                resolve(undefined)
                return
            }

            // ensure elements are at end position (covering page)
            gsap.set(transitionDivs, { yPercent: 0 })

            const tl = gsap.timeline({
                onComplete: () => {
                    // reset elements back to starting position
                    gsap.set(transitionDivs, { yPercent: 100 })
                    resolve(undefined)
                }
            })

            // animate from 0% (covering) back to 100% (below viewport) with reverse stagger
            tl.to(transitionDivs, {
                yPercent: 100,
                duration: 1,
                stagger: {
                    amount: 0.5,
                    from: 'end'
                },
                ease: 'power2.inOut'
            })
        })
    }

    return (
        <TransitionRouter
            leave={async (next) => {
                await leaveAnimation()
                next()
            }}
            enter={async (next) => {
                await enterAnimation()
                next()
            }}
        >

            {children}

            <aside
                className='fixed z-999999 inset-0 pointer-events-none'
                data-page-transition
            >
                <div className='absolute z-1 top-0 left-0 w-full h-lvh bg-black' />
                <div className='absolute z-2 top-0 left-0 w-full h-lvh bg-white' />
                <div className='absolute z-3 top-0 left-0 w-full h-lvh bg-yellow' />
            </aside>

        </TransitionRouter>
    )
}