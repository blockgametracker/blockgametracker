"use client"

import React, { useState } from "react"
import { DarkContainer } from "../layout/content"
import { URLParams, buildURL, toggleServer } from "@/utils/urlBuilder"
import { ServerData } from "@/utils/parsedData"
import { GraphServers } from "./graphServers"
import { ServerInfo } from "../server/serverInfo"
import { ServerButton } from "../server/serverButton"

export const GraphLegend = ({ urlParams, servers, selectedServers }: { urlParams: URLParams, servers: ServerData[], selectedServers: ServerData[] }) => {
    const [active, setActive] = useState(false)

    return (
        <>
            {/* Serverlist popup */}
            <div onClick={() => setActive(false)} className={`absolute top-0 left-0 w-full h-full z-50 bg-dark bg-opacity-10 backdrop-blur-sm items-center justify-center ${active ? "flex" : "hidden"}`}>
                <DarkContainer onClick={(e) => e.stopPropagation()} className="w-1/2 h-1/2 overflow-scroll">
                    <GraphServers urlParams={urlParams} servers={servers} />
                </DarkContainer>
            </div>

            {/* List of selected servers */}
            <div className="col-span-6 tablet:col-span-1 h-full w-full flex flex-col gap-4 overflow-scroll">
                {selectedServers.map((server, index) => {
                    const newServers = toggleServer(urlParams, server)

                    return (
                        <DarkContainer key={index}>
                            <ServerInfo edition={urlParams.edition} serverData={server}>
                                <ServerButton
                                    ariaLabel="Remove server"
                                    href={buildURL(urlParams.rangeParams, urlParams.compact, urlParams.edition ,newServers)}
                                    iconName="close"
                                    className="ml-auto"
                                />
                            </ServerInfo>
                        </DarkContainer>
                    )
                })}
                <button className="py-4 h-fit border-2 rounded-md bg-darkFill border-darkOverlay" onClick={() => setActive(true)}>Add server</button>
            </div>
        </>
    )
}