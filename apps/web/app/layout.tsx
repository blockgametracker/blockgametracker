import type { Metadata } from "next"
import "./globals.css"
import localFont from "next/font/local"

const Satoshi = localFont({
    src: "../public/fonts/Satoshi-Regular.otf",
    display: "swap",
})

export const metadata: Metadata = {
    //TODO
    title: `Home | Blockgametracker`,
    description: "Tracking your blocks",
    keywords: ["blockgame", "minecraft", "minecraft server"],
    authors: [],
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={`bg-dark text-secondText ${Satoshi.className}`}
        >
            <body className="w-screen h-screen overflow-x-hidden">
                {children}
            </body>
        </html>
    )
}
