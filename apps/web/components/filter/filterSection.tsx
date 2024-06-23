import { PropsWithChildren, useEffect, useRef, useState } from "react"
import { ICONS_DATA, Icon } from "../icon"
import { Container } from "../layout/container/container"

export interface Props extends PropsWithChildren {
    icon: keyof typeof ICONS_DATA
    filter: string
}

export const FilterSection = (props: Props) => {
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
            className="fade relative flex flex-row w-full rounded-md border-2 hover:bg-darkSelected bg-darkFill border-darkOverlay"
        >
            <button
                onClick={() => setActive(!active)}
                className="inline-flex gap-4 items-center p-4"
            >
                <Icon
                    iconName={props.icon}
                    className="w-4 h-4 fill-secondText"
                />
                <p className="whitespace-nowrap">{props.filter}</p>
                <Icon
                    iconName="arrow_down"
                    className="w-4 h-4 fill-secondText"
                />
            </button>
            <Container
                className={`z-20 absolute top-0 left-0 mt-16 w-full shadow-dropdown ${active ? "flex flex-col" : "hidden"}`}
            >
                {props.children}
            </Container>
        </div>
    )
}
