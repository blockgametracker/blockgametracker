import Tag from "./tag"
import { Container, DarkContainer } from "./content"
import Image from "next/image"
import Graph from "./graphs/serverGraph"
import { ButtonBG } from "./button"
import React from "react"
import { ServerInfo, getOnline, getOnlineInRange } from "@repo/gateway"
import Icon from "./icon"

export interface Server {
    name: string
    ip: string
    icon: string
    version: string
    players_current: number
    players_record: number
    players_peak: number
}

export interface ServerData {
    id: string
    data: any
}

export const Server = async ({ server }: { server: ServerInfo }) => {
    const onlineInRange = await getOnlineInRange(
        server.server_name,
        "java",
        "-1d",
        "1h",
    )
    const online = await getOnline(
        server.server_name,
        "java",
    )
    const serverArray: ServerData[] = [ { 
        id: server.server_name, 
        data: onlineInRange.data
    } ]
    
    return (
        <Container id="servers" className="fade flex flex-col gap-2 w-full overflow-hidden">
            <div className="inline-flex gap-4 items-center">
                <Image
                    src={`/images/placeholder.jpg`}
                    alt={`mcc island`}
                    className="fade gradient object-cover aspect-square image w-12 h-12 rounded-md group-hover:opacity-40 group-hover:blur-sm"
                    sizes="(max-width: 384px) 64px, 64px"
                    title="mcc"
                    width={64}
                    height={64}
                    blurDataURL={`/images/placeholder.jpg`}
                    placeholder="blur"
                />
                <div className="flex flex-col">
                    <h2>{server.server_name}</h2>
                    <p>{server.server_host}</p>
                </div>
                <div className="ml-auto inline-flex gap-2">
                    <ButtonBG arialabel="Compare server" href="">
                        <Icon iconName="fullscreen" className="fill-secondText w-4 h-4" />
                    </ButtonBG>
                    <ButtonBG arialabel="Open server" href={`/server/${server.server_host}`} >
                        <Icon iconName="fullscreen" className="fill-secondText w-4 h-4" />
                    </ButtonBG>
                </div>
            </div>

            <div className="w-full h-48">
                <Graph data={serverArray} />
            </div>

            <DarkContainer className="inline-flex gap-4 justify-between rounded-md divide-x-2 p-2 divide-darkOverlay ">
                <Tag text="Current" color="#68fa46">
                    { online.data.y.toLocaleString() }
                </Tag>
                <Tag text="Record" color="#9b7af3">
                    -
                </Tag>
                <Tag text="Peak (24h)" color="#ffcd4c">
                    -
                </Tag>
            </DarkContainer>
        </Container>
    )
}
