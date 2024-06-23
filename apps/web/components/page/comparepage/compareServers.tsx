"use client"

import { Icon } from "../../icon"
import { ServerData } from "@/utils/parsedData"
import Link from "next/link"
import { ServerIcon } from "../../server/serverIcon"
import { Container } from "../../layout/container/container"
import {
    URLParams,
    buildURL,
    isServerToggled,
    toggleServer,
} from "@/utils/urlBuilder"
import { ContainerTitle } from "../../layout/container/containerTitle"
import { GRAPH_COLORS } from "@/utils/graphUtils"
import { CompareServer } from "./compareServer"

interface Props {
    urlParams: URLParams
    servers: ServerData[]
    urlServers: string[]
}

export const CompareServers = ({ urlParams, servers, urlServers }: Props) => (
    <Container className="w-full tablet:w-1/6 flex flex-col tablet:overflow-auto shrink-0">
        <ContainerTitle>
            <p>Server selection</p>
        </ContainerTitle>
        <ul className="flex flex-col divide-y-2 divide-darkOverlay">
            {servers.map((server, index) => {
                const active = isServerToggled(urlParams, server)
                const newServers = toggleServer(urlParams, server)
                const limit = urlServers.length > GRAPH_COLORS.length

                return (
                    <li key={index}>
                        {active || !limit ? (
                            <Link
                                rel="nofollow"
                                href={buildURL(urlParams, {
                                    servers: newServers,
                                })}
                                key={index}
                                className=""
                            >
                                <CompareServer
                                    server={server}
                                    active={active}
                                    limit={limit}
                                />
                            </Link>
                        ) : (
                            <CompareServer
                                server={server}
                                active={active}
                                limit={limit}
                            />
                        )}
                    </li>
                )
            })}
        </ul>
    </Container>
)
