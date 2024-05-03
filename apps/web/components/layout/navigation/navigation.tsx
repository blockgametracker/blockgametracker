"use client"

import Link from "next/link"
import { Icon } from "@/components/icon"
import { NavButton } from "./navButton"
import { Section } from "@/components/layout/content"
import { useSearchParams } from "next/navigation"
import { searchParamToRange } from "@/utils/dataRange"
import { Dropdown } from "./navDropdown"
import { useState } from "react"
import { getURLParams } from "@/utils/urlBuilder"

interface Props {
    page: string
}

export const Navigation = (props: Props) => {
    const searchParams = useSearchParams()
    const selectedRange = searchParams.get("range") as string
    const dateRange = searchParamToRange(selectedRange)

    const urlParams = getURLParams(
        selectedRange,
        searchParams.get("edition") as string,
        searchParams.get("compact") as string,
        searchParams.get("servers") as string,
        searchParams.get("showServers") as string,
    )

    const [active, setActive] = useState(false)

    return (
        <Section className="fixed top-0 border-b-2 border-darkOverlay bg-darkFill phone:backdrop-blur-md z-10">
            <div className="w-full h-16 flex flex-col phone:flex-row items-center">
                <div className="w-full phone:w-fit flex flex-row items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center max-w-content gap-2 tablet:mr-4"
                    >
                        <Icon
                            iconName="icon"
                            className="w-6 h-6 fill-mainColor"
                        />
                        <p className="text-mainText flex phone:hidden">
                            Blockgametracker
                        </p>
                    </Link>

                    <button
                        className="group ml-auto flex phone:hidden"
                        onClick={() => setActive(!active)}
                    >
                        <Icon
                            iconName="bars"
                            className="fade w-6 h-6 fill-secondText group-hover:fill-mainText"
                        />
                    </button>
                </div>

                <div
                    className={`w-full pt-8 phone:pt-0 phone:items-center ${active ? "w-full flex flex-col phone:flex-row" : "hidden phone:flex"}`}
                >
                    <div className="flex flex-col phone:flex-row">
                        <NavButton
                            target="home"
                            currentPage={props.page}
                            href={!selectedRange ? "/" : `/?range=${dateRange}`}
                        >
                            Home
                        </NavButton>
                        <NavButton
                            target="compare"
                            currentPage={props.page}
                            href={
                                !selectedRange
                                    ? "/compare"
                                    : `/compare?range=${dateRange}`
                            }
                        >
                            Compare servers
                        </NavButton>
                        <NavButton
                            currentPage={props.page}
                            href="https://blockgametracker.gg/d/nlKArnQ4k/global-playercount-by-as"
                        >
                            AS Statistics
                        </NavButton>
                        <NavButton
                            currentPage={props.page}
                            href="https://github.com/clrxbl/blockgametracker/blob/main/kustomize/base/config/servers.yaml"
                        >
                            Suggest server
                        </NavButton>
                    </div>

                    <div className="gap-8 ml-auto inline-flex">
                        <Dropdown
                            selectedRange={selectedRange}
                            urlParams={urlParams}
                        />
                    </div>
                </div>
            </div>
        </Section>
    )
}
