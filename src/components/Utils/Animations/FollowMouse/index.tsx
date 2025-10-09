// libraries
import clsx from 'clsx'
import { useLenis } from 'lenis/react'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// css
import styles from './index.module.scss'

interface Props {
    children: React.ReactNode
    text: string
    scrollTrigger?: boolean
}

export default function FollowMouse({
    children,
    text,
    scrollTrigger
}: Props) {

    const lenis = useLenis()
    const section = useRef<HTMLDivElement>(null)
    const object = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const parent = section.current
        const item = object.current

        if (!item) return

        const middleX = item.offsetWidth / 2
        const middleY = item.offsetHeight / 2 

        gsap.set(item, {
            top: middleX * -1,
            left: middleY * -1
        })

        function moveCircle(e: Event) {
            const mouseEvent = e as MouseEvent | WheelEvent
            gsap.to(item, {
                position: 'fixed',
                x: scrollTrigger ? mouseEvent.layerX : mouseEvent.clientX - (parent as HTMLElement).offsetLeft,
                y: scrollTrigger ? mouseEvent.layerY : mouseEvent.clientY - (parent as HTMLElement).offsetTop,
                ease: 'power2.out',
                duration: .6
            })
        }

        parent?.addEventListener('mousemove', moveCircle)
        parent?.addEventListener('wheel', moveCircle)

        parent?.addEventListener('mouseenter', () => {
            setTimeout(() => {
                gsap.to(item, {
                    scale: 1,
                    opacity: 1,
                    duration: .5,
                    ease: 'circ.out'
                })
            }, 100)
        })

        function leave() {
            gsap.to(item, {
                scale: 0,
                opacity: 0,
                duration: .5,
                ease: 'circ.out'
            })
        }

        parent?.addEventListener('mouseleave', () => leave())
        document.addEventListener('scroll', leave)

    }, { dependencies: [lenis] })

    return (
        <div
            className={styles.component}
            ref={section}
        >

            <div
                className={styles.followMouse}
                ref={object}
            >
                {text}
            </div>

            <div className={styles.content}>
                {children}
            </div>

        </div>
    )
}
