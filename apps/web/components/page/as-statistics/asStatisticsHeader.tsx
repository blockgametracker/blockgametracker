import localFont from "next/font/local"
import { Icon } from "@/components/icon"

const Expose = localFont({
    src: "../../../public/fonts/Expose-Bold.otf",
    display: "swap",
})

export const ASStatisticsHeader = async () => {
    return (
        <header className="header flex flex-col gap-2 justify-center max-tablet:text-center w-full py-16 rounded-md shrink-0 border-2 border-darkOverlay p-8">
            <h1 className={`text-6xl text-mainColor ${Expose.className}`}>
                AS-Statistics
            </h1>
            <span className="text-lg text-mainText">
                blockgametracker servers per AS
            </span>
        </header>
    )
}
