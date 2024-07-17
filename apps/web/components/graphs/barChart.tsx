"use client"

import { BarDatum, ResponsiveBar } from "@nivo/bar"
import { barChartTheme } from "@/utils/graphUtils"

interface Props {
    data: BarDatum[]
    enableArcLinkLabels?: boolean
    legend?: boolean
}

export const BarChart = ({ data }: Props) =>
    data.length !== 0 ? (
        <div className="w-full h-full">
            <ResponsiveBar
                data={data}
                keys={["y"]}
                colors={{ datum: "color" }}
                theme={barChartTheme}
                indexBy="x"
                margin={{ top: 0, right: 0, bottom: 0, left: 30 }}
                padding={0.5}
                borderRadius={8}
                enableLabel={false}
                enableTotals={true}
                role="application"
            />
        </div>
    ) : (
        <div className="w-full h-60 flex items-center justify-center">
            <p>No data found</p>
        </div>
    )
