'use client'

// libraries
import gsap from 'gsap'
import { ReactLenis, LenisRef } from 'lenis/react'
import { useEffect, useRef } from 'react'

// interface
interface Props {
    children: React.ReactNode
}

export default function SmoothScroller({
    children
}: Props) {

    const lenisRef = useRef<LenisRef | null>(null)
  
    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000)
        }
    
        gsap.ticker.add(update)
    
        return () => gsap.ticker.remove(update)
    }, [])
  
    return (
        <ReactLenis
            root
            options={{
                autoRaf: false,
                wheelMultiplier: .75,
            }}
            ref={lenisRef}
        >
            {children}
        </ReactLenis>
    )
}