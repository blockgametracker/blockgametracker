"use client"

import {
    URLParams,
    buildURL,
    isServerToggled,
    toggleServer,
} from "@/utils/urlBuilder"
import { Icon } from "../icon"
import { ServerData } from "@/utils/parsedData"
import Link from "next/link"
import { ServerIcon } from "../server/serverIcon"
import { Container } from "../layout/container"

interface Props {
    urlParams: URLParams
    servers: ServerData[]
}

export const GraphServers = ({ urlParams, servers }: Props) => (
    <Container className="w-full tablet:w-1/5 flex flex-col tablet:overflow-auto divide-y-2 divide-darkOverlay">
        {servers.map((server, index) => {
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
                    key={index}
                >
                    <div className={`group fade flex flex-row gap-4 items-center py-4 px-4 ${active && "bg-darkSelected"}`}>
                        <ServerIcon server={server} className="w-10 h-10 " />
                        <div>
                            <p className="text-mainText font-semibold">{server.server_name}</p>
                            <p>{server.data[server.data.length -1].y.toLocaleString()} online</p>
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
