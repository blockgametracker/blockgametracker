import { PropsWithChildren } from "react"
import type { ServerData } from "@/utils/parsedData"
import { ServerIcon } from "./serverIcon"
import { MinecraftEdition } from "@repo/gateway"

interface Props extends PropsWithChildren {
    className?: string
    edition: MinecraftEdition
    serverData: ServerData
}

export const ServerInfo = ({ serverData, className, children }: Props) => {
    return (
        <div
            id={`server-${serverData.server_slug}-information`}
            className={`w-full inline-flex gap-4 items-center ${className}`}
        >
            <div className="inline-flex gap-4 items-center">
                <ServerIcon className="size-10" icon={serverData.icon} />

                <div className="flex flex-col">
                    <h2 className="text-lg whitespace-nowrap text-whiteMT dark:text-mainText font-semibold dark:font-medium leading-4">
                        {serverData.server_name}
                    </h2>
                    <p className="whitespace-nowrap text-whiteST dark:text-secondText">
                        {serverData.hostname}
                    </p>
                </div>
            </div>
            {children}
        </div>
    )
}
