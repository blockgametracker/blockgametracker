import { ServerCard } from "./serverCard"
import { getTotalEnsembled } from "@/utils/dataFetcher"
import { URLParams } from "@/utils/urlBuilder"
import { ServerObserver } from "./serverObserver"
import { ServerCardSmall } from "./serverCardSmall"

export const Servers = async (urlParams: URLParams) => {
    const serverList = await getTotalEnsembled(
        urlParams.edition,
        urlParams.start,
        urlParams.step,
    )
    const compact = urlParams.view === "compact"

    return (
        <div className="flex h-full flex-col gap-8">
            <div
                className={`w-full grid gap-4 grid-cols-1 ${compact ? "normal:grid-cols-2" : "tablet:grid-cols-2 small:grid-cols-3 normal:grid-cols-4"}`}
            >
                {serverList.map((serverData, index) => (
                    <ServerObserver
                        id={`server-observer-${index}`}
                        max={serverList.length}
                        active={false}
                        key={index}
                        urlParams={urlParams}
                    >
                        {compact ? (
                            <ServerCardSmall
                                urlParams={urlParams}
                                serverData={serverData}
                            />
                        ) : (
                            <ServerCard
                                urlParams={urlParams}
                                serverData={serverData}
                                loaded
                            />
                        )}
                    </ServerObserver>
                ))}
            </div>
        </div>
    )
}
