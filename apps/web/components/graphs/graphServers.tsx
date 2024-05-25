"use client"

import React from "react"
import {
    URLParams,
    isServerToggled,
    toggleServer,
} from "@/utils/urlBuilder"
import { Icon } from "../icon"
import { ServerData } from "@/utils/parsedData"
import { ServerCardSmall } from "../server/serverCardSmall"

export const GraphServers = ({
    urlParams,
    servers,
}: {
    urlParams: URLParams
    servers: ServerData[]
}) => (
    <div className="col-span-6 tablet:col-span-1 w-full grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-4 normal:grid-cols-6 gap-4 overflow-scroll">
        {servers.map((server) => {
            const servers = toggleServer(urlParams, server)
            const active = isServerToggled(urlParams, server)

            return (
                <ServerCardSmall urlParams={urlParams} server={server} servers={servers}>
                    <div
                        className={`w-4 h-4 ml-auto rounded-md border-2 flex items-center justify-center ${active ? "bg-mainText border-mainText" : "border-darkOverlay"}`}
                    >
                        <Icon
                            iconName="check"
                            className="w-4 h-4 fill-dark"
                        />
                    </div>
                </ServerCardSmall>
            )
        })}
    </div>
)
