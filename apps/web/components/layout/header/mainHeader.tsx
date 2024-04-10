import { StatisticLarge } from "@/components/statistic/large"
import { getEnsembledTotal } from "@repo/gateway"

export const MainHeader = async () => {
    const totalJava = await getEnsembledTotal("java")
    const totalBedrock = await getEnsembledTotal("bedrock")

    return (
        <div className="grid grid-cols-2 gap-4">
            <StatisticLarge
                iconName="user"
                title="Minecraft java playercount"
                value={`${totalJava.data.y.toLocaleString()}`}
            />
            <StatisticLarge
                iconName="user"
                title="Minecraft bedrock playercount"
                value={`${totalBedrock.data.y.toLocaleString()}`}
            />
        </div>
    )
}
