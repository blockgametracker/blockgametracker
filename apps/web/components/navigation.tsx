import Link from "next/link"
import Icon from "./icon"

import { Button } from "./button"
import { Section } from "./content"

const navigation = () => (
    <Section className="border-b-2 border-darkOverlay bg-darkFill">
        <div className="h-16 inline-flex justify-center">
            <Link
                href="/"
                className="inline-flex items-center w-full max-w-content gap-2"
            >
                <Icon iconName="logo" className="w-6 h-6 fill-mainColor" />
                <h1>Blockgametracker</h1>
            </Link>

            <Button>Server comparison</Button>
            <Button>AS Statistics</Button>
        </div>
    </Section>
)

export default navigation
