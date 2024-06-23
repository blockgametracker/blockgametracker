import { ICONS_DATA, Icon } from "@/components/icon"
import Link from "next/link"
import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    href: string
    iconName: keyof typeof ICONS_DATA
    currentPage: string
    target?: string
}

export const NavButton = ({
    href,
    iconName,
    children,
    currentPage,
    target,
}: Props) => {
    const isActive = currentPage.toLowerCase() === (target ?? "").toLowerCase()
    return (
        <li>
            <Link
                href={href}
                className={`flex flex-row items-center gap-8 w-full fade p-4 whitespace-nowrap hover:text-mainText ${
                    isActive &&
                    "rounded-md text-mainText font-medium bg-darkSelected"
                }`}
            >
                <Icon
                    iconName={iconName}
                    className={`w-4 h-4 ${isActive ? "fill-mainColor" : "fill-secondText"}`}
                />
                {children}
            </Link>
        </li>
    )
}
