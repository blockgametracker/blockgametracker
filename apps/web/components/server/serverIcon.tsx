"use client"

import { ServerData } from "@/utils/parsedData"
import Image from "next/image"

interface Props {
    className?: string
    icon: string
    title?: string
}

export const ServerIcon = ({ className, icon, title }: Props) => (
    <Image
        src={icon}
        alt={`${title} icon`}
        className={`object-cover aspect-square image ${className}`}
        sizes="(max-width: 384px) 64px, 64px"
        title={title}
        width={64}
        height={64}
    />
)
