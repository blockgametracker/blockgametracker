import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    title?: string
    className?: string
}

export const NavSection = ({ title, children, className }: Props) => (
    <li className={`flex flex-col gap-2 ${className}`}>
        {title && <p className="pl-4">{title}</p>}
        <ul>{children}</ul>
    </li>
)
