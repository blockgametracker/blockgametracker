import { MouseEventHandler, PropsWithChildren, RefObject } from "react"

export interface Props extends PropsWithChildren {
    id?: string
    className?: string
    onClick?: MouseEventHandler | undefined
}

export const Container = ({ children, id, className, onClick }: Props) => (
    <div
        id={id}
        className={`rounded-md bg-whiteFill dark:bg-darkFill dark:border-2 dark:border-darkBorder ${className}`}
        onClick={onClick}
    >
        {children}
    </div>
)
