import { serverToImage } from "@/utils/next"
import { PropsWithChildren } from "react"
import Image from "next/image"
import type { ServerData } from "@/utils/parsedData"
import { ServerIcon } from "./serverIcon"
import { MinecraftEdition } from "@repo/gateway"

interface Props extends PropsWithChildren {
    className?: string
    edition: MinecraftEdition
    serverData: ServerData
}

export const ServerInfo = (props: Props) => {
    return (
        <div
            className={`w-full inline-flex gap-4 items-center ${props.className}`}
        >
            <div className="inline-flex gap-4 items-center">
                <ServerIcon className="w-12 h-12" edition={props.edition} server={props.serverData}/>

                <div className="flex flex-col">
                    <h3 className="text-lg whitespace-nowrap text-mainText font-medium leading-4">
                        {props.serverData.server_name}
                    </h3>
                    <p className="whitespace-nowrap text-secondText">
                        {props.serverData.hostname}
                    </p>
                </div>
            </div>
            {props.children}
        </div>
    )
}
