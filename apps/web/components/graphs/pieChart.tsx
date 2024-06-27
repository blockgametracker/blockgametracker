"use client"

import { ResponsivePie } from "@nivo/pie"
import type { PieChartData } from "@/utils/parsedData"
import { Container } from "../layout/container/container"
import { Tag } from "../tag"
import { GraphLegend } from "./graphLegend"

interface Props {
    data: PieChartData[]
    enableArcLinkLabels?: boolean
}

export const PieChart = ({ data, enableArcLinkLabels }: Props) =>{
    console.log(data)
    return (
    data.length !== 0 ? (
        <div className="flex flex-col w-full h-full justify-center">
            <ResponsivePie
                data={data}
                colors={(datum) => datum.data.color ?? "#1f1f21"}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.7}
                padAngle={0.7}
                cornerRadius={3}
                enableArcLabels={false}
                enableArcLinkLabels={enableArcLinkLabels ?? false}
                arcLinkLabelsTextColor="#7f7f7f"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLinkLabelsDiagonalLength={0}
                arcLinkLabelsStraightLength={50}
                fill={[{ match: { id: "other" }, id: "lines" }]}
                defs={[
                    {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "rgba(18, 18, 20, 0.8)",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                tooltip={(point) => (
                    <Container className="flex flex-row gap-2 z-50 p-4">
                        <Tag
                            color={point.datum.color}
                            text={`${point.datum.label.toString()}:`}
                        ></Tag>
                        <p className="text-mainText">
                            {point.datum.data.value}
                        </p>
                    </Container>
                )}
            />
        </div>
    ) : (
        <div className="w-full h-60 flex items-center justify-center">
            <p>No data found</p>
        </div>
    )
    )
}