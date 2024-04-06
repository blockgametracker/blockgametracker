import Link from "next/link"
import { Section } from "./content"

const footer = () => (
    <Section className="flex items-center pt-4 pb-4 mt-auto border-t-2 bg-darkFill border-darkOverlay">
        <div className="flex flex-col tablet:flex-row gap-4 items-center tablet:items-start">
            <p className="tablet:mr-auto">
                Copyright © 2024 Blockgametracker. All rights reserved.
            </p>

            <div className="flex flex-col tablet:flex-row gap-2">
                <p>Blockgametracker by:</p>
                <div className="flex flex-row gap-2 justify-center tablet:justify-start">
                    <Link
                        href="https://github.com/clrxbl"
                        className="text-mainText p-2 tablet:p-0"
                    >
                        Michael,
                    </Link>
                    <Link
                        href="https://github.com/MagicA550"
                        className="text-mainText p-2  tablet:p-0"
                    >
                        Anthony,
                    </Link>
                    <Link
                        href="https://grafisch.media/"
                        className="text-mainText p-2  tablet:p-0"
                    >
                        Jelle
                    </Link>
                </div>
            </div>
        </div>
    </Section>
)

export default footer
