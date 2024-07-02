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
                className={`fade flex group flex-row items-center gap-4 w-full fade p-4 whitespace-nowrap hover:text-whiteMT hover:font-semibold dark:hover:font-normal ${isActive ?
                    "rounded-md text-whiteMT font-semibold bg-whiteBG dark:font-normal dark:bg-darkSelected dark:text-mainText" :
                    "text-whiteST dark:text-secondText dark:hover:text-mainText"
                    }`}
                target={target}
            >
                <div className={`rounded-md border-2 p-2 ${isActive ? "bg-mainColor border-mainColor bg-opacity-15 dark:bg-opacity-15 dark:border-opacity-50":"bg-whiteBorder dark:bg-darkBorder border-whiteBorder dark:border-darkBorder bg-opacity-25 dark:bg-opacity-25"}`}>
                    <Icon
                        iconName={iconName}
                        className={`fade size-4 ${isActive ? "fill-mainColor dark:fill-mainColor" : "fill-whiteST dark:fill-secondText group-hover:fill-whiteMT dark:group-hover:fill-mainText"}`}
                    />
                </div>
                {children}
                {isActive &&
                    <Icon
                        iconName="arrowright"
                        className={`ml-auto fade size-4 fill-whiteST dark:fill-secondText`}
                    />
                }
            </Link>
        </li>
    )
}
