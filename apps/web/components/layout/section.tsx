import { PropsWithChildren } from "react"

export interface SectionProps extends PropsWithChildren {
    id?: string
    className?: string
}

export function Section({ children, id, className }: SectionProps) {
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
