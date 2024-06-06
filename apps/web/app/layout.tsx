import type { Metadata } from "next"
import "./globals.css"
import { Manrope } from "next/font/google"

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
    //TODO
    title: "Home | blockgametracker",
    description:
        "Historical Minecraft server playercounts of over 80 minecraft servers, saved for as long as possible.",
    keywords: [
        "blockgame",
        "minecraft",
        "minecraft server",
        "minecraft playercout",
        "player tracker",
        "minecraft list",
    ],
    authors: [],
}

export const revalidate = 30

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={`text-secondText ${manrope.className}`}>
            <body className="w-screen h-screen overflow-x-hidden">
                {children}
            </body>
        </html>
    )
}
