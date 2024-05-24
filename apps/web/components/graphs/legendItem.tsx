import { GRAPH_COLORS } from "@/utils/graphUtils"
import { ServerData } from "@/utils/parsedData"

interface Props {
    server: ServerData
    index: number
}

export const LegendItem = ({ server, index }: Props) => {
    const color = GRAPH_COLORS[index % GRAPH_COLORS.length]

    return (
        <div className="inline-flex gap-2 items-center pt-2 pb-2">
            <p style={{ color: `${color}` }}>■</p>
            <p className="whitespace-nowrap">{server.server_slug}</p>
        </div>
    )
}
