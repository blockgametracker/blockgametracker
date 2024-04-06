"use client"

import Link from "next/link"
import Icon from "../../icon"
import { NavButton } from "./navButton"
import { Section } from "../content"
import { useSearchParams } from "next/navigation"
import { DataRange, rangeToText, searchParamToRange } from "@/utils/dataRange"
import Dropdown from "./navDropdown"
import { useState } from "react"

const navigation = ({ page }: { page: string }) => {
    const searchParams = useSearchParams()
    const selectedRange = searchParams.get("range") as string
    const dateRange = searchParamToRange(selectedRange)

    const [active, setActive] = useState(false)

    return (
        <Section className="fixed top-0 border-b-2 border-darkOverlay bg-darkFill phone:bg-opacity-60 phone:backdrop-blur-md z-20">
            <div className="w-full h-full flex flex-col phone:flex-row items-center py-4">
                <div className="w-full phone:w-fit h-full flex flex-row items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center max-w-content gap-2"
                    >
                        <Icon iconName="icon" className="w-6 h-6 fill-mainColor" />
                        <p className="text-mainText flex phone:hidden">
                            Blockgametracker
                        </p>
                    </Link>

                    <button className="group ml-auto flex phone:hidden" onClick={() => setActive(!active)}>
                        <Icon
                            iconName="bars"
                            className="fade w-6 h-6 fill-secondText group-hover:fill-mainText"
                        />
                    </button>
                </div>

                <div className={`w-full pt-8 phone:pt-0 phone:items-center ${active ? "w-full flex flex-col phone:flex-row" : "hidden phone:flex"}`}>
                    <div className="flex flex-col phone:flex-row">
                        <NavButton
                            target="home"
                            currentPage={page}
                            href={!selectedRange ? "/" : `/?range=${dateRange}`}
                        >
                            Home
                        </NavButton>
                        <NavButton
                            target="compare"
                            currentPage={page}
                            href={
                                !selectedRange
                                    ? "/compare"
                                    : `/compare?range=${dateRange}`
                            }
                        >
                            Server comparison
                        </NavButton>
                        <NavButton
                            target="as-statistics"
                            currentPage={page}
                            href="https://blockgametracker.gg/d/nlKArnQ4k/global-playercount-by-as"
                        >
                            AS Statistics
                        </NavButton>
                    </div>

                    <div className="gap-8 ml-auto inline-flex">
                        <Dropdown selectedRange={selectedRange} />
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default navigation
