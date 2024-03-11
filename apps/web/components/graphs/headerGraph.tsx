"use client"

import { ResponsiveLine } from "@nivo/line"
import { Container, DarkContainer } from "../content"
import { LegendItem, graphColors, theme } from "./graph"

export const HeaderGraph = ({ data }: any) => (
    <div className="col-span-2 flex flex-col gap-4">
        <DarkContainer className="w-full h-96 col-span-3 overflow-visible">
            <ResponsiveLine
                theme={theme}
                data={data}
                margin={{ top: 8, right: 14, bottom: 30, left: 40 }}
                xScale={{ type: "point" }}
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    reverse: false,
                }}
                colors={graphColors}
                axisTop={null}
                axisRight={null}
                enableSlices="x"
                axisLeft={{
                    tickSize: 10,
                    tickPadding: 10,
                    tickRotation: 0,
                    legendOffset: 36,
                    legendPosition: "middle",
                    truncateTickAt: 0,
                }}
                axisBottom={{
                    tickSize: 10,
                    tickPadding: 10,
                    tickRotation: 0,
                    legendOffset: 36,
                    legendPosition: "middle",
                    truncateTickAt: 0,
                }}
                sliceTooltip={({ slice }) => (
                    <Container className="flex flex-col">
                        {slice.points.map((point) => (
                            <div
                                key={point.id}
                                className="inline-flex gap-2 text-secondText"
                            >
                                <p
                                    className={`text-sm leading-5`}
                                    style={{
                                        color: point.serieColor,
                                    }}
                                >
                                    ■
                                </p>
                                <strong className="text-mainText">
                                    {point.serieId}:{" "}
                                </strong>
                                <p>{point.data.yFormatted}</p>
                            </div>
                        ))}
                    </Container>
                )}
            />
        </DarkContainer>
        <div className="w-full inline-flex gap-4">
            {data.map((server: any, index: any) => (
                <LegendItem server={server} index={index} />
            ))}
        </div>
    </div>
)
