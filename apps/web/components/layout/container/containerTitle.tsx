import { PropsWithChildren } from "react"

export interface Props extends PropsWithChildren {
    className?: string
}

export const ContainerTitle = ({ children, className }: Props) => (
    <div
        className={`flex flex-row items-center p-4 border-b-2 border-darkOverlay font-medium text-mainText ${className}`}
    >
        {children}
    </div>
)
