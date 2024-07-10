"use client"

import { FilterOption } from "./filterOption"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import { Dropdown } from "../layout/dropdown/dropdown"
import { MinecraftEdition } from "@repo/gateway"
import { Icon } from "../icon"
import Link from "next/link"
import { FilterSearch } from "./filterSearch"
import { useTheme } from "next-themes"
import { DropdownButton } from "../layout/dropdown/dropdownButton"

export interface Props {
    urlParams: URLParams
}

export const Filters = ({ urlParams }: Props) => {
    const { setTheme, resolvedTheme } = useTheme()
    
    return (
        <div id="options" className="flex flex-col tablet:flex-row items-center gap-4 w-full h-fit shrink-0 px-2 tablet:px-8 py-4 border-b-2 bg-whiteFill dark:bg-darkFill border-whiteBorder dark:border-darkBorder">
            <Link
                id="homepage-icon"
                href={`/${buildURL(urlParams)}`}
                className="inline-flex items-center max-w-content gap-4 tablet:mr-4"
            >
                <Icon iconName="icon" className="size-6 fill-whiteMT dark:fill-mainColor" />
            </Link>

            <FilterSearch urlParams={urlParams} />

            <ul
                id="option-dropdowns"
                className={`ml-auto flex flex-col tablet:flex-row max-tablet:w-full gap-4`}
            >
                <Dropdown id={`dropdown-theme`} title="Theme" icon="lightbulb">
                    <DropdownButton
                        onClick={() => setTheme("dark")}
                    >
                        Dark theme
                    </DropdownButton>
                    <DropdownButton
                        onClick={() => setTheme("light")}
                    >
                        Light theme
                    </DropdownButton>
                </Dropdown>

                <Dropdown id={`dropdown-edition`} title="Edition" icon="cube">
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
                </Dropdown>

                <Dropdown id={`dropdown-view`} title="View" icon="view">
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
                </Dropdown>
                <Dropdown id={`dropdown-datarange`} title="Data range" icon="calendar">
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
                </Dropdown>
            </ul>
        </div>
    )
}
