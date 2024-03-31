import Link from "next/link"
import Icon from "../icon"

import { NavButton } from "../navigation/navButton"
import { Section } from "../content"

const navigation = ({ page }: { page: string }) => {
    return (
        <Section className="fixed top-0 border-b-2 border-darkOverlay bg-darkFill bg-opacity-60 backdrop-blur-md z-50">
            <div className="w-full h-16 inline-flex items-center">
                <Link
                    href="/"
                    className="inline-flex items-center max-w-content gap-2 mr-4"
                >
                    <Icon iconName="icon" className="w-6 h-6 fill-mainColor" />
                </Link>

                <NavButton page="home" currentPage={page} href="/">
                    Home
                </NavButton>
                <NavButton
                    page="server-comparison"
                    currentPage={page}
                    href="/compare"
                >
                    Server comparison
                </NavButton>
                <NavButton
                    page="as-statistics"
                    currentPage={page}
                    href="https://blockgametracker.gg/d/nlKArnQ4k/global-playercount-by-as"
                >
                    AS Statistics
                </NavButton>
                <div className="inline-flex gap-8 ml-auto">
                    <button>1 Day</button>
                    <button>1 Week</button>
                </div>
            </div>
        </Section>
    )
}

export default navigation
