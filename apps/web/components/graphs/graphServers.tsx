"use client"

import React from "react"
import { URLParams, isServerToggled } from "@/utils/urlBuilder"
import { Icon } from "../icon"
import { ServerData } from "@/utils/parsedData"
import { ServerCardSmall } from "../server/serverCardSmall"

interface Props {
    urlParams: URLParams
    servers: ServerData[]
}

export const GraphServers = ({ urlParams, servers }: Props) => (
    <div className="col-span-6 tablet:col-span-1 w-full grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-4 normal:grid-cols-6 gap-4 overflow-y-scroll overflow-x-hidden">
        {servers.map((server) => {
            const active = isServerToggled(urlParams, server)

            return (
                <ServerCardSmall
                    server={server}
                    key={`server-card-${server.server_slug}`}
                >
                    <div
                        className={`w-4 h-4 ml-auto rounded-md border-2 flex items-center justify-center ${active ? "bg-mainText border-mainText" : "border-darkOverlay"}`}
                    >
                        <Icon iconName="check" className="w-4 h-4 fill-dark" />
                    </div>
                </ServerCardSmall>
            )
        })}
    </div>
)
