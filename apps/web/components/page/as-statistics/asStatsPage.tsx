"use client"

import { PieChart } from "@/components/graphs/pieChart"
import { Container } from "@/components/layout/container/container"
import {
    ASData,
    CompareItem,
    GraphData,
    PieChartData,
} from "@/utils/parsedData"
import { URLParams } from "@/utils/urlBuilder"
import { CompareItems } from "../../graphs/compareItems"
import { calculateAverage, getPeak } from "@/utils/dataUtils"
import { useState } from "react"
import { ContainerTitle } from "@/components/layout/container/containerTitle"
import { ASStatsGraph } from "./asStatsGraph"
import { ASStatsPieChart } from "./asStatsPieChart"

interface Props {
    data: ASData[]
    urlParams: URLParams
}

export const ASStatsPage = ({ data, urlParams }: Props) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const graphData = data
        .filter(
            (server): server is ASData =>
                server !== null && selectedItems.includes(server.number),
        )

    const compareItems: CompareItem[] =
        data.map((item) => ({
            slug: item.number,
            color: item.color,
            name: item.name,
            current: item.data[item.data.length - 1].y,
            mean: calculateAverage(item.data),
            max: getPeak(item.data),
        })) ?? []

    return (
        <>
            <div className="tablet:w-[85vw] h-full flex flex-col gap-8">
                <ASStatsGraph data={graphData} urlParams={urlParams} />
                <div className="flex flex-col tablet:flex-row gap-8 w-full tablet:h-[12vw] shrink-0">
                    <Container className="flex flex-col w-full tablet:w-1/2">
                        <ContainerTitle icon="information">
                            <p>blockgametracker servers per AS</p>
                        </ContainerTitle>
                        <p className="p-4">Certain hosts may fluctuate in playercounts if there is a large server switching between multiple providers. One example is GommeHD which switches between OVH, Hetzner & SYNLINQ</p>
                    </Container>
                    <ASStatsPieChart data={graphData} />
                </div>
            </div>
            <CompareItems
                sessionStorageID="ASSelected"
                compareItems={compareItems}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
            />
        </>
    )
}
