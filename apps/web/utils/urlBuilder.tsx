import {
    MinecraftEdition,
    QueryStart,
    QueryStep,
    getEditionOrDefault,
} from "@repo/gateway"
import { ServerData } from "./parsedData"

/** The URL parameters provided to the page. */
export interface URLParams {
    edition: MinecraftEdition
    start: QueryStart
    step: QueryStep
    view: string
    servers: string[]
    showServers: number
}

/** Returns the URL Params for the given internally stored data. */
export function getURLParams(searchParams?: {
    [key: string]: string | undefined
}): URLParams {
    const { edition, start, step, view, servers, showServers } =
        searchParams || {}

    const validatedEdition = getEditionOrDefault(edition)
    const urlServers = servers?.split(",").map((server) => server.trim()) ?? []

    const parsedShowServers = Number.parseInt(showServers ?? "")
    const validShowServers = !isNaN(parsedShowServers) ? parsedShowServers : 12

    return {
        edition: validatedEdition,
        start: (start as QueryStart) ?? "-1d",
        step: (step as QueryStart) ?? "4m",
        view: typeof view === "string" ? view : "default",
        servers: urlServers ?? [],
        showServers: validShowServers,
    }
}

/** Builds the URL given the parameters provided. */
export function buildURL(
    urlParams: URLParams,
    updates?: Partial<URLParams>,
): string {
    // Create a copy of the URL parameters
    const updatedParams = { ...urlParams, ...updates }

    // Filter out empty string values and undefined values
    const filteredParams = Object.fromEntries(
        Object.entries(updatedParams).filter(
            ([_, paramValue]) => paramValue !== "" && paramValue !== undefined,
        ),
    )

    // Construct the query string, converting values to strings
    const queryString = Object.entries(filteredParams)
        .map(
            ([paramKey, paramValue]) =>
                `${paramKey}=${encodeURIComponent(String(paramValue))}`,
        )
        .join("&")

    return `?${queryString}`
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
