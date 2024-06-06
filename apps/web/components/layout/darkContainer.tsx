import { MouseEventHandler } from "react"
import { SectionProps } from "./section"

interface Props extends SectionProps {
    onClick?: MouseEventHandler | undefined
}

export function DarkContainer({ children, id, className, onClick }: Props) {
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
