// libraries
import clsx from 'clsx'

// interface
interface Props {
    children: React.ReactNode
    className?: string
}

export default function Section({
    children,
    className
}: Props) {
    return (
        <section
            className={clsx(
                'overflow-hidden block w-full mb-16 sm:mb-28 lg:mb-32',
                className
            )}
            style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        >
            {children}
        </section>
    )
}