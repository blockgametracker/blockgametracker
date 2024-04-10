import { calculateAverage, getPeak } from "@/utils/dataUtils"
import { greenGraph } from "@/utils/graphUtils"
import { ServerData } from "@/utils/parsedData"
import { Tag } from "@/components/tag"

interface Props {
    compact: boolean
    serverData: ServerData
}

export const ServerStatistics = ({ compact, serverData }: Props) => {
    const players_avarage = calculateAverage(serverData.data)
    const players_peak = getPeak(serverData.data)
    const online = serverData.data[serverData.data.length - 1].y

    return (
        <div
            className={`flex flex-col phone:flex-row gap-4 justify-between rounded-md divide-y-2 phone:divide-y-0 phone:divide-x-2 px-0 divide-darkOverlay border-darkOverlay ${compact ? "ml-auto" : "pt-4 pb-2 border-t-2"}`}
        >
            <Tag text="Current" color={greenGraph[0]}>
                {online.toLocaleString()}
            </Tag>
            <Tag text="Mean" color="#9b7af3">
                {players_avarage.toLocaleString()}
            </Tag>
            <Tag text="Max" color="#ffcd4c">
                {players_peak.toLocaleString()}
            </Tag>
        </div>
    )
}
