'use client'

// libraries
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import clsx from 'clsx'

// css
import styles from './index.module.scss'

// utils
import { pages } from '@/utils/routes'

export default function GDPR() {
    const [isVisible, setIsVisible] = useState(true)
    const [shouldRender, setShouldRender] = useState(true)
    const componentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        
        // only check localStorage if cookies were previously accepted
        const consent = localStorage.getItem('purekana-gdpr-consent')
        if (consent === 'accepted') {
            setIsVisible(false)
            setShouldRender(false)
        }
    }, [])

    useEffect(() => {
        if (componentRef.current) {
            if (isVisible) {
                // animate in
                gsap.fromTo(
                    componentRef.current,
                    { opacity: 0, y: 100 },
                    { opacity: 1, y: 0, duration: 0.3, ease: 'power2.inOut' }
                )
            } else {
                // animate out
                gsap.to(componentRef.current, {
                    opacity: 0,
                    y: 100,
                    duration: 0.3,
                    ease: 'power2.inOut',
                    onComplete: () => setShouldRender(false)
                })
            }
        }
    }, [isVisible])

    const handleConsent = (accepted: boolean) => {
        if (accepted) {
            // only store in localStorage if user accepts
            localStorage.setItem('purekana-gdpr-consent', 'accepted')
        }
        
        // hide the banner
        setIsVisible(false)
    }

    if (!shouldRender) return null

    return (
        <div
            ref={componentRef}
            className={styles.component}
        >
            <div className={styles.wrapper}>

                <h2 className='text-18'>
                    <strong>
                        Cookies & Privacy
                    </strong>
                </h2>

                <p className='text-16'>
                    Our website uses cookies. By using our website and agreeing to this policy, you consent to our use of cookies in accordance with our <Link href={pages.privacy} className='hover-underline'>Privacy Policy</Link>.
                </p>

                <div className={styles.buttons}>
                    <button 
                        className='button button--black text-16 button--small'
                        onClick={() => handleConsent(true)}
                    >
                        Accept
                    </button>

                    <button 
                        className={clsx(styles.hollow, 'button button--hollow text-16 button--small')}
                        onClick={() => handleConsent(false)}
                    >
                        Reject
                    </button>
                </div>

            </div>
        </div>
    )
}