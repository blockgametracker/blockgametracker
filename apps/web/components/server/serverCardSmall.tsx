"use client"

import React from "react"
import { DarkContainer } from "../layout/content"
import { URLParams, buildURL } from "@/utils/urlBuilder"
import Link from "next/link"
import { ServerData } from "@/utils/parsedData"
import { ServerIcon } from "../server/serverIcon"

export const ServerCardSmall = ({
    urlParams,
    server,
    servers,
    children,
}: {
    urlParams: URLParams
    server: ServerData
    servers: string[]
    children?: any
}) => (
    <Link
        key={`graph-servers-${server.server_slug}`}
        className="w-full"
        href={buildURL(urlParams.rangeParams, urlParams.edition, servers, null)}
    >
        <DarkContainer className="w-full h-full inline-flex gap-2 items-center pt-2 pb-2">
            <ServerIcon
                className="w-8 h-8"
                server={server}
                edition={urlParams.edition}
            />

            <p className="whitespace-nowrap">{server.server_name}</p>
            {children}
        </DarkContainer>
    </Link>
)
