import {
    DataRangeParams,
    getRangeParams,
    searchParamToRange,
} from "./dataRange"
import { ServerData } from "./parsedData"

/** The URL parameters provided to the page. */
export interface URLParams {
    rangeParams: DataRangeParams
    edition: string
    compact: boolean
    servers: string[]
    showServers: number
}

/** Returns the URL Params for the given internally stored data. */
export function getURLParams(
    rangeParams?: string,
    edition?: string,
    compact?: string,
    servers?: string,
    showServers?: string,
) {
    const dateRange = searchParamToRange(rangeParams)
    const urlServers: string[] =
        servers?.split(",").map((server) => server.trim()) || []

    return {
        rangeParams: getRangeParams(dateRange),
        edition: edition ?? "java",
        compact: compact === "true",
        servers: urlServers ?? [],
        showServers: showServers ? Number(showServers) : 12,
    }
}

/** Builds the URL given the parameters provided. */
export function buildURL(
    rangeParams: DataRangeParams,
    compact: boolean | null,
    edition: string | null,
    servers: string[] | null,
    showServers: number | null,
) {
    const params = new URLSearchParams({
        range: rangeParams.range,
    })

    if (compact) params.append("compact", `${compact}`)
    if (edition) params.append("edition", edition)
    if (servers) params.append("servers", servers.join(","))
    if (showServers) params.append("showServers", showServers.toString())

    return `?${params.toString()}`
}

/** Toggles a server from the serverlist in the URL */
export function toggleServer(urlParams: URLParams, server: ServerData) {
    let servers = urlParams.servers.slice()
    const active = isServerToggled(urlParams, server)

    active
        ? (servers = servers.filter((item) => item !== server.server_slug))
        : servers.push(server.server_slug)

    return servers
}

/** Check if the URL contains the specified server */
export function isServerToggled(urlParams: URLParams, server: ServerData) {
    const serverIndex = urlParams.servers.indexOf(server.server_slug)
    return serverIndex !== -1
}
