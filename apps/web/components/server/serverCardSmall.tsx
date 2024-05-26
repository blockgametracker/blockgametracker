"use client"

import React, { PropsWithChildren } from "react"
import { DarkContainer } from "../layout/darkContainer"
import { ServerData } from "@/utils/parsedData"
import { ServerIcon } from "../server/serverIcon"

interface Props extends PropsWithChildren {
    server: ServerData
}

export const ServerCardSmall = ({ server, children }: Props) => (
    <div key={`graph-servers-${server.server_slug}`} className="w-full">
        <DarkContainer className="w-full h-full inline-flex gap-2 items-center pt-2 pb-2">
            <ServerIcon className="w-8 h-8" server={server} />

            <p className="whitespace-nowrap">{server.server_name}</p>
            {children}
        </DarkContainer>
    </div>
)
