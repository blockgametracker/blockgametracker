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
}

/** Returns the URL Params for the given internally stored data. */
export function getURLParams(
    rangeParams?: string,
    edition?: string,
    compact?: string,
    servers?: string[],
) {
    const dateRange = searchParamToRange(rangeParams)

    return {
        rangeParams: getRangeParams(dateRange),
        edition: edition ?? "java",
        compact: compact === "true",
        servers: servers ?? []
    }
}

/** Builds the URL given the parameters provided. */
export function buildURL(
    rangeParams: DataRangeParams,
    compact: boolean | null,
    edition: string | null,
    servers: string[] | null
) {
    const params = new URLSearchParams({
        rangeParams: rangeParams.range,
    })

    if (compact) params.append("compact", `${compact}`)
    if (edition) params.append("edition", edition)
    if (servers) params.append("servers", servers.join(","))

    return `?${params.toString()}`
}


/** Toggles a server from the serverlist in the URL */
export function toggleServer(urlParams: URLParams, server: ServerData) {
    let servers = urlParams.servers.slice()
    const active = isServerToggled(urlParams, server)

    active ?
        servers = servers.filter(item => item !== server.id.replace(" ", "_"))
        :
        servers.push(server.id.replace(" ", "_"))

    return servers
}

/** Check if the URL contains the specified server */
export function isServerToggled(urlParams: URLParams, server: ServerData) {
    const serverIndex = urlParams.servers.indexOf(server.id.replace(" ", "_"))
    return serverIndex !== -1;
}