import { DarkContainer } from "../content"
import Image from "next/image"
import Graph from "../graphs/graph"
import React from "react"
import { ServerInfo, getOnlineInRange } from "@repo/gateway"
import { calculatePercentageChange, convertTime } from "@/utils/dataUtils"
import { greenGraph, redGraph } from "../../utils/graphUtils"
import { ServerData } from "./serverCard"
import { DataRangeParams } from "@/utils/dataRange"

export const server = async ({
    server,
    rangeParams,
}: {
    server: ServerInfo
    rangeParams: DataRangeParams
}) => {
    const onlineInRange = await getOnlineInRange(
        server.server_name,
        "java",
        rangeParams.start,
        rangeParams.step,
    )
    const serverArray: ServerData[] = [
        {
            id: server.server_name,
            data: convertTime(onlineInRange.data),
        },
    ]

    const percentage = calculatePercentageChange(onlineInRange.data)

    return (
        <DarkContainer id="servers" className="fade flex flex-row gap-4 w-full">
            <div className="w-2/3 inline-flex gap-4 items-center whitespace-nowrap">
                <Image
                    src={`/images/placeholder.jpg`}
                    alt={`mcc island`}
                    className="fade gradient object-cover aspect-square image w-12 h-12 rounded-md group-hover:opacity-40 group-hover:blur-sm"
                    sizes="(max-width: 384px) 64px, 64px"
                    title="mcc"
                    width={64}
                    height={64}
                    blurDataURL={`/images/placeholder.jpg`}
                    placeholder="blur"
                />
                <div className="flex flex-col">
                    <div className="inline-flex gap-2 items-center">
                        <h3>{server.server_name}</h3>
                        <p
                            className={
                                percentage >= 0
                                    ? "text-mainColor"
                                    : "text-red-500"
                            }
                        >
                            {percentage}%
                        </p>
                    </div>
                    <p>{server.server_host}</p>
                </div>
                /
            </div>

            <div className="ml-auto w-1/3 h-16">
                <Graph
                    data={serverArray}
                    fill={true}
                    ticksX={[]}
                    ticksY={[]}
                    colors={percentage >= 0 ? greenGraph : redGraph}
                />
            </div>
        </DarkContainer>
    )
}

export default server
