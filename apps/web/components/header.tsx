import { Bebas_Neue } from "next/font/google"
import { ButtonBG } from "./button"
import { HeaderGraph } from "./graphs/headerGraph"

import Icon from "./icon"
import Link from "next/link"
import { getEnsembledBreakdownInRange } from "@repo/gateway"

const bebasneue = Bebas_Neue({ weight: "400", subsets: ["latin"] })

export const Header = async () => {
    const onlineInRange = await getEnsembledBreakdownInRange(
        "java",
        "-1d",
        "1h",
    )
    const mapped = onlineInRange.data.map(server => {
        return {
            id: server.server_name,
            data: server.data
        }
    })

    return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden">
        <div className="flex flex-col gap-4 items-center">
            <div className="inline-flex gap-2 items-center">
                <Icon iconName="icon" className="fill-mainColor w-4 h-4" />
                <p className="text-mainColor font-semibold text-lg">Blockgametracker</p>
            </div>

            <h1 className={`text-8xl ${bebasneue.className}`}>
                Tracking Minecraft server playercounts
            </h1>

            <div className="flex flex-col gap-8">
                <p className="text-lg">
                    Historical Minecraft server playercounts, saved for as long as possible. Inspired by <Link href="https://www.minetrack.me/" className="text-mainText">Minetrack</Link>. Please contact us if you would like to do anything with this data e.g. datasource API access (Prometheus-compatible)
                </p>

                <div className="w-full inline-flex gap-4">
                    <ButtonBG arialabel="Explore servers" href="#servers" active={true}>Explore servers</ButtonBG>
                    <ButtonBG arialabel="Suggest server" href="https://github.com/clrxbl/blockgametracker/blob/main/kustomize/base/config/servers.yaml">Suggest server</ButtonBG>
                </div>
            </div>
        </div>
        <HeaderGraph data={mapped.slice(0, 6)} />
    </div>
    )
}