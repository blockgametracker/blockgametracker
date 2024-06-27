import {
    MinecraftEdition,
    QueryTimeFrame,
    getEditionOrDefault,
    getRangeOrDefault,
} from "@repo/gateway"

/** The URL parameters provided to the page. */
export interface URLParams {
    edition: MinecraftEdition
    start: QueryTimeFrame
    step: QueryTimeFrame
    view: string
    search?: string
}

/** Returns the URL Params for the given internally stored data. */
export function getURLParams(searchParams?: {
    [key: string]: string | undefined
}): URLParams {
    const { edition, start, step, view, search } =
        searchParams || {}

    const validatedEdition = getEditionOrDefault(edition)

    return {
        edition: validatedEdition,
        start: getRangeOrDefault<QueryTimeFrame>(start, DEFAULT_VALUES.start),
        step: getRangeOrDefault<QueryTimeFrame>(step, DEFAULT_VALUES.step),
        view: view ?? DEFAULT_VALUES.view,
        search: search
    }
}

/** Default values for the URL parameters */
const DEFAULT_VALUES: URLParams = {
    edition: MinecraftEdition.JAVA,
    start: "-1d",
    step: "4m",
    view: "default"
}

/** Builds the URL given the parameters provided. */
export function buildURL(
    urlParams: URLParams,
    updates?: Partial<URLParams>,
): string {
    // Create a copy of the URL parameters with updates applied
    const updatedParams = { ...urlParams, ...updates }

    // Filter out parameters that have default values or are undefined
    const filteredParams = Object.fromEntries(
        Object.entries(updatedParams).filter(
            ([paramKey, paramValue]) => 
                paramValue !== DEFAULT_VALUES[paramKey as keyof URLParams] && 
                paramValue !== undefined
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
