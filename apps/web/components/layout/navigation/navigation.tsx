"use client"

import { NavButton } from "./navButton"
import { useEffect, useState } from "react"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import { NavSection } from "./navSection"
import { NavUpdate } from "./navUpdate"
import { Icon } from "@/components/icon"
import { useTheme } from "next-themes"
import { Container } from "../container/container"

interface Props {
    page: string
    urlParams: URLParams
}

export const Navigation = ({ urlParams, page }: Props) => {
    const [active, setActive] = useState(false)

    return (
        <nav
            id="navigation"
            className="shrink-0 w-full tablet:w-[15vw] h-fit tablet:h-full p-2 tablet:p-4 flex flex-col gap-2 tablet:gap-8 border-b-2 tablet:border-b-0 tablet:border-r-2 border-whiteBorder dark:border-darkBorder bg-whiteFill dark:bg-darkFill z-10"
        >
            <button
                onClick={() => setActive(!active)}
                className="w-fit tablet:hidden"
            >
                <div className="items-center inline-flex gap-2 p-4 w-fit">
                    <Icon
                        iconName={active ? "close" : "bars"}
                        className="fill-secondText size-6"
                    />
                </div>
            </button>
            <ul
                id="navigation-sections"
                className={`w-full h-full tablet:flex flex-col gap-8 bg-opacity-60 ${active ? "flex" : "hidden"}`}
            >
                <NavSection>
                    <NavButton
                        iconName="home"
                        page="home"
                        currentPage={page}
                        href={`/${buildURL(urlParams, { search: undefined })}`}
                    >
                        Home
                    </NavButton>
                    <NavButton
                        iconName="compare"
                        page="compare"
                        currentPage={page}
                        href={`/compare${buildURL(urlParams, { search: undefined })}`}
                    >
                        Compare Servers
                    </NavButton>
                    <NavButton
                        iconName="chartpie"
                        page="as-statistics"
                        currentPage={page}
                        href={`/as-statistics${buildURL(urlParams, { search: undefined })}`}
                    >
                        AS Statistics
                    </NavButton>
                </NavSection>
                <NavSection title="More">
                    <NavButton
                        iconName="graph"
                        currentPage={page}
                        href="https://grafana.blockgametracker.gg"
                        target="_blank"
                    >
                        Grafana
                        <Icon
                            iconName="link"
                            className="fade group-hover:fill-mainText ml-auto fill-secondText size-4"
                        />
                    </NavButton>
                    <NavButton
                        iconName="pen"
                        currentPage={page}
                        href="https://github.com/clrxbl/blockgametracker/blob/main/kustomize/base/config/servers.yaml"
                        target="_blank"
                    >
                        Suggest Server
                        <Icon
                            iconName="link"
                            className="fade group-hover:fill-mainText ml-auto fill-secondText size-4"
                        />
                    </NavButton>
                    <NavButton
                        iconName="github"
                        currentPage={page}
                        href="https://github.com/blockgametracker/blockgametracker"
                        target="_blank"
                    >
                        Github
                        <Icon
                            iconName="link"
                            className="fade group-hover:fill-mainText ml-auto fill-secondText size-4"
                        />
                    </NavButton>
                </NavSection>
                <NavUpdate />
            </ul>
        </nav>
    )
}
