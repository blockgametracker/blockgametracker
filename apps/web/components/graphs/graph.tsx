"use client"

import { ResponsiveLine } from "@nivo/line"
import { Container } from "@/components/layout/content"
import { linearGradientDef } from "@nivo/core"
import { COLOR_MAX, theme } from "@/utils/graphUtils"
import { Icon } from "@/components/icon"
import type { ServerData } from "@/utils/parsedData"

interface Props {
    data: ServerData[]
    colors: string[]
    fill: boolean
    ticksX?: string[]
    ticksY?: number[]
    peak?: string
}

export const Graph = ({ data, colors, fill, ticksX, ticksY, peak }: Props) => {
    return (
        <div className="relative w-full h-full">
            <div className="absolute flex flex-col items-center justify-center top-0 left-0 w-full h-full bg-darkFill animate-pulse">
                <Icon iconName="icon" className="w-6 h-6 fill-secondText" />
            </div>
            <ResponsiveLine
                theme={theme}
                data={data}
                margin={{
                    top: 6,
                    right: 0,
                    bottom: ticksX ? 20 : 0,
                    left: ticksY ? 50 : 0,
                }}
                enableArea={fill}
                areaOpacity={0.3}
                colors={colors}
                enableSlices="x"
                enablePoints={false}
                gridXValues={ticksX ? ticksX : []}
                gridYValues={ticksY ? ticksY : []}
                axisTop={null}
                axisRight={null}
                axisLeft={{ tickValues: ticksY }}
                axisBottom={{ tickValues: ticksX }}
                xScale={{ type: "point" }}
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    reverse: false,
                }}
                defs={[
                    linearGradientDef("gradientA", [
                        { offset: 0, color: "inherit", opacity: 0.5 },
                        { offset: 100, color: "inherit", opacity: 0 },
                    ]),
                ]}
                markers={peak ? [
                    {
                        axis: 'x',
                        lineStyle: {
                            stroke: COLOR_MAX,
                            strokeWidth: 1,
                            strokeDasharray: "4 4",
                            strokeDashoffset: "2"
                        },
                        value: peak ? peak:""
                    }
                ]: []}
                fill={[{ match: "*", id: "gradientA" }]}
                sliceTooltip={({ slice }) => (
                    <Container className="flex flex-col">
                        <strong className="text-mainText whitespace-nowrap">
                            {slice.points[0].data.xFormatted}
                        </strong>

                        {slice.points.map((point) => (
                            <div
                                key={point.id}
                                className="flex flex-col text-secondText z-50 whitespace-nowrap"
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
                    </Container>
                )}
            />
        </div>
    )
}
