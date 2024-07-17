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
    /** The server's color. */
    color: string
}

/** AS data. */
export interface ASData {
    /** The item's name. */
    name: string
    /** The item's number. */
    number: string
    /** The item's data. */
    data: ParsedApiQuery[]
    /** The item's color. */
    color: string
}

/** A server's data, as represented on the page. */
export interface PieChartData {
    /** The server's id. */
    id: string
    /** The server's name. */
    label: string
    /** The server's selected playercount */
    value: number
    /** The server's color. */
    color?: string
}

/** A server's data, as represented on the page. */
export interface GraphData {
    /** The server's id. */
    id: string
    /** The server's data. */
    data: ParsedApiQuery[]
}

/** A server's data, as represented on the page. */
export interface CompareItem {
    /** The item's slug. */
    slug: string
    /** The item's name. */
    name: string
    /** The item's current value. */
    current: number
    /** The item's mean value. */
    mean: number
    /** The item's max value. */
    max: number
    /** The item's color. */
    color: string
    /** The item's icon. */
    icon?: string
}

/** The server's graphically-presented data, exclusively. */
export interface ComputedServerData {
    /** The player information for the server. */
    data: ParsedApiQuery[]
}
