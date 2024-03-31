import { ServerInfo } from "@repo/gateway"

/** The page parameters provided by NextJS. */
interface NextPageParams<Params = {}> {
    params: Params
    searchParams?: { [key: string]: string | undefined }
}

/** The page parameters provided by NextJS. */
export type PageParams<Params = {}> = Readonly<NextPageParams<Params>>

export const serverToImage = (server: ServerInfo) =>
    `https://assets.blockgametracker.gg/icons/java/${server.server_name
        .toLowerCase()
        .replaceAll(" ", "_")}.png`
