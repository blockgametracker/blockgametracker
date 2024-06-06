import type { SectionProps } from "./section"

export function Container({ children, id, className }: SectionProps) {
    return (
        <div
            id={id}
            className={`rounded-md bg-darkFill border-2 border-darkOverlay ${className}`}
        >
            {children}
        </div>
    )
}
