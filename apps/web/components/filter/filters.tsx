"use client"

import { FilterOption } from "./filterOption"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import { FilterDropdown } from "./filterDropdown"
import { MinecraftEdition } from "@repo/gateway"
import { Icon } from "../icon"
import Link from "next/link"
import { FilterSearch } from "./filterSearch"

export interface Props {
    urlParams: URLParams
}

export const Filters = ({ urlParams }: Props) => {
    return (
        <div className="flex flex-col tablet:flex-row items-center gap-4 w-full h-fit shrink-0 px-2 tablet:px-8 py-4 border-b-2 bg-darkFill border-darkOverlay">
            <Link
                href={`/${buildURL(urlParams)}`}
                className="inline-flex items-center max-w-content gap-4 tablet:mr-4"
            >
                <Icon iconName="icon" className="size-6 fill-mainColor" />
            </Link>

            <FilterSearch urlParams={urlParams} />

            <div
                className={`ml-auto flex flex-col tablet:flex-row max-tablet:w-full gap-4`}
            >
                <FilterDropdown filter="Edition" icon="cube">
                    <FilterOption
                        updates={{
                            edition: MinecraftEdition.JAVA,
                        }}
                        URLParams={urlParams}
                        text="Java"
                    />
                    <FilterOption
                        updates={{
                            edition: MinecraftEdition.BEDROCK,
                        }}
                        URLParams={urlParams}
                        text="Bedrock"
                    />
                </FilterDropdown>

                <FilterDropdown filter="View" icon="view">
                    <FilterOption
                        updates={{ view: "default" }}
                        URLParams={urlParams}
                        text="Default"
                    />
                    <FilterOption
                        updates={{ view: "compact" }}
                        URLParams={urlParams}
                        text="Compact"
                    />
                </FilterDropdown>
                <FilterDropdown filter="Data range" icon="calendar">
                    <FilterOption
                        updates={{ start: "-1h", step: "10s" }}
                        URLParams={urlParams}
                        text="Last 1 hour"
                    />
                    <FilterOption
                        updates={{ start: "-6h", step: "1m" }}
                        URLParams={urlParams}
                        text="Last 6 hours"
                    />
                    <FilterOption
                        updates={{ start: "-1d", step: "4m" }}
                        URLParams={urlParams}
                        text="Last 1 day"
                    />
                    <FilterOption
                        updates={{ start: "-7d", step: "1h" }}
                        URLParams={urlParams}
                        text="Last 7 days"
                    />
                    <FilterOption
                        updates={{ start: "-30d", step: "6h" }}
                        URLParams={urlParams}
                        text="Last 30 days"
                    />
                    <FilterOption
                        updates={{ start: "-1y", step: "1d" }}
                        URLParams={urlParams}
                        text="Last 1 year"
                    />
                </FilterDropdown>
            </div>
        </div>
    )
}
