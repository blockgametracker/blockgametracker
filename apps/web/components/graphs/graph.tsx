"use client"

import { ResponsiveLine } from "@nivo/line"
import { Container } from "../content"
import { linearGradientDef } from "@nivo/core"
import { theme } from "../../utils/graphUtils"
import Icon from "../icon"

const Graph = ({
    data,
    colors,
    fill,
    ticksX,
    ticksY,
}: {
    data: any[]
    colors: string[]
    fill: boolean
    ticksX?: number[]
    ticksY?: number[]
}) => (
    <div className="relative w-full h-full">
        <div className="absolute flex flex-col items-center justify-center top-0 left-0 w-full h-full bg-darkFill animate-pulse">
            <Icon iconName="icon" className="w-6 h-6 fill-secondText" />
        </div>
        <ResponsiveLine
            theme={theme}
            data={data}
            margin={{ top: 6, right: 0, bottom: 30, left: 50 }}
            enableArea={fill}
            areaOpacity={0.3}
            colors={colors}
            enableSlices="x"
            enablePoints={false}
            gridXValues={ticksX}
            gridYValues={ticksY}
            axisTop={null}
            axisRight={null}
            axisLeft={{
                tickSize: 10,
                tickPadding: 10,
                tickRotation: 0,
                legendOffset: 36,
                legendPosition: "middle",
                truncateTickAt: 0,
                tickValues: "auto",
            }}
            axisBottom={{
                tickSize: 10,
                tickPadding: 10,
                tickRotation: 0,
                legendOffset: 36,
                legendPosition: "middle",
                truncateTickAt: 0,
                tickValues: ticksX,
            }}
            xScale={{
                type: "point",
            }}
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
            fill={[{ match: "*", id: "gradientA" }]}
            sliceTooltip={({ slice }) => (
                <Container className="flex flex-col">
                    <strong className="text-mainText">
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

export default Graph
