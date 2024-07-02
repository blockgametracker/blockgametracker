import localFont from "next/font/local"
import { Icon } from "../icon"
import { getServers } from "@repo/gateway"

const Expose = localFont({
    src: "../../public/fonts/Expose-Bold.otf",
    display: "swap",
})

export const HeaderServers = async () => {
    const servers = await getServers()

    return (
        <header className="flex flex-col gap-2 justify-center max-tablet:text-center w-full py-8 rounded-md shrink-0">
            <div className="inline-flex gap-2 items-center max-tablet:justify-center text-whiteMT dark:text-secondText">
                <Icon iconName="icon" className="fill-whiteMT dark:fill-mainColor w-4 h-4" />
                <span>blockgametracker</span>
            </div>
            <h1 className={`text-6xl text-whiteMT dark:text-gray-200 ${Expose.className}`}>
                TRACKING {servers?.length.toLocaleString() || 0} MINECRAFT
                SERVERS
            </h1>
            <span className="text-lg text-whiteMT dark:text-secondText">
                Historical Minecraft server playercounts, saved for as long as
                possible.
            </span>
        </header>
    )
}
