import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Manrope } from "next/font/google"

const manrope = Manrope({ subsets: ["latin"] })

const Satoshi = localFont({
    src: "../public/fonts/Satoshi-Regular.otf",
    display: "swap",
})

export const metadata: Metadata = {
    //TODO
    title: "Home | Blockgametracker",
    description: "Historical Minecraft server playercounts of over 70 minecraft servers, saved for as long as possible.",
    keywords: ["blockgame", "minecraft", "minecraft server"],
    authors: [],
}

export const revalidate = 30

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={`text-secondText ${manrope.className}`}
        >
            <body className="w-screen h-screen overflow-x-hidden">
                {children}
            </body>
        </html>
    )
}
