import { Icon } from "@/components/icon"
import { Container } from "../container/container"
import { useState } from "react"

//TODO probably put update information in a json later
export const NavUpdate = () => {
    const [active, setActive] = useState(true)
    const [popupActive, setPopupActive] = useState(false)

    return (
        <>
            <li
                id="section-update"
                className={`mt-auto flex flex-col gap-4 p-4 rounded-md bg-whiteBG dark:bg-darkBG dark:border-2 dark:border-darkBorder ${!active && "hidden"}`}
            >
                <div className="relative flex flex-row gap-4 items-center">
                    <span className="rounded-full size-4 bg-mainColor" />
                    <span className="absolute left-0 rounded-full size-4 bg-mainColor animate-ping" />
                    <p className="text-whiteMT dark:text-mainText font-semibold">
                        Update 1.1.0
                    </p>
                    <button
                        className="ml-auto "
                        onClick={() => setActive(!active)}
                    >
                        <Icon
                            iconName="close"
                            className="size-4 fill-secondText"
                        />
                    </button>
                </div>
                <ol className="text-whiteST dark:text-secondText">
                    <li>
                        <p>- Overhauled UI</p>
                    </li>
                    <li>
                        <p>- Improved server comparing</p>
                    </li>
                    <li>
                        <p>- Reworked as-statistics</p>
                    </li>
                </ol>
                <button
                    aria-label="Read more"
                    onClick={() => setPopupActive(!popupActive)}
                    className="fade bg-darkSelected hover:bg-darkBorder p-2 text-center rounded-md text-mainText"
                >
                    Read more
                </button>
            </li>
            <li
                onClick={() => setPopupActive(!popupActive)}
                className={`absolute top-0 left-0 w-screen h-screen items-center justify-center overflow-hidden bg-whiteSelected dark:bg-darkBG backdrop-blur-sm z-50 bg-opacity-80 dark:bg-opacity-80 ${popupActive ? "flex flex-col" : "hidden"}`}
            >
                <Container
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-[32rem] overflow-hidden"
                >
                    <div className="w-full h-52 bg-mainColor flex items-center justify-center">
                        <Icon iconName="icon" className="size-12 fill-darkBG" />
                    </div>

                    <div className="flex flex-col gap-4 p-8 text-whiteST dark:text-secondText">
                        <div>
                            <h2>Blockgametracker Update 1.1.0</h2>
                            <p>
                                Update 1.1.0 brings a revamped UI and enhanced
                                server comparison features.
                            </p>
                        </div>
                        <div>
                            <h3>Changes</h3>
                            <ol>
                                <li>
                                    <p>- Overhauled UI design</p>
                                </li>
                                <li>
                                    <p>- Improved the Compare Servers page</p>
                                </li>
                                <li>
                                    <p>- Reworked the AS-Statistics page</p>
                                </li>
                                <li>
                                    <p>- Implemented this popup</p>
                                </li>
                                <li>
                                    <p>
                                        - Introduced pie charts on select pages
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </Container>
            </li>
        </>
    )
}
