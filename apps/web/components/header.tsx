import { ButtonBG } from "./button"
import Icon from "./icon"
import Link from "next/link"
import localFont from "next/font/local"

const Expose = localFont({
    src: "../public/fonts/Expose-Bold.otf",
    display: "swap",
})

export const Header = async () => (
    <div className="w-full flex flex-col gap-4 overflow-hidden items-center">
        <div className="flex flex-col gap-4 items-center">
            <div className="inline-flex gap-2 items-center justify-center">
                <Icon iconName="icon" className="fill-mainColor w-4 h-4" />
                <p className="text-mainColor">blockgametracker</p>
            </div>

            <h1
                className={`whitespace-nowrap text-2xl phone:text-5xl tablet:text-6xl text-center ${Expose.className}`}
            >
                TRACKING MINECRAFT
                <br className="flex tablet:hidden" /> SERVER PLAYERCOUNTS
            </h1>

            <div className="flex flex-col gap-8 items-center">
                <p className="max-w-xl tablet:max-w-fit text-xl text-center">
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
                    <ButtonBG
                        arialabel="Compare servers"
                        href="/compare"
                        active={true}
                    >
                        Compare servers
                    </ButtonBG>
                    <ButtonBG
                        arialabel="Suggest server"
                        href="https://github.com/clrxbl/blockgametracker/blob/main/kustomize/base/config/servers.yaml"
                    >
                        Suggest server
                    </ButtonBG>
                </div>
            </div>
        </div>
    </div>
)
