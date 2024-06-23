import { PropsWithChildren, RefObject } from "react"

export interface Props extends PropsWithChildren {
    id?: string
    className?: string
}

export const Container = ({ children, id, className }: Props) => (
    <div
        id={id}
        className={`rounded-md bg-darkFill border-2 border-darkOverlay ${className}`}
    >
        {children}
    </div>
)
