import { Icon } from "@/components/icon"
import { Container } from "../container/container"
import { useState } from "react"
import Link from "next/link"

export const NavUpdate = () => {
    const [active, setActive] = useState(true)

    return (
        <Container className={`flex flex-col gap-4 p-4 ${!active && "hidden"}`}>
            <div className="relative flex flex-row gap-4 items-center">
                <span className="rounded-full size-4 bg-mainColor" />
                <span className="absolute left-0 rounded-full size-4 bg-mainColor animate-ping" />
                <p className="text-mainText font-semibold">Update 1.1.0</p>
                <button className="ml-auto " onClick={() => setActive(!active)}>
                    <Icon iconName="close" className="size-4 fill-secondText" />
                </button>
            </div>
            <ol>
                <li>
                    <p>- Improved UI</p>
                </li>
                <li>
                    <p>- Additional server information</p>
                </li>
                <li>
                    <p>- Added updates page</p>
                </li>
            </ol>
            <Link
                aria-label="Read more"
                href="/updates/"
                className="fade bg-darkSelected hover:bg-darkOverlay p-2 text-center rounded-md text-mainText"
            >
                Read more
            </Link>
        </Container>
    )
}
