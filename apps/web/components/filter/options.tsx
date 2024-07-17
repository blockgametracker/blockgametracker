"use client"

import { OptionLink } from "./optionLink"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import { Dropdown } from "../layout/dropdown/dropdown"
import { MinecraftEdition } from "@repo/gateway"
import { Icon } from "../icon"
import Link from "next/link"
import { OptionSearch } from "./optionSearch"
import { useState } from "react"
import { Container } from "../layout/container/container"

export interface Props {
    urlParams: URLParams
    id?: string
    className?: string
}

export const Options = ({ urlParams, id, className }: Props) => {
    const [active, setActive] = useState(false)

    return (
        <div
            id={id}
            className={`flex flex-col gap-2 px-2 tablet:px-0 items-start ${className}`}
        >
            <button
                onClick={() => setActive(!active)}
                className="w-full tablet:hidden"
            >
                <Container className="items-center inline-flex gap-2 p-4 w-full">
                    <span>Options</span>
                    <Icon
                        iconName={active ? "close" : "ellipsis_vertical"}
                        className="ml-auto fill-secondText size-4"
                    />
                </Container>
            </button>
            <div
                id="options"
                className={`tablet:flex tablet:flex-row items-center gap-4 w-full h-fit shrink-0 px-2 tablet:px-8 py-4 border-2 rounded-md tablet:border-b-2 bg-whiteFill dark:bg-darkFill border-whiteBorder dark:border-darkBorder ${active ? "flex flex-col" : "hidden"}`}
            >
                <Link
                    id="homepage-icon"
                    href={`/${buildURL(urlParams)}`}
                    className="hidden tablet:inline-flex items-center max-w-content gap-4 tablet:mr-4"
                >
                    <Icon
                        iconName="icon"
                        className="size-6 fill-whiteMT dark:fill-mainColor"
                    />
                </Link>

                <OptionSearch urlParams={urlParams} />

                <ol
                    id="option-dropdowns"
                    className={`ml-auto flex flex-col tablet:flex-row max-tablet:w-full gap-4`}
                >
                    <li>
                        <Dropdown
                            id={`dropdown-edition`}
                            title="Edition"
                            icon="cube"
                        >
                            <OptionLink
                                updates={{
                                    edition: MinecraftEdition.JAVA,
                                }}
                                URLParams={urlParams}
                                text="Java"
                            />
                            <OptionLink
                                updates={{
                                    edition: MinecraftEdition.BEDROCK,
                                }}
                                URLParams={urlParams}
                                text="Bedrock"
                            />
                        </Dropdown>
                    </li>
                    <li>
                        <Dropdown id={`dropdown-view`} title="View" icon="view">
                            <OptionLink
                                updates={{ view: "default" }}
                                URLParams={urlParams}
                                text="Default"
                            />
                            <OptionLink
                                updates={{ view: "compact" }}
                                URLParams={urlParams}
                                text="Compact"
                            />
                        </Dropdown>
                    </li>
                    <li>
                        <Dropdown
                            id={`dropdown-datarange`}
                            title="Data range"
                            icon="calendar"
                        >
                            <OptionLink
                                updates={{ start: "-1h", step: "10s" }}
                                URLParams={urlParams}
                                text="Last 1 hour"
                            />
                            <OptionLink
                                updates={{ start: "-6h", step: "1m" }}
                                URLParams={urlParams}
                                text="Last 6 hours"
                            />
                            <OptionLink
                                updates={{ start: "-1d", step: "4m" }}
                                URLParams={urlParams}
                                text="Last 1 day"
                            />
                            <OptionLink
                                updates={{ start: "-7d", step: "1h" }}
                                URLParams={urlParams}
                                text="Last 7 days"
                            />
                            <OptionLink
                                updates={{ start: "-30d", step: "6h" }}
                                URLParams={urlParams}
                                text="Last 30 days"
                            />
                            <OptionLink
                                updates={{ start: "-1y", step: "1d" }}
                                URLParams={urlParams}
                                text="Last 1 year"
                            />
                        </Dropdown>
                    </li>
                </ol>
            </div>
        </div>
    )
}
