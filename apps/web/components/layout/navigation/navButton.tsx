import { ICONS_DATA, Icon } from "@/components/icon"
import Link from "next/link"
import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    href: string
    iconName: keyof typeof ICONS_DATA
    currentPage: string
    target?: string
    page?: string
}

export const NavButton = ({
    href,
    iconName,
    children,
    currentPage,
    page,
    target,
}: Props) => {
    const isActive = currentPage.toLowerCase() === (page ?? "").toLowerCase()
    return (
        <li>
            <Link
                href={href}
                className={`fade flex group flex-row items-center gap-8 w-full fade p-4 whitespace-nowrap hover:text-mainText ${
                    isActive &&
                    "rounded-md text-mainText font-medium bg-darkSelected"
                }`}
                target={target}
            >
                <Icon
                    iconName={iconName}
                    className={`fade w-4 h-4 ${isActive ? "fill-mainColor" : "fill-secondText group-hover:fill-mainText"}`}
                />
                {children}
            </Link>
        </li>
    )
}
