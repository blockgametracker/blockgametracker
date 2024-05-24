/** A parsed query from the API, with the x (time) formatted as an ordinal string. */
export interface ParsedApiQuery {
    x: string
    y: number
}

/** A server's data, as represented on the page. */
export interface ServerData {
    /** The server's slug. */
    server_slug: string
    /** The server's name. */
    server_name: string
    /** The server's hostname */
    hostname: string
    /** The player information for the server. */
    data: ParsedApiQuery[]
}
