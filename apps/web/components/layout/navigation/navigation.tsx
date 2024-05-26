"use client"

import Link from "next/link"
import { Icon } from "@/components/icon"
import { NavButton } from "../../button/navButton"
import { Section } from "@/components/layout/content"
import { useSearchParams } from "next/navigation"
import { Dropdown } from "./navDropdown"
import { useState } from "react"
import { buildURL, getURLParams } from "@/utils/urlBuilder"
import { ServerFilters } from "@/components/server/serverFilters"

interface Props {
    page: string
}

export const Navigation = (props: Props) => {
    const searchParams = useSearchParams()
    const selectedRange = searchParams.get("range") as string

    const urlParams = getURLParams(
        selectedRange,
        searchParams.get("edition") as string,
        searchParams.get("servers") as string,
        searchParams.get("showServers") as string,
    )

    const [active, setActive] = useState(false)

    return (
        <Section className="fixed top-0 border-b-2 border-darkOverlay bg-darkFill z-10">
            <div className="w-full py-4 flex flex-col tablet:flex-row items-center">
                <div className="w-full tablet:w-fit flex flex-row items-center">
                    <Link
                        href={`/${buildURL(urlParams.rangeParams, urlParams.edition, urlParams.servers, urlParams.showServers)}`}
                        className="inline-flex items-center max-w-content gap-2 tablet:mr-4"
                    >
                        <Icon
                            iconName="icon"
                            className="w-6 h-6 fill-mainColor"
                        />
                        <p className="text-mainText flex tablet:hidden">
                            blockgametracker
                        </p>
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

                <div
                    className={`w-full gap-4 tablet:gap-0 pt-8 tablet:pt-0 tablet:items-center ${active ? "w-full flex flex-col tablet:flex-row" : "hidden tablet:flex"}`}
                >
                    <div className="flex flex-col tablet:flex-row">
                        <NavButton
                            target="home"
                            currentPage={props.page}
                            href={`/${buildURL(urlParams.rangeParams, urlParams.edition, null, urlParams.showServers)}`}
                        >
                            Home
                        </NavButton>
                        <NavButton
                            target="compare"
                            currentPage={props.page}
                            href={`/compare${buildURL(urlParams.rangeParams, urlParams.edition, null, urlParams.showServers)}`}
                        >
                            Compare Servers
                        </NavButton>
                        <NavButton
                            target="as-statistics"
                            currentPage={props.page}
                            href={`/as-statistics${buildURL(urlParams.rangeParams, urlParams.edition, null, urlParams.showServers)}`}
                        >
                            AS Statistics
                        </NavButton>
                        <NavButton
                            currentPage={props.page}
                            href="https://github.com/clrxbl/blockgametracker/blob/main/kustomize/base/config/servers.yaml"
                        >
                            Suggest Server
                        </NavButton>
                        <NavButton
                            currentPage={props.page}
                            href="https://blockgametracker.gg/d/y9qAlLSVz/blockgametracker?orgId=1&refresh=30s"
                        >
                            Legacy Dashboard
                        </NavButton>
                    </div>

                    <div className="gap-4 tablet:gap-8 tablet:ml-auto flex flex-col tablet:flex-row">
                        <ServerFilters {...urlParams} />
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
