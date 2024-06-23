"use client"

import { ServerData } from "@/utils/parsedData"
import { ServerIcon } from "../../server/serverIcon"

interface Props {
    server: ServerData
    active: boolean
    limit: boolean
}

export const CompareServer = ({ server, active, limit }: Props) => (
    <div
        className={`select-none fade group flex flex-row gap-4 items-center p-4 ${!limit && "hover:bg-darkSelected"} ${active && "bg-darkSelected"}`}
    >
        <ServerIcon server={server} className={active ? "size-10" : "size-8"} />
        <div>
            <p className={active ? "text-mainText" : ""}>
                {server.server_name}
            </p>
            <p className={active ? "flex" : "hidden"}>
                {server.data[server.data.length - 1].y.toLocaleString()} online
            </p>
        </div>
    </div>
)
