import { Icon } from "@/components/icon"
import localFont from "next/font/local"
import { StatisticLarge } from "@/components/statistic/large"
import { getEnsembledTotal, getServers } from "@repo/gateway"

const Expose = localFont({
    src: "../../public/fonts/Expose-Bold.otf",
    display: "swap",
})

export const Header = async () => {
    const totalJava = await getEnsembledTotal("java")
    const totalBedrock = await getEnsembledTotal("bedrock")
    const servers = await getServers()

    return (
        <div className="w-full flex flex-col gap-4 overflow-hidden items-center">
            <div className="flex flex-col gap-4 items-center">
                <div className="inline-flex gap-2 items-center justify-center">
                    <Icon iconName="icon" className="fill-mainColor w-4 h-4" />
                    <p className="text-mainText font-medium">
                        blockgametracker
                    </p>
                </div>

                <h1
                    className={`whitespace-nowrap text-3xl phone:text-5xl tablet:text-6xl text-center text-mainColor ${Expose.className}`}
                >
                    TRACKING {servers.length.toLocaleString()} MINECRAFT SERVERS
                </h1>

                <div className="flex flex-col gap-8 items-center">
                    <p className="max-w-xl tablet:max-w-fit text-xl text-center text-mainText">
                        Historical Minecraft server playercounts, saved for as
                        long as possible.
                    </p>

                    <div className="w-fit inline-flex gap-4">
                        <div className="grid grid-cols-1 phone:grid-cols-2 gap-4">
                            <StatisticLarge
                                iconName="user"
                                title="Minecraft Java playercount"
                                value={`${totalJava.data.y.toLocaleString()}`}
                            />
                            <StatisticLarge
                                iconName="user"
                                title="Minecraft Bedrock playercount"
                                value={`${totalBedrock.data.y.toLocaleString()}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
