"use client"

import { PropsWithChildren, useEffect, useRef, useState } from "react"
import { ICONS_DATA, Icon } from "../../icon"
import { Container } from "../container/container"

export interface Props extends PropsWithChildren {
    icon: keyof typeof ICONS_DATA
    title?: string
}

export const Dropdown = ({ children, title, icon }: Props) => {
    const [active, setActive] = useState(false)

    const dropdownRef = useRef<HTMLDivElement>(null)

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
        <div
            ref={dropdownRef}
            className="fade relative flex flex-row w-full rounded-md border-2 bg-whiteBG border:whiteBorder dark:hover:bg-darkSelected dark:bg-darkBG dark:border-darkBorder"
        >
            <button
                onClick={() => setActive(!active)}
                className={`inline-flex gap-4 items-center ${title ? "px-4 py-2":"p-2"}`}
            >
                <Icon
                    iconName={icon}
                    className="w-4 h-4 fill-secondText"
                />
                {title &&
                    <>
                        <p className="whitespace-nowrap">{title}</p>
                        <Icon
                            iconName="arrow_down"
                            className="w-4 h-4 fill-secondText"
                        />
                    </>
                }
            </button>
            <Container
                className={`z-20 absolute top-0 right-0 mt-12 w-fit shadow-dropdown ${active ? "flex flex-col" : "hidden"}`}
            >
                {children}
            </Container>
        </div>
    )
}
