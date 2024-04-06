/** The page parameters provided by NextJS. */
interface NextPageParams<Params = {}> {
    params: Params
    searchParams?: { [key: string]: string | undefined }
}

/** The page parameters provided by NextJS. */
export type PageParams<Params = {}> = Readonly<NextPageParams<Params>>

export const serverToImage = (platform: string, serverName: string) =>
    `https://assets.blockgametracker.gg/icons/${platform}/${serverName
        .toLowerCase()
        .replaceAll(" ", "_")}.png`
