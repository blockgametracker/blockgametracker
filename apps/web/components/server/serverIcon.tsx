"use client"

import { ServerData } from "@/utils/parsedData"
import Image from "next/image"

interface Props {
    className?: string
    server: ServerData
}

export const ServerIcon = ({ className, server }: Props) => (
    <Image
        src={server.icon}
        alt={`${server.server_name} icon`}
        className={`object-cover aspect-square image ${className}`}
        sizes="(max-width: 384px) 64px, 64px"
        title={server.server_name}
        width={64}
        height={64}
    />
)
