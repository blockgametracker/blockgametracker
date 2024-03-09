import Link from "next/link"
import Icon from "./icon"

import { Button } from "./button";

const navigation = () => (
    <div className="flex justify-center w-full h-16 fixed top-0 bg-darkFill border-b-2 border-darkOverlay pt-2 pb-2 z-50">
        <div className="inline-flex gap-4 w-full max-w-content">
            <Link href="/" className="inline-flex items-center w-full max-w-content gap-2">
                <Icon iconName="logo" className="w-6 h-6 fill-mainColor" />
                <h1>Blockgametracker</h1>
            </Link>

            <Button>Server comparison</Button>
            <Button>AS Statistics</Button>
        </div>
    </div>
)

export default navigation