import { getServers } from "@repo/gateway"
import React from "react"
import { Server } from "./server"

export const Servers = async () => {
    const serverList = await getServers("java")

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
            {serverList.data.map((server, index) => (
                <React.Fragment key={index}>
                    <Server server={server} />
                </React.Fragment>
            ))}
        </div>
    )
}
