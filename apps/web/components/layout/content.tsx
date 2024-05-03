import { MouseEventHandler, PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    id?: string
    className?: string
}

export function Section({ children, id, className }: Props) {
    return (
        <div
            id={id}
            className={`w-full flex flex-col items-center px-4 md:px-16 ${className}`}
        >
            <div className="flex flex-col gap-4 w-full h-full max-w-content">
                {children}
            </div>
        </div>
    )
}

export function Container({ children, id, className }: Props) {
    return (
        <div
            id={id}
            className={`rounded-md bg-darkFill border-2 border-darkOverlay ${className}`}
        >
            {children}
        </div>
    )
}

export function DarkContainer({
    children,
    id,
    className,
    onClick,
}: {
    children?: any
    id?: string
    className?: string
    onClick?: MouseEventHandler | undefined
}) {
    return (
        <div
            id={id}
            onClick={onClick}
            className={`rounded-md p-4 border-2 bg-dark border-darkOverlay ${className}`}
        >
            {children}
        </div>
    )
}
