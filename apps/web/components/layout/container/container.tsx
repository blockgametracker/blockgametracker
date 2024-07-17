import { MouseEventHandler, PropsWithChildren, RefObject } from "react"

export interface Props extends PropsWithChildren {
    id?: string
    className?: string
    onClick?: MouseEventHandler | undefined
}

export const Container = ({ children, id, className, onClick }: Props) => (
    <div
        id={id}
        className={`rounded-md bg-whiteFill dark:bg-darkFill border-2 border-transparent dark:border-darkBorder ${className}`}
        onClick={onClick}
    >
        {children}
    </div>
)
