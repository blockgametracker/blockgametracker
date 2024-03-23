import { getServers } from "@repo/gateway"
import React from "react"
import { Server } from "./serverCard"
import { ExpandableServerList } from "./expandableServerList"

export const Servers = async () => {
    const serverList = await getServers("java")

    return <ExpandableServerList servers={serverList.data} />
}
