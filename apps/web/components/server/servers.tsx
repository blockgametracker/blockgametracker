import { getServers } from "@repo/gateway"
import React from "react"
import ServerCard from "./serverCard"
import { DataRangeParams } from "@/utils/dataRange"

interface Props {
    rangeParams: DataRangeParams
}

export const Servers = async (props: Props) => {
    const serverList = await getServers("java")

    return (
        <div className="w-full grid grid-cols-1 tablet:grid-cols-2 small:grid-cols-3 normal:grid-cols-4 gap-4">
            {serverList.data.map((server) => (
                <ServerCard
                    server={server}
                    key={server.server_host}
                    rangeParams={props.rangeParams}
                />
            ))}
        </div>
    )
}
