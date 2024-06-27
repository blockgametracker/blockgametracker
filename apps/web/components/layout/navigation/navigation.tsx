"use client"

import { NavButton } from "./navButton"
import { useState } from "react"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import { NavSection } from "./navSection"
import { NavUpdate } from "./navUpdate"
import { Icon } from "@/components/icon"

interface Props {
    page: string
    urlParams: URLParams
}

export const Navigation = ({ urlParams, page }: Props) => {
    const [active, setActive] = useState(false)

    return (
        <div className="shrink-0 w-full tablet:w-[15vw] h-fit tablet:h-full p-4 tablet:flex flex-col gap-8 border-r-2 border-darkOverlay bg-darkFill z-10">
            <ul className="`w-full h-full flex flex-col gap-8 bg-opacity-60">
                <NavSection>
                    <NavButton
                        iconName="home"
                        page="home"
                        currentPage={page}
                        href={`/${buildURL(urlParams, {search: undefined})}`}
                    >
                        Home
                    </NavButton>
                    <NavButton
                        iconName="compare"
                        page="compare"
                        currentPage={page}
                        href={`/compare${buildURL(urlParams, {search: undefined})}`}
                    >
                        Compare Servers
                    </NavButton>
                    <NavButton
                        iconName="chartpie"
                        page="as-statistics"
                        currentPage={page}
                        href={`/as-statistics${buildURL(urlParams, {search: undefined})}`}
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
                        <Icon iconName="link" className="fade group-hover:fill-mainText ml-auto fill-secondText size-4" />
                    </NavButton>
                    <NavButton
                        iconName="pen"
                        currentPage={page}
                        href="https://github.com/clrxbl/blockgametracker/blob/main/kustomize/base/config/servers.yaml"
                        target="_blank"
                    >
                        Suggest Server
                        <Icon iconName="link" className="fade group-hover:fill-mainText ml-auto fill-secondText size-4" />
                    </NavButton>
                    <NavButton
                        iconName="github"
                        currentPage={page}
                        href="https://github.com/blockgametracker/blockgametracker"
                        target="_blank"
                    >
                        Github
                        <Icon iconName="link" className="fade group-hover:fill-mainText ml-auto fill-secondText size-4" />
                    </NavButton>
                </NavSection>

                <NavUpdate />

                {/* <Footer /> */}
            </ul>
        </div>
    )
}
