"use client"

import {
    DataRange,
    DataRangeParams,
    getRangeParams,
    rangeToText,
    searchParamToRange,
} from "@/utils/dataRange"
import Link from "next/link"
import Icon from "../../icon"
import { useState } from "react"
import { URLParams, buildURL } from "@/utils/urlBuilder"

interface Props {
    selectedRange: string
    urlParams: URLParams
}

const Dropdown = (props: Props) => {
    const [active, setActive] = useState(false)

    return (
        <div
            className="inline-flex gap-2 items-center relative"
            onClick={() => setActive(!active)}
        >
            <button className="fade group inline-flex gap-2 items-center whitespace-nowrap p-2 px-4 rounded-md border-2 border-darkOverlay hover:border-secondText hover:text-mainText">
                <Icon
                    iconName="clock"
                    className="fade w-4 h-4 fill-secondText group-hover:fill-mainText"
                />
                Last 1 {searchParamToRange(props.selectedRange)}
            </button>

            <div
                className={`absolute top-0 left-0 w-full z-10 mt-12 ${active ? "flex" : "hidden"}`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
            >
                <div className="w-full rounded-md border-2 bg-darkFill border-darkOverlay ">
                    {Object.values(DataRange).map((range, index) => (
                        <Link
                            className={`fade block px-4 py-2 whitespace-nowrap ${range === props.selectedRange ? "bg-darkOverlay text-mainText" : "hover:bg-darkOverlay hover:text-mainText"}`}
                            role="menuitem"
                            id={`menu-item-${index}`}
                            href={buildURL(
                                getRangeParams(range),
                                props.urlParams.compact,
                                props.urlParams.platform,
                            )}
                            key={index}
                        >
                            1 {rangeToText(range)}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dropdown
