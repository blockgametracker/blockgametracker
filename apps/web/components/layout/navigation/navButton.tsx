import Link from "next/link"
import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    href: string
    currentPage: string
    target?: string
}

export const NavButton = ({ href, children, currentPage, target }: Props) => (
    <Link
        href={href}
        className={`fade p-4 pt-2 pb-2 w-fit whitespace-nowrap hover:text-mainText ${
            currentPage.toLowerCase() === (target ?? "").toLowerCase()
                ? "text-mainText"
                : ""
        }`}
    >
        {children}
    </Link>
)
