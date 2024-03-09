import Icon from "./icon"

export const ButtonBG = ({ children }: any) => (
    <button className="fade p-4 pt-2 pb-2 w-fit border-2 bg-darkFill border-darkOverlay hover:text-mainText hover:border-secondText whitespace-nowrap">
        {children}
    </button>
)

export const Button = ({ children }: any) => (
    <button className="fade p-4 pt-2 pb-2 w-fit whitespace-nowrap hover:text-mainText">
        {children}
    </button>
)

export const ButtonIcon = ({ iconName }: any) => (
    <button className="fade group border-2 p-3 rounded-md bg-darkFill border-darkOverlay hover:border-secondText">
        <Icon
            iconName={iconName}
            className="fade w-4 h-4 fill-secondText group-hover:fill-mainText"
        />
    </button>
)
