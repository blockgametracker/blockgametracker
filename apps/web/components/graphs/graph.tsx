"use client"

import { ResponsiveLine } from "@nivo/line"
import { linearGradientDef } from "@nivo/core"
import { COLOR_MAX, theme } from "@/utils/graphUtils"
import type { ServerData } from "@/utils/parsedData"
import { Loading } from "./loading"
import { Container } from "../layout/container"
import { QueryStart } from "@repo/gateway"

interface Props {
    data: ServerData[]
    colors: string[]
    fill: boolean
    areaBaselineValue?: number
    ticksX?: string[]
    ticksY?: number[]
    peak?: string
    start?: QueryStart
    loaded?: boolean
}

export const Graph = ({
    data,
    colors,
    fill,
    areaBaselineValue,
    ticksX,
    ticksY,
    peak,
    start,
    loaded,
}: Props) => {
    return (
        <div className="relative w-full h-full">
            <Loading />

            {!loaded ? (
                <Loading />
            ) : (
                <ResponsiveLine
                    theme={theme}
                    data={data.map((data) => {
                        return {
                            id: data.server_slug,
                            data: data.data,
                        }
                    })}
                    margin={{
                        top: 3,
                        right: 0,
                        bottom: ticksX ? 20 : 0,
                        left: ticksY ? 40 : 0,
                    }}
                    enableArea={fill}
                    areaOpacity={0.3}
                    areaBaselineValue={
                        areaBaselineValue ? areaBaselineValue : 0
                    }
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

                            switch (start) {
                                case "-1h":
                                    return `${hour}:${minute}`
                                case "-6h":
                                    return `${hour}:${minute}`
                                case "-1d":
                                    return `${hour}:${minute}`
                                case "-7d":
                                    return `${month}/${day}`
                                case "-1m":
                                    return `${month}/${day}`
                                case "-1y":
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
                            { offset: 100, color: "inherit", opacity: 0.1 },
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
                        <Container className="flex flex-col z-50 p-4">
                            <strong className="text-mainText font-normal whitespace-nowrap">
                                {slice.points[0].data.xFormatted}
                            </strong>

                            {slice.points.toReversed().map((point) => (
                                <div
                                    key={`tooltip-${point.id}`}
                                    className="flex flex-col text-secondText whitespace-nowrap"
                                >
                                    <div className="inline-flex gap-2 text-secondText items-center">
                                        <div
                                            className={`w-2 h-2`}
                                            style={{
                                                backgroundColor:
                                                    point.serieColor,
                                            }}
                                        />
                                        <p>{point.serieId}: </p>
                                        <p className="text-mainText">
                                            {point.data.yFormatted}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </Container>
                    )}
                />
            )}
        </div>
    )
}
