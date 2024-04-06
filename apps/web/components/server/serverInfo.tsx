import { serverToImage } from "@/utils/next"
import { PropsWithChildren } from "react"
import Image from "next/image"
import { ServerData } from "@/utils/dataUtils"

interface Props extends PropsWithChildren {
    platform: string
    serverData: ServerData
    percentage?: number
}

export const ServerInfo = (props: Props) => {
    return (
        <div className="w-full inline-flex gap-4 items-center">
            <div className="inline-flex gap-4 items-center">
                <Image
                    src={serverToImage(
                        props.platform,
                        props.serverData.server_name,
                    )}
                    alt={`${props.serverData.server_name} icon`}
                    className="fade gradient object-cover aspect-square image w-12 h-12 rounded-md group-hover:opacity-40 group-hover:blur-sm"
                    sizes="(max-width: 384px) 64px, 64px"
                    title={props.serverData.server_name}
                    width={64}
                    height={64}
                />
                <div className="flex flex-col">
                    <h3 className="text-lg whitespace-nowrap">
                        {props.serverData.server_name}
                    </h3>
                    <p className="whitespace-nowrap">ip</p>
                </div>
            </div>
            {props.children}
        </div>
    )
}
