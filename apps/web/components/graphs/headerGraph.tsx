"use client"

import { ResponsiveLine } from "@nivo/line"
import { Container } from "../content"

const customColors = ["#35f03f", "#9b7af3", "#ffcd4c", "#ee3232", "#ee6ae0", "#6ae9ee"]

const theme = {
    grid: {
        line: {
            stroke: "#202024",
        },
    },
    axis: {
        ticks: {
            line: {
                stroke: "#202024",
            },
            text: {
                fill: "#7e7e7e",
            }
        },
    },
    crosshair: {
        line: {
            stroke: '#dadada',
            strokeWidth: 1,
        },
    }
}

const Graph = ({ data }: any) => (
    <ResponsiveLine
        theme={theme}
        data={data}
        margin={{ top: 8, right: 8, bottom: 100, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            reverse: false,
        }}
        colors={customColors}
        axisTop={null}
        axisRight={null}
        enableSlices="x"
        axisLeft={{
            tickSize: 10,
            tickPadding: 10,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisBottom={{
            tickSize: 10,
            tickPadding: 10,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 100,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        sliceTooltip={({ slice }) => (
            <Container className="flex flex-col">
                {slice.points.map(point => (
                    <div key={point.id} className="inline-flex gap-2 text-secondText">
                        <p
                            className={`text-sm leading-5`}
                            style={{
                                color: point.serieColor,
                            }}
                        >
                            ■
                        </p>
                        <strong className="text-mainText">{point.serieId}: </strong>
                        <p >{point.data.yFormatted}</p>
                    </div>
                ))}
            </Container>
        )}
    />
)

export default Graph
