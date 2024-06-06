import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Manrope } from "next/font/google"

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
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
    themeColor: {
        color: "#00d653",
    },
    alternates: {
        canonical: "https://blockgametracker.gg/",
    },
    twitter: {
        card: "summary",
        site: "https://blockgametracker.gg/",
        title: "blockgametracker",
        images: "https://blockgametracker.gg/android-chrome-192x192.png",
        creator: "Anthony, Jelle, Michael",
    },
    openGraph: {
        title: "blockgametracker",
        siteName: "blockgametracker",
        description:
            "Historical Minecraft server playercounts of over 80 minecraft servers, saved for as long as possible.",
        type: "website",
        url: "https://blockgametracker.gg/",
        images: "https://blockgametracker.gg/android-chrome-192x192.png",
    },
    authors: [
        {
            name: "Anthony",
            url: "https://github.com/MagicA550",
        },
        {
            name: "Jelle",
            url: "https://grafisch.media",
        },
        {
            name: "Michael",
            url: "https://github.com/clrxbl",
        },
    ],
}

export const viewport: Viewport = {
    themeColor: "#00d653",
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
