import { getServers } from "@repo/gateway"
import React from "react"
import ServerCardSmall from "./serverCardSmall"

export const Servers = async () => {
    const serverList = await getServers("java")

    return (
        <div className="w-full grid grid-cols-1 tablet:grid-cols-2 small:grid-cols-2 gap-4">
            {serverList.data.slice(0, 4).map((server, index) => (
                <React.Fragment key={index}>
                    <ServerCardSmall server={server} />
                </React.Fragment>
            ))}
        </div>
    )
}

export default Servers
