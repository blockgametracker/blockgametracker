"use client"

import { Container } from "../layout/container"
import { FilterButton } from "./filter"
import { URLParams } from "@/utils/urlBuilder"
import { FilterSection } from "./filterSection"
import { MinecraftEdition } from "@repo/gateway"
import { Icon } from "../icon"
import { useState } from "react"

export const Filters = ({ urlParams }: { urlParams: URLParams }) => {
    const [active, setActive] = useState(false)

    return (
        <Container className="flex flex-col w-full tablet:w-1/6 h-fit max-h-full shrink-0 overflow-hidden">
            <div className="flex flex-row items-center p-4">
                <h2>Options</h2>
                <button className="flex tablet:hidden ml-auto" onClick={() => setActive(!active)}>
                    <Icon iconName={active ? "close" : "fullscreen"} className="w-4 h-4 fill-mainText" />
                </button>
            </div>
            <div className={`divide-y-2 border-t-2 divide-darkOverlay border-darkOverlay overflow-scroll ${active ? "flex flex-col":"hidden tablet:flex flex-col"}`}>
                <FilterSection filter="Edition" icon="information">
                    <FilterButton updates={{ edition: "java" as MinecraftEdition }} URLParams={urlParams}>Java</FilterButton>
                    <FilterButton updates={{ edition: "bedrock" as MinecraftEdition }} URLParams={urlParams}>Bedrock</FilterButton>
                </FilterSection>

                <FilterSection filter="View" icon="graph">
                    <FilterButton updates={{ view: "default" }} URLParams={urlParams}>Default</FilterButton>
                    <FilterButton updates={{ view: "compact" }} URLParams={urlParams}>Compact</FilterButton>
                </FilterSection>

                <FilterSection filter="Data range" icon="graph">
                    <FilterButton updates={{ start: "-1h", step: "30s" }} URLParams={urlParams}>Last 1 hour</FilterButton>
                    <FilterButton updates={{ start: "-6h", step: "1m" }} URLParams={urlParams}>Last 6 hours</FilterButton>
                    <FilterButton updates={{ start: "-1d", step: "4m" }} URLParams={urlParams}>Last 1 day</FilterButton>
                    <FilterButton updates={{ start: "-7d", step: "1h" }} URLParams={urlParams}>Last 7 days</FilterButton>
                    <FilterButton updates={{ start: "-30d", step: "6h" }} URLParams={urlParams}>Last 30 days</FilterButton>
                    <FilterButton updates={{ start: "-1y", step: "1d" }} URLParams={urlParams}>Last 1 year</FilterButton>
                </FilterSection>
            </div>
        </Container>
    )
}
