"use client"

import { FilterButton } from "./filter"
import { URLParams } from "@/utils/urlBuilder"
import { FilterSection } from "./filterSection"
import { MinecraftEdition } from "@repo/gateway"
import { Icon } from "../icon"
import { useState } from "react"

export interface Props {
    urlParams: URLParams
}

export const Filters = (props: Props) => {
    const [query, setQuery] = useState("")
    //TODO change the way it redirects to the search page
    const handleSubmit = (event: any) => {
        event.preventDefault()
        if (query.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(query)}`
        }
    }

    return (
        <div className="flex flex-col tablet:flex-row items-center gap-4 w-full shrink-0 px-2 tablet:px-8 py-4 border-b-2 bg-darkFill border-darkOverlay">
            <div className="flex flex-row items-center w-full rounded-md border-2 bg-dark border-darkOverlay">
                <Icon
                    iconName="search"
                    className="ml-4 size-4 fill-secondText"
                />
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="fname"
                        name="fname"
                        className="p-4 w-full bg-transparent placeholder:text-secondText text-mainText focus:outline-none"
                        placeholder="Search"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </form>
            </div>

            <div
                className={`flex flex-col tablet:flex-row max-tablet:w-full gap-4`}
            >
                <FilterSection filter="Edition" icon="cube">
                    <FilterButton
                        updates={{
                            edition: MinecraftEdition.JAVA,
                            servers: [],
                        }}
                        URLParams={props.urlParams}
                        text="Java"
                    />
                    <FilterButton
                        updates={{
                            edition: MinecraftEdition.BEDROCK,
                            servers: [],
                        }}
                        URLParams={props.urlParams}
                        text="Bedrock"
                    />
                </FilterSection>

                <FilterSection filter="View" icon="view">
                    <FilterButton
                        updates={{ view: "default" }}
                        URLParams={props.urlParams}
                        text="Default"
                    />
                    <FilterButton
                        updates={{ view: "compact" }}
                        URLParams={props.urlParams}
                        text="Compact"
                    />
                </FilterSection>
                <FilterSection filter="Data range" icon="calendar">
                    <FilterButton
                        updates={{ start: "-1h", step: "30s" }}
                        URLParams={props.urlParams}
                        text="Last 1 hour"
                    />
                    <FilterButton
                        updates={{ start: "-6h", step: "1m" }}
                        URLParams={props.urlParams}
                        text="Last 6 hours"
                    />
                    <FilterButton
                        updates={{ start: "-1d", step: "4m" }}
                        URLParams={props.urlParams}
                        text="Last 1 day"
                    />
                    <FilterButton
                        updates={{ start: "-7d", step: "1h" }}
                        URLParams={props.urlParams}
                        text="Last 7 days"
                    />
                    <FilterButton
                        updates={{ start: "-30d", step: "6h" }}
                        URLParams={props.urlParams}
                        text="Last 30 days"
                    />
                    <FilterButton
                        updates={{ start: "-1y", step: "1d" }}
                        URLParams={props.urlParams}
                        text="Last 1 year"
                    />
                </FilterSection>
            </div>
        </div>
    )
}
