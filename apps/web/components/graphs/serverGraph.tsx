"use client"

import { ResponsiveLine } from "@nivo/line"
import { Container } from "../content"
import { linearGradientDef } from "@nivo/core"
import { graphColors, theme } from "./graph"

const HeaderGraph = ({ data }: any) => (
    <ResponsiveLine
        theme={theme}
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        enableArea={true}
        areaOpacity={0.3}
        colors={graphColors}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableSlices="x"
        enablePoints={false}
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
                { offset: 0, color: "inherit" },
                { offset: 100, color: "inherit", opacity: 0 },
            ]),
        ]}
        fill={[{ match: "*", id: "gradientA" }]}
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
                            Online players:{" "}
                        </strong>
                        <p>{point.data.yFormatted}</p>
                    </div>
                ))}
            </Container>
        )}
    />
)

export default HeaderGraph
