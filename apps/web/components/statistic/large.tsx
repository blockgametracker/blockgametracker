import { DarkContainer } from "@/components/layout/content"
import { Icon, IconName } from "@/components/icon"

interface Props {
    iconName: IconName
    title: string
    value: string | number
}

export const StatisticLarge = ({ iconName, title, value }: Props) => (
    <div className="flex flex-col w-full h-full items-center justify-center rounded-md p-4 bg-darkFill bg-opacity-70 backdrop-blur-md border-2 border-darkOverlay">
        <Icon iconName={iconName} className="w-4 h-4 fill-mainColor" />
        <h2 className="text-lg whitespace-nowrap text-mainText font-medium">
            {title}
        </h2>
        <p className="whitespace-nowrap text-secondText">{value}</p>
    </div>
)
