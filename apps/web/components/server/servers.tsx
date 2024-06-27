import { ServerCard } from "./serverCard"
import { getTotalEnsembled } from "@/utils/dataFetcher"
import { URLParams } from "@/utils/urlBuilder"
import { ServerCardSmall } from "./serverCardSmall"

interface Props {
    search?: string
    urlParams: URLParams
}

export const Servers = async ({ urlParams, search }: Props) => {
    const serverList = await getTotalEnsembled(
        urlParams.edition,
        urlParams.start,
        urlParams.step,
    )
    const compact = urlParams.view === "compact"

    // Filter the serverList based on the search term
    const filteredServerList = search
        ? serverList.filter(serverData =>
            serverData.server_name.toLowerCase().includes(search.toLowerCase())
        )
        : serverList

    return (
        <ul
            className={`w-full grid gap-4 grid-cols-1 ${compact ? "normal:grid-cols-2" : "tablet:grid-cols-2 small:grid-cols-3 normal:grid-cols-4"}`}
        >
            {filteredServerList.map((serverData, index) => (
                <li id={`server-${serverData.server_slug}`} key={index}>
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
                </li>
            ))}
        </ul>
    )
}
