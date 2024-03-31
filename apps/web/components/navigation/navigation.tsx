"use client"

import Link from "next/link"
import Icon from "../icon"
import { NavButton } from "../navigation/navButton"
import { Section } from "../content"
import { useSearchParams } from "next/navigation"
import { DataRange, rangeToText, searchParamToRange } from "@/utils/dataRange"

const navigation = ({ page }: { page: string }) => {
    const searchParams = useSearchParams()
    const selectedRange = searchParams.get("range") as string
    const dateRange = searchParamToRange(selectedRange)

    return (
        <Section className="fixed top-0 border-b-2 border-darkOverlay bg-darkFill bg-opacity-60 backdrop-blur-md z-50">
            <div className="w-full h-16 inline-flex items-center">
                <Link
                    href="/"
                    className="inline-flex items-center max-w-content gap-2 mr-4"
                >
                    <Icon iconName="icon" className="w-6 h-6 fill-mainColor" />
                </Link>

                <NavButton
                    page="home"
                    currentPage={page}
                    href={
                        !selectedRange
                            ? "/"
                            : `?range=${dateRange}`
                    }
                >
                    Home
                </NavButton>
                <NavButton
                    page="server-comparison"
                    currentPage={page}
                    href={
                        !selectedRange
                            ? "/compare"
                            : `/compare?range=${dateRange}`
                    }
                >
                    Server comparison
                </NavButton>
                <NavButton
                    page="as-statistics"
                    currentPage={page}
                    href="https://blockgametracker.gg/d/nlKArnQ4k/global-playercount-by-as"
                >
                    AS Statistics
                </NavButton>
                <div className="inline-flex gap-8 ml-auto">
                    {Object.values(DataRange).map((range) => (
                        <Link
                            className={
                                selectedRange === range ||
                                (selectedRange === null &&
                                    range === DataRange.DAY)
                                    ? "text-mainText"
                                    : ""
                            }
                            href={`?range=${range}`}
                            key={`link-${range}`}
                        >
                            1 {rangeToText(range)}
                        </Link>
                    ))}
                </div>
            </div>
        </Section>
    )
}

export default navigation
