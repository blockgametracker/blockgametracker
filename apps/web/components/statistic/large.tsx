import { DarkContainer } from "@/components/layout/content"
import { Icon, IconName } from "@/components/icon"

interface Props {
    iconName: IconName
    title: string
    value: string | number
}

export const StatisticLarge = ({ iconName, title, value }: Props) => (
    <DarkContainer className="flex flex-col w-full h-full items-center justify-center">
        <Icon iconName={iconName} className="w-4 h-4 fill-mainColor" />
        <p className="text-lg whitespace-nowrap">{title}</p>
        <h3 className="whitespace-nowrap">{value}</h3>
    </DarkContainer>
)
