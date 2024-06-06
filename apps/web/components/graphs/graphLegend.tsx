"use client"

import { useState } from "react"
import { DarkContainer } from "../layout/darkContainer"
import { URLParams, buildURL, toggleServer } from "@/utils/urlBuilder"
import { ServerData } from "@/utils/parsedData"
import { GraphServers } from "./graphServers"
import { ServerButton } from "../button/serverButton"
import { ServerCardSmall } from "../server/serverCardSmall"

interface Props {
    urlParams: URLParams
    servers: ServerData[]
    selectedServers: ServerData[]
}

export const GraphLegend = ({ urlParams, servers, selectedServers }: Props) => {
    const [active, setActive] = useState(false)

    return (
        <>
            {/* Serverlist popup */}
            <div
                onClick={() => setActive(false)}
                className={`absolute top-0 left-0 w-full h-full z-50 bg-dark bg-opacity-50 backdrop-blur-sm items-center justify-center ${active ? "flex" : "hidden"}`}
            >
                <DarkContainer
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-col gap-4 w-2/3 h-2/3 noscroll"
                >
                    <h2>Compare servers</h2>
                    <GraphServers urlParams={urlParams} servers={servers} />
                </DarkContainer>
            </div>

            {/* List of selected servers */}
            <div className="w-full grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-4 gap-4">
                {selectedServers.map((server) => {
                    const newServers = toggleServer(urlParams, server)

                    return (
                        <ServerCardSmall
                            server={server}
                            key={`legend-card-${server.server_slug}`}
                        >
                            <ServerButton
                                ariaLabel="Remove server"
                                href={buildURL(
                                    urlParams.rangeParams,
                                    urlParams.edition,
                                    newServers,
                                    null,
                                )}
                                iconName="close"
                                className="ml-auto"
                            />
                        </ServerCardSmall>
                    )
                })}
                <button
                    className="h-full py-4 border-2 rounded-md bg-darkFill border-darkOverlay"
                    onClick={() => setActive(true)}
                >
                    Add servers
                </button>
            </div>
        </>
    )
}
