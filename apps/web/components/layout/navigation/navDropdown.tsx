"use client"

import { DataRange, rangeToText, searchParamToRange } from "@/utils/dataRange"
import { DarkContainer } from "../content"
import Link from "next/link"
import Icon from "../../icon"
import { useState } from "react"

const Dropdown = ({ selectedRange }: { selectedRange: string }) => {
    const [active, setActive] = useState(false)

    return (
        <div className="relative" onClick={() => setActive(!active)}>
            <button className="fade group inline-flex gap-2 items-center whitespace-nowrap p-2 px-4 rounded-md border-2 border-darkOverlay hover:border-secondText hover:text-mainText">
                <Icon iconName="clock" className="fade w-4 h-4 fill-secondText group-hover:fill-mainText" />
                Last 1 {searchParamToRange(selectedRange)}
            </button>
            
            <div
                className={`absolute top-0 left-0 z-10 mt-12 ${active ? "flex" : "hidden"}`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
            >
                <div className="rounded-md border-2 bg-darkFill border-darkOverlay ">
                    {Object.values(DataRange).map((range, index) => (
                        <Link
                            className={`fade block px-4 py-2 whitespace-nowrap ${range === selectedRange ? "bg-darkOverlay text-mainText":"hover:bg-darkOverlay hover:text-mainText"}`}
                            role="menuitem"
                            id={`menu-item-${index}`}
                            href={`?range=${range}`}
                            key={`link-${range}`}
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