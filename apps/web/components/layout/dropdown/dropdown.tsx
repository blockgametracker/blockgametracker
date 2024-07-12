"use client"

import { PropsWithChildren, useEffect, useRef, useState } from "react"
import { ICONS_DATA, Icon } from "../../icon"
import { Container } from "../container/container"

export interface Props extends PropsWithChildren {
    icon: keyof typeof ICONS_DATA
    title?: string
    className?: string
    id: string
}

export const Dropdown = ({ children, title, icon, className, id }: Props) => {
    const [active, setActive] = useState(false)
    const dropdownRef = useRef<HTMLLIElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setActive(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <span
            id={id}
            ref={dropdownRef}
            className={`fade relative flex flex-row w-fit rounded-md border-2 bg-whiteBG border:whiteBorder dark:hover:bg-darkSelected dark:bg-darkBG dark:border-darkBorder ${className}`}
        >
            <button
                id={`dropdowm-${title?.toLowerCase()}-button`}
                onClick={() => setActive(!active)}
                className={`inline-flex gap-4 items-center ${title ? "px-4 py-2" : "p-2"}`}
            >
                <Icon iconName={icon} className="w-4 h-4 fill-secondText" />
                {title && (
                    <>
                        <p className="whitespace-nowrap">{title}</p>
                        <Icon
                            iconName="arrow_down"
                            className="w-4 h-4 fill-secondText"
                        />
                    </>
                )}
            </button>
            <Container
                id={`dropdowm-${title?.toLowerCase()}-container`}
                className={`z-20 absolute top-0 right-0 mt-12 w-fit shadow-dropdown ${active ? "flex flex-col" : "hidden"}`}
            >
                {children}
            </Container>
        </span>
    )
}
