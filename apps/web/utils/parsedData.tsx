/** A parsed query from the API, with the x (time) formatted as an ordinal string. */
export interface ParsedApiQuery {
    x: string
    y: number
}

/** A server's data, as represented on the page. */
export interface ServerData extends ComputedServerData {
    /** The server's edition. */
    server_edition: string
    /** The server's slug. */
    server_slug: string
    /** The server's name. */
    server_name: string
    /** The server's hostname */
    hostname: string
    /** The server's icon. */
    icon: string
}

/** A server's data, as represented on the page. */
export interface PieChartData {
    /** The server's slug. */
    id: string
    /** The server's name. */
    label: string
    /** The server's selected playercount */
    value: number
}

/** The server's graphically-presented data, exclusively. */
export interface ComputedServerData {
    /** The player information for the server. */
    data: ParsedApiQuery[]
}
