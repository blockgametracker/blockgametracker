"use client"

import Link from "next/link"
import { PropsWithChildren } from "react"

export interface Props extends PropsWithChildren {
    href: string
}

export const DropdownLink = ({ children, href }: Props) => (
    <Link
        href={href}
        className={`whitespace-nowrap fade inline-flex w-full items-center px-4 py-2 hover:bg-whiteSelected dark:hover:bg-darkSelected`}
    >
        {children}
    </Link>
)
