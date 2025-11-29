'use client'

// libraries
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// interface
interface Props {
    children: React.ReactNode
}

export default function SmoothScroller({
    children
}: Props) {
    const viewportRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const viewport = viewportRef.current
        if (!viewport) return

        // Only enable smooth scroll on desktop (not mobile for better performance)
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        
        // Configure ScrollTrigger
        ScrollTrigger.config({ ignoreMobileResize: true })

        if (isMobile) {
            // On mobile, just refresh ScrollTrigger
            const timer = setTimeout(() => {
                ScrollTrigger.refresh(true)
            }, 1000)

            return () => {
                clearTimeout(timer)
            }
        }

        // Desktop smooth scroll using requestAnimationFrame with lerp
        let currentScroll = viewport.scrollTop
        let targetScroll = viewport.scrollTop
        let isScrolling = false
        let rafId: number | null = null

        // Lerp function for smooth interpolation
        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor
        }

        const smoothScroll = () => {
            // Calculate difference
            const diff = targetScroll - currentScroll
            
            // If difference is very small, snap to target
            if (Math.abs(diff) < 0.5) {
                currentScroll = targetScroll
                viewport.scrollTop = currentScroll
                isScrolling = false
                rafId = null
                return
            }

            // Lerp towards target (0.1 = faster, 0.05 = slower but smoother)
            currentScroll = lerp(currentScroll, targetScroll, 0.075)
            viewport.scrollTop = currentScroll

            // Continue animation
            rafId = requestAnimationFrame(smoothScroll)
        }

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault()
            
            // Update target scroll position
            targetScroll += e.deltaY
            targetScroll = Math.max(0, Math.min(targetScroll, viewport.scrollHeight - viewport.clientHeight))

            // Start smooth scroll animation if not already running
            if (!isScrolling) {
                isScrolling = true
                smoothScroll()
            }
        }

        // Handle programmatic scrolling (like anchor links)
        const handleScroll = () => {
            // If scroll happened without wheel (programmatic), sync immediately
            if (!isScrolling) {
                currentScroll = viewport.scrollTop
                targetScroll = viewport.scrollTop
            }
        }

        viewport.addEventListener('wheel', handleWheel, { passive: false })
        viewport.addEventListener('scroll', handleScroll, { passive: true })

        // Refresh ScrollTrigger after setup
        const timer = setTimeout(() => {
            ScrollTrigger.refresh(true)
        }, 1000)

        return () => {
            viewport.removeEventListener('wheel', handleWheel)
            viewport.removeEventListener('scroll', handleScroll)
            clearTimeout(timer)
            if (rafId !== null) {
                cancelAnimationFrame(rafId)
            }
        }
    }, [])
  
    return (
        <div id='viewport' ref={viewportRef}>
            <div id='main-content'>
                {children}
            </div>
        </div>
    )
}