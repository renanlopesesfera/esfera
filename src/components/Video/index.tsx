'use client'

// libraries
import clsx from 'clsx'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

// interface
interface Props {
    video: string
    className?: string
}

export default function Video({
    video,
    className
}: Props) {
    
    const videoWrapperRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    useGSAP(() => {
        if (!videoWrapperRef.current || !videoRef.current) return

        const videoElement = videoRef.current

        ScrollTrigger.create({
            scroller: document.getElementById('viewport'),
            trigger: videoWrapperRef.current,
            start: '0% 120%',
            end: '100% -20%',
            onEnter: () => videoElement.play(),
            onEnterBack: () => videoElement.play(),
            onLeave: () => videoElement.pause(),
            onLeaveBack: () => videoElement.pause()
        })
    }, {
        scope: videoWrapperRef
    })

    return (
        <div ref={videoWrapperRef} className={className}>
            <video
                ref={videoRef}
                loop
                muted
                playsInline
                className='w-full h-full object-cover'
            >
                <source
                    src={video}
                    type='video/mp4'
                />
            </video>
        </div>
    )
}