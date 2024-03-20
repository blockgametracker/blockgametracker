import { getServers } from "@repo/gateway"
import React from "react"
import { Server } from "./serverCard"

export const Servers = async () => {
    const serverList = await getServers("java")

    return (
        <div className="w-full grid grid-cols-1 tablet:grid-cols-2 small:grid-cols-3 normal:grid-cols-4 gap-4">
            {serverList.data.map((server, index) => (
                <React.Fragment key={index}>
                    <Server server={server} />
                </React.Fragment>
            ))}
        </div>
    )
}
