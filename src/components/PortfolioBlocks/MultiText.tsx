'use client'

// libraries
import clsx from 'clsx'
import Section from './Section'

// components
import TextReveal from '@/components/Utils/Animations/TextReveal'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'

// interface
interface Props {
    title?: string
    subTitle?: string
    children?: React.ReactNode
    className?: string
    // widens the content columns below xl (col-lg-8 instead of col-lg-6)
    wide?: boolean
}

export default function MultiText({
    title,
    subTitle,
    children,
    className,
    wide = false
}: Props) {
    return (
        <Section className={className}>
            <div className='base-container'>

                {title && (
                    <div className='row mb-8 lg:mb-20'>
                        <div className={clsx(
                            'offset-lg-4',
                            wide ? 'col-lg-8 col-xl-6' : 'col-lg-6'
                        )}>
                            <AnimatedTitle
                                style='gray-black'
                                className='text-60 font-semibold'
                            >
                                {title}
                            </AnimatedTitle>
                        </div>
                    </div>
                )}

                {(subTitle || children) && (
                    <div className='row'>

                        {subTitle && (
                            <div className='col-lg-4 mb-4 lg:mb-0'>
                                <TextReveal className='[&_.block-revealer]:h-[120%]!'>
                                    <h3 className='font-heading text-36 font-semibold text-yellow uppercase'>
                                        {subTitle}
                                    </h3>
                                </TextReveal>
                            </div>
                        )}

                        {children && (
                            <div className={clsx(
                                wide ? 'col-lg-8 col-xl-6' : 'col-lg-6',
                                !subTitle && 'offset-lg-4'
                            )}>
                                <div className='rich-text [&>div]:flex [&>div]:flex-col [&>div]:gap-6'>
                                    {children}
                                </div>
                            </div>
                        )}

                    </div>
                )}

            </div>
        </Section>
    )
}