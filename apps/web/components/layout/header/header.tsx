import { Icon } from "@/components/icon"
import Link from "next/link"
import localFont from "next/font/local"
import { StatisticLarge } from "@/components/statistic/large"
import { getEnsembledTotal } from "@repo/gateway"

const Expose = localFont({
    src: "../../../public/fonts/Expose-Bold.otf",
    display: "swap",
})

export const Header = async () => {
    const totalJava = await getEnsembledTotal("java")
    const totalBedrock = await getEnsembledTotal("bedrock")

    return (
        <div className="w-full flex flex-col gap-4 overflow-hidden items-center">
            <div className="flex flex-col gap-4 items-center">
                <div className="inline-flex gap-2 items-center justify-center">
                    <Icon iconName="icon" className="fill-mainColor w-4 h-4" />
                    <p className="text-mainText font-semibold">blockgametracker</p>
                </div>

                <h1
                    className={`whitespace-nowrap text-2xl phone:text-5xl tablet:text-6xl text-center text-mainColor ${Expose.className}`}
                >
                    TRACKING MINECRAFT
                    <br className="flex tablet:hidden" /> SERVER PLAYERCOUNTS
                </h1>

                <div className="flex flex-col gap-8 items-center">
                    <p className="max-w-xl tablet:max-w-fit text-xl text-center text-mainText">
                        Historical Minecraft server playercounts of over 70
                        minecraft servers, saved for as long as possible. Inspired
                        by{" "}
                        <Link
                            href="https://www.minetrack.me/"
                            className="text-mainText"
                        >
                            Minetrack
                        </Link>
                        .
                    </p>

                    <div className="w-fit inline-flex gap-4">
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
                    </div>
                </div>
            </div>
        </div>
    )
}