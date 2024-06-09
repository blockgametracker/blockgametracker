import { ServerCard } from "./serverCard"
import { getTotalEnsembled } from "@/utils/dataFetcher"
import { URLParams } from "@/utils/urlBuilder"
import { MinecraftEdition } from "@repo/gateway"
import { ServerObserver } from "./serverObserver"
import { calculateDataPoints } from "@/utils/dataUtils"
import { Container } from "../layout/container"
import { Icon } from "../icon"

export const Servers = async (urlParams: URLParams) => {
    const serverList = await getTotalEnsembled(
        urlParams.edition as MinecraftEdition,
        urlParams.start,
        urlParams.step,
    )

    return (
        <div className="flex h-full flex-col gap-8">
            <div
                className={`w-full grid gap-4 grid-cols-1 tablet:grid-cols-2 small:grid-cols-3 normal:grid-cols-4`}
            >
                {serverList.map((serverData, index) => (
                    <ServerObserver
                        id={`server-observer-${index}`}
                        max={serverList.length}
                        active={false}
                        key={index}
                        urlParams={urlParams}
                    >
                        <ServerCard
                            urlParams={urlParams}
                            serverData={serverData}
                            loaded
                        />
                    </ServerObserver>
                ))}
            </div>
        </div>
    )
}
