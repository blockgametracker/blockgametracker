"use client"

import { ResponsiveLine } from "@nivo/line"
import { Container } from "../content"
import { graphColors, theme } from "./graph"

export const HeaderGraph = ({ data }: any) => (
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
)
