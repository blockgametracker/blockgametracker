import Link from "next/link"
import Icon from "./icon"

import { Button } from "./button"
import { Section } from "./content"

const navigation = () => (
    <Section className="border-b-2 border-darkOverlay bg-darkFill">
        <div className="w-full h-16 inline-flex">
            <Link
                href="/"
                className="inline-flex items-center max-w-content gap-2"
            >
                <Icon iconName="icon" className="w-6 h-6 fill-mainColor" />
            </Link>

            <Button>Home</Button>
            <Button>Server comparison</Button>
            <Button>AS Statistics</Button>
        </div>
    </Section>
)

export default navigation
