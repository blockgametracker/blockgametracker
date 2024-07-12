"use client"

import { MouseEventHandler, PropsWithChildren } from "react"

export interface Props extends PropsWithChildren {
    onClick: MouseEventHandler
}

export const DropdownButton = ({ children, onClick }: Props) => (
    <button
        onClick={onClick}
        className={`whitespace-nowrap fade inline-flex w-full items-center px-4 py-2 hover:bg-whiteSelected dark:hover:bg-darkSelected`}
    >
        {children}
    </button>
)
