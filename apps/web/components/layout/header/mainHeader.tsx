import { StatisticBig } from "@/components/statistic"
import { getEnsembledTotal } from "@repo/gateway"

const MainHeader = async () => {
    const totalJava = await getEnsembledTotal("java")
    const totalBedrock = await getEnsembledTotal("bedrock")

    return (
        <div className="grid grid-cols-2 gap-4">
            <StatisticBig
                iconName="user"
                title="Minecraft java playercount"
                value={`${totalJava.data.y.toLocaleString()}`}
            />
            <StatisticBig
                iconName="user"
                title="Minecraft bedrock playercount"
                value={`${totalBedrock.data.y.toLocaleString()}`}
            />
        </div>
    )
}

export default MainHeader
