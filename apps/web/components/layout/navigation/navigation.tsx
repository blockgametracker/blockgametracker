"use client"

import Link from "next/link"
import { Icon } from "@/components/icon"
import { NavButton } from "./navButton"
import { useState } from "react"
import { URLParams, buildURL, getURLParams } from "@/utils/urlBuilder"
import { NavSection } from "./navSection"
import { NavLogo } from "./navLogo"
import { NavUpdate } from "./navUpdate"
import { Footer } from "../footer"

interface Props {
    page: string
    urlParams: URLParams
}

export const Navigation = ({ urlParams, page }: Props) => {
    const [active, setActive] = useState(false)

    return (
        <div className="shrink-0 w-full tablet:w-[15vw] h-fit tablet:h-full p-4 tablet:flex flex-col gap-8 border-r-2 border-darkOverlay bg-darkFill z-10">
            <NavLogo
                urlParams={urlParams}
                active={active}
                setActive={setActive}
            />

            <ul className="`w-full h-full flex flex-col gap-8 bg-opacity-60">
                <NavSection title="Menu">
                    <NavButton
                        iconName="home"
                        target="home"
                        currentPage={page}
                        href={`/${buildURL(urlParams)}`}
                    >
                        Home
                    </NavButton>
                    <NavButton
                        iconName="compare"
                        target="compare"
                        currentPage={page}
                        href={`/compare${buildURL(urlParams)}`}
                    >
                        Compare Servers
                    </NavButton>
                    <NavButton
                        iconName="chartpie"
                        target="as-statistics"
                        currentPage={page}
                        href={`/as-statistics${buildURL(urlParams)}`}
                    >
                        AS Statistics
                    </NavButton>
                    <NavButton
                        iconName="information"
                        target="Updates"
                        currentPage={page}
                        href={`/updates${buildURL(urlParams)}`}
                    >
                        Updates
                    </NavButton>
                </NavSection>
                <NavSection title="More">
                    <NavButton
                        iconName="graph"
                        currentPage={page}
                        href="https://grafana.blockgametracker.gg"
                    >
                        Grafana
                    </NavButton>
                    <NavButton
                        iconName="pen"
                        currentPage={page}
                        href="https://github.com/clrxbl/blockgametracker/blob/main/kustomize/base/config/servers.yaml"
                    >
                        Suggest Server
                    </NavButton>
                    <NavButton
                        iconName="github"
                        currentPage={page}
                        href="https://grafana.blockgametracker.gg"
                    >
                        Github
                    </NavButton>
                </NavSection>

                <NavUpdate />

                <Footer />
            </ul>
        </div>
    )
}
