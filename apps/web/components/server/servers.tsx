import { ServerCard } from "./serverCard"
import { getTotalEnsembled } from "@/utils/dataFetcher"
import { URLParams as Props } from "@/utils/urlBuilder"
import { MinecraftEdition } from "@repo/gateway"
import { Fragment } from "react"
import { ServerObserver } from "./serverObserver"

export const Servers = async (props: Props) => {
    const serverList = await getTotalEnsembled(
        props.edition as MinecraftEdition,
        props.rangeParams.start,
        props.rangeParams.step,
    )

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col phone:flex-row gap-4 phone:items-center">
                <h2 className="text-3xl mr-auto">Global server overview</h2>
            </div>
            <div
                className={`w-full grid gap-4 grid-cols-1 tablet:grid-cols-2 small:grid-cols-3 normal:grid-cols-4`}
            >
                {serverList.map((serverData, index) => (
                    <ServerObserver
                        id={`server-observer-${index}`}
                        max={serverList.length}
                        active={false}
                        key={`card-container-${serverData.server_slug}`}
                        {...props}
                    >
                        <ServerCard
                            urlParams={props}
                            serverData={serverData}
                            loaded
                        />
                    </ServerObserver>
                ))}
            </div>
        </div>
    )
}
