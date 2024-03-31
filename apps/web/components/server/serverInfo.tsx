import { serverToImage } from "@/utils/next"
import { ServerInfo as ServerInfoData } from "@repo/gateway"
import { PropsWithChildren } from "react"
import Image from "next/image"

interface Props extends PropsWithChildren {
    server: ServerInfoData
    percentage: number
}

export const ServerInfo = (props: Props) => {
    return (
        <div className="inline-flex gap-4 items-center whitespace-nowrap">
            <Image
                src={serverToImage(props.server)}
                alt={`${props.server.server_name} icon`}
                className="fade gradient object-cover aspect-square image w-12 h-12 rounded-md group-hover:opacity-40 group-hover:blur-sm"
                sizes="(max-width: 384px) 64px, 64px"
                title="mcc"
                width={64}
                height={64}
            />
            <div className="flex flex-col">
                <div className="inline-flex gap-2 items-center">
                    <h3>{props.server.server_name}</h3>
                    <p
                        className={
                            props.percentage >= 0
                                ? "text-mainColor"
                                : "text-red-500"
                        }
                    >
                        {props.percentage}%
                    </p>
                </div>
                <p>{props.server.server_host}</p>
            </div>
            {props.children}
        </div>
    )
}
