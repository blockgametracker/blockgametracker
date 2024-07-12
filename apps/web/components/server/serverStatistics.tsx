import { calculateAverage, getPeak } from "@/utils/dataUtils"
import { COLOR_CURRENT, COLOR_MAX, COLOR_MEAN } from "@/utils/graphUtils"
import { ServerData } from "@/utils/parsedData"
import { Tag } from "@/components/tag"

interface Props {
    serverData: ServerData
}

export const ServerStatistics = ({ serverData }: Props) => {
    const players_avarage = calculateAverage(serverData.data)
    const players_peak = getPeak(serverData.data)
    const online = serverData.data[serverData.data.length - 1].y

    return (
        <div
            id={`server-${serverData.server_slug}-statistics`}
            className={`w-full flex flex-row gap-4 justify-between divide-y-0 divide-x-2 px-0 divide-whiteBorder dark:divide-darkBorder`}
        >
            <Tag text="Current" color={COLOR_CURRENT} className="w-full p-4">
                {online.toLocaleString()}
            </Tag>
            <Tag text="Mean" color={COLOR_MEAN} className="w-full p-4">
                {players_avarage.toLocaleString()}
            </Tag>
            <Tag text="Max" color={COLOR_MAX} className="w-full p-4">
                {players_peak.toLocaleString()}
            </Tag>
        </div>
    )
}
