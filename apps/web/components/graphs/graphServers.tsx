"use client"

import React from "react"
import { DarkContainer } from "../layout/content"
import {
    URLParams,
    buildURL,
    isServerToggled,
    toggleServer,
} from "@/utils/urlBuilder"
import Link from "next/link"
import { Icon } from "../icon"
import { ServerData } from "@/utils/parsedData"

export const GraphServers = ({
    urlParams,
    servers,
}: {
    urlParams: URLParams
    servers: ServerData[]
}) => (
    <div className="col-span-6 tablet:col-span-1 h-full w-full grid grid-cols-6 gap-4">
        {servers.map((server: any, index: any) => {
            const servers = toggleServer(urlParams, server)
            const active = isServerToggled(urlParams, server)

            return (
                <Link
                    key={index}
                    className="w-full"
                    href={buildURL(
                        urlParams.rangeParams,
                        urlParams.compact,
                        urlParams.edition,
                        servers,
                        null,
                    )}
                >
                    <DarkContainer className="w-full h-full inline-flex gap-2 items-center pt-2 pb-2">
                        <div
                            className={`w-4 h-4 rounded-md border-2 flex items-center justify-center ${active ? "bg-mainText border-mainText" : "border-darkOverlay"}`}
                        >
                            <Icon
                                iconName="check"
                                className="w-4 h-4 fill-dark"
                            />
                        </div>
                        <p className="whitespace-nowrap">{server.id}</p>
                    </DarkContainer>
                </Link>
            )
        })}
    </div>
)
