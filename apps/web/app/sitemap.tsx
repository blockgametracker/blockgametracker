import { getServers } from "@repo/gateway"
import { MetadataRoute } from "next"

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const serverList = await getServers()

    const serverSitemap = serverList ? serverList.map(server => ({
        url: `https://blockgametracker.gg/server/${server.platform}/${server.slug.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: "hourly" as const,
        priority: 0.7,
    })): []

    return [
        {
            url: "https://blockgametracker.gg",
            lastModified: new Date(),
            changeFrequency: "hourly",
            priority: 1,
        },
        {
            url: "https://blockgametracker.gg/compare",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: "https://blockgametracker.gg/as-statistics",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.1,
        },
        ...serverSitemap,
    ]
}

export default Sitemap