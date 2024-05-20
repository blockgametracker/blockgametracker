import { serverToImage } from "@/utils/next"
import { PropsWithChildren } from "react"
import Image from "next/image"
import type { ServerData } from "@/utils/parsedData"

interface Props extends PropsWithChildren {
    className?: string
    edition: string
    serverData: ServerData
}

export const ServerInfo = (props: Props) => {
    return (
        <div
            className={`w-full inline-flex gap-4 items-center ${props.className}`}
        >
            <div className="inline-flex gap-4 items-center">
                <Image
                    src={serverToImage(
                        props.edition,
                        props.serverData.server_name,
                    )}
                    alt={`${props.serverData.server_name} icon`}
                    className="fade gradient object-cover aspect-square image w-12 h-12 group-hover:opacity-40 group-hover:blur-sm"
                    sizes="(max-width: 384px) 64px, 64px"
                    title={props.serverData.server_name}
                    width={64}
                    height={64}
                />
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
