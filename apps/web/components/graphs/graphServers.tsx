"use client"

import { Icon } from "../icon"
import { ServerData } from "@/utils/parsedData"
import Link from "next/link"
import { ServerIcon } from "../server/serverIcon"
import { Container } from "../layout/container"
import {
    URLParams,
    buildURL,
    isServerToggled,
    toggleServer,
} from "@/utils/urlBuilder"

interface Props {
    urlParams: URLParams
    servers: ServerData[]
}

export const GraphServers = ({ urlParams, servers }: Props) => (
    <Container className="w-full tablet:w-1/6 flex flex-col tablet:overflow-auto divide-y-2 divide-darkOverlay shrink-0">
        <div className="flex flex-row items-center p-4">
            <h2>Servers</h2>
        </div>
        {servers.map((server, index) => {
            const active = isServerToggled(urlParams, server)
            const newServers = toggleServer(urlParams, server)

            return (
                <Link
                    rel="nofollow"
                    href={buildURL(urlParams, { servers: newServers })}
                    key={index}
                >
                    <div
                        className={`group fade flex flex-row gap-4 items-center py-2 px-4 ${active && "bg-darkSelected"}`}
                    >
                        <ServerIcon server={server} className="w-10 h-10 " />
                        <div>
                            <p className="text-mainText font-semibold">
                                {server.server_name}
                            </p>
                            <p>
                                {server.data[
                                    server.data.length - 1
                                ].y.toLocaleString()}{" "}
                                online
                            </p>
                        </div>
                        <div
                            className={`w-4 h-4 ml-auto rounded-md border-2 flex items-center justify-center ${active ? "bg-mainText border-mainText" : "border-darkOverlay"}`}
                        >
                            <Icon
                                iconName="check"
                                className="w-4 h-4 fill-dark"
                            />
                        </div>
                    </div>
                </Link>
            )
        })}
    </Container>
)
