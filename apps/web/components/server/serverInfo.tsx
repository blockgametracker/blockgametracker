import { serverToImage } from "@/utils/next"
import { PropsWithChildren } from "react"
import Image from "next/image"
import { ServerData } from "@/utils/dataUtils"

interface Props extends PropsWithChildren {
    server: ServerData
    percentage?: number
}

export const ServerInfo = (props: Props) => {
    return (
        <div className="w-full inline-flex gap-4 items-center whitespace-nowrap">
            <Image
                src={serverToImage(props.server.server_name)}
                alt={`${props.server.server_name} icon`}
                className="fade gradient object-cover aspect-square image w-12 h-12 rounded-md group-hover:opacity-40 group-hover:blur-sm"
                sizes="(max-width: 384px) 64px, 64px"
                title="mcc"
                width={64}
                height={64}
            />
            <div className="flex flex-col">
                <h3 className="text-lg">{props.server.server_name}</h3>
                <p>ip</p>
            </div>
            {props.children}
        </div>
    )
}
