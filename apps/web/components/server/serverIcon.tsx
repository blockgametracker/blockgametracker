"use client"

import React from "react"
import { ServerData } from "@/utils/parsedData"
import Image from "next/image"

export const ServerIcon = ({
    className,
    server,
}: {
    className?: string
    server: ServerData
}) => (
    <Image
        src={server.icon}
        alt={`${server.server_name} icon`}
        className={`fade gradient object-cover aspect-square image group-hover:opacity-40 group-hover:blur-sm ${className}`}
        sizes="(max-width: 384px) 64px, 64px"
        title={server.server_name}
        width={64}
        height={64}
    />
)
