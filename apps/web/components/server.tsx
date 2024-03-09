import Tag from "./tag"
import { DarkContainer } from "./content"
import Image from "next/image"
import Icon from "./icon"
import Graph from "./graphs/serverGraph"
import data from "./graphs/data2.json"
import Link from "next/link"
import { ButtonIcon } from "./button"

export interface Server {
    name: string
    ip: string
    icon: string
    version: string
    players_current: number
    players_record: number
    players_peak: number
}

export const Server = ({ server }: any) => (
    <DarkContainer className="fade flex flex-col gap-2 w-full overflow-hidden">
        <div className="inline-flex gap-4 items-center">
            <Image
                src={`/images/${server.icon}`}
                alt={`mcc island`}
                className="fade gradient object-cover aspect-square image w-12 h-12 rounded-md group-hover:opacity-40 group-hover:blur-sm"
                sizes="(max-width: 384px) 64px, 64px"
                title="mcc"
                width={64}
                height={64}
                blurDataURL={`/images/${server.icon}`}
                placeholder="blur"
            />
            <div className="flex flex-col">
                <div className="inline-flex gap-2 items-center">
                    <h2>{server.name}</h2>
                    <p>{server.version}</p>
                </div>
                <p>{server.ip}</p>
            </div>
            <div className="ml-auto inline-flex gap-2">
                <ButtonIcon iconName="compare" />
                <ButtonIcon iconName="fullscreen" />
            </div>
        </div>

        <div className="w-full h-48">
            <Graph data={data} />
        </div>

        <div className="inline-flex gap-4 justify-between rounded-md border-2 divide-x-2 pt-2 pb-2 divide-darkOverlay border-darkOverlay">
            <Tag text="Current" color="#68fa46">
                {server.players_current}
            </Tag>
            <Tag text="Record" color="#9b7af3">
                {server.players_record}
            </Tag>
            <Tag text="Peak (24h)" color="#ffcd4c">
                {server.players_peak}
            </Tag>
        </div>
    </DarkContainer>
)
