import Link from "next/link"

export const NavButton = ({
    href,
    children,
    currentPage,
    target,
}: {
    href: string
    children: any
    currentPage: string
    target: string
}) => (
    <Link
        href={href}
        className={`fade p-4 pt-2 pb-2 w-fit whitespace-nowrap hover:text-mainText ${
            currentPage.toLowerCase() === target.toLowerCase() ? "text-mainText" : ""
        }`}
    >
        {children}
    </Link>
)
