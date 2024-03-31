"use client"

import { ServerInfo } from "@repo/gateway"
import { useState } from "react"
import ServerCard from "./serverCard"

interface Props {
    servers: ServerInfo[]
}

export const ExpandableServerList = (props: Props) => {
    const [count, setCount] = useState(12)

    return (
        <>
            <div className="w-full grid grid-cols-1 tablet:grid-cols-2 small:grid-cols-3 normal:grid-cols-4 gap-4">
                {props.servers.slice(0, count).map((server) => (
                    <ServerCard server={server} />
                ))}
            </div>
            <button
                onClick={() => setCount((currentCount) => currentCount + 4)}
            >
                HELLO
            </button>
        </>
    )
}
