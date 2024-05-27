"use client"

import React from "react"
import {
    URLParams,
    buildURL,
    isServerToggled,
    toggleServer,
} from "@/utils/urlBuilder"
import { Icon } from "../icon"
import { ServerData } from "@/utils/parsedData"
import { ServerCardSmall } from "../server/serverCardSmall"
import Link from "next/link"

interface Props {
    urlParams: URLParams
    servers: ServerData[]
}

export const GraphServers = ({ urlParams, servers }: Props) => (
    <div className="col-span-6 tablet:col-span-1 w-full grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-4 normal:grid-cols-6 gap-4 overflow-y-scroll overflow-x-hidden">
        {servers.map((server) => {
            const active = isServerToggled(urlParams, server)
            const newServers = toggleServer(urlParams, server)

            return (
                <Link
                    href={buildURL(
                        urlParams.rangeParams,
                        urlParams.edition,
                        newServers,
                        null,
                    )}
                    key={`server-card-${server.server_slug}`}
                >
                    <ServerCardSmall server={server}>
                        <div
                            className={`w-4 h-4 ml-auto rounded-md border-2 flex items-center justify-center ${active ? "bg-mainText border-mainText" : "border-darkOverlay"}`}
                        >
                            <Icon
                                iconName="check"
                                className="w-4 h-4 fill-dark"
                            />
                        </div>
                    </ServerCardSmall>
                </Link>
            )
        })}
    </div>
)
