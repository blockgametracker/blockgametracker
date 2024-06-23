"use client"

import Link from "next/link"
import { Icon } from "@/components/icon"
import { URLParams, buildURL } from "@/utils/urlBuilder"

interface Props {
    urlParams: URLParams
    active: boolean
    setActive: any
}
//TODO make setActive not any
export const NavLogo = ({ urlParams, active, setActive }: Props) => (
    <div className="w-full flex flex-col justify-center px-4 py-4">
        <Link
            href={`/${buildURL(urlParams)}`}
            className="inline-flex items-center max-w-content gap-4 tablet:mr-4"
        >
            <Icon iconName="icon" className="w-6 h-6 fill-mainColor" />
            <p className="text-mainText flex">blockgametracker</p>
        </Link>

        <button
            className="group ml-auto flex tablet:hidden"
            onClick={() => setActive(!active)}
        >
            <Icon
                iconName="bars"
                className="fade w-6 h-6 fill-secondText group-hover:fill-mainText"
            />
        </button>
    </div>
)
