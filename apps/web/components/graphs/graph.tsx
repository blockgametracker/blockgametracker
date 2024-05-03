"use client"

import { ResponsiveLine } from "@nivo/line"
import { Container, DarkContainer } from "@/components/layout/content"
import { linearGradientDef } from "@nivo/core"
import { COLOR_MAX, theme } from "@/utils/graphUtils"
import { Icon } from "@/components/icon"
import type { ServerData } from "@/utils/parsedData"
import { DataRange } from "@/utils/dataRange"

interface Props {
    data: ServerData[]
    colors: string[]
    fill: boolean
    areaBaselineValue?: number
    ticksX?: string[]
    ticksY?: number[]
    peak?: string
    dataRange?: DataRange
}

export const Graph = ({
    data,
    colors,
    fill,
    areaBaselineValue,
    ticksX,
    ticksY,
    peak,
    dataRange,
}: Props) => {
    return (
        <div className="relative w-full h-full">
            <div className="absolute flex flex-col items-center justify-center top-0 left-0 w-full h-full bg-darkFill animate-pulse">
                <Icon iconName="icon" className="w-6 h-6 fill-secondText" />
            </div>
            <ResponsiveLine
                theme={theme}
                data={data}
                margin={{
                    top: 0,
                    right: 0,
                    bottom: ticksX ? 20 : 0,
                    left: ticksY ? 40 : 0,
                }}
                enableArea={fill}
                areaOpacity={0.4}
                areaBaselineValue={areaBaselineValue ? areaBaselineValue : 0}
                colors={colors}
                enableSlices="x"
                enablePoints={false}
                gridXValues={ticksX ? ticksX : []}
                gridYValues={ticksY ? ticksY : []}
                axisTop={null}
                axisRight={null}
                axisLeft={{ tickValues: ticksY }}
                axisBottom={{
                    tickValues: ticksX,
                    format: (tick: string) => {
                        const year = tick.substring(0, 4)
                        const month = tick.substring(5, 7)
                        const day = tick.substring(8, 10)
                        const hour = tick.substring(11, 13)
                        const minute = tick.substring(14, 16)

                        switch (dataRange) {
                            case DataRange.HOUR:
                                return `${hour}:${minute}`
                            case DataRange.DAY:
                                return `${hour}:${minute}`
                            case DataRange.WEEK:
                                return `${month}/${day}`
                            case DataRange.MONTH:
                                return `${month}/${day}`
                            case DataRange.YEAR:
                                return `${month}/${year}`
                            default:
                                return tick
                        }
                    },
                }}
                xScale={{ type: "point" }}
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    reverse: false,
                }}
                defs={[
                    linearGradientDef("gradientA", [
                        { offset: 0, color: "inherit", opacity: 0.8 },
                        { offset: 100, color: "inherit", opacity: 0.2 },
                    ]),
                ]}
                markers={
                    peak
                        ? [
                              {
                                  axis: "x",
                                  lineStyle: {
                                      stroke: COLOR_MAX,
                                      strokeWidth: 2,
                                      strokeDasharray: "8 8",
                                      strokeDashoffset: "0",
                                  },
                                  value: peak ? peak : "",
                              },
                          ]
                        : []
                }
                fill={[{ match: "*", id: "gradientA" }]}
                sliceTooltip={({ slice }) => (
                    <DarkContainer className="flex flex-col z-50">
                        <strong className="text-mainText font-normal whitespace-nowrap">
                            {slice.points[0].data.xFormatted}
                        </strong>

                        {slice.points.map((point) => (
                            <div
                                key={point.id}
                                className="flex flex-col text-secondText whitespace-nowrap"
                            >
                                <div className="inline-flex gap-2 text-secondText items-center">
                                    <div
                                        className={`w-2 h-2`}
                                        style={{
                                            backgroundColor: point.serieColor,
                                        }}
                                    />
                                    <p>{point.serieId}: </p>
                                    <p className="text-mainText">
                                        {point.data.yFormatted}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </DarkContainer>
                )}
            />
        </div>
    )
}
