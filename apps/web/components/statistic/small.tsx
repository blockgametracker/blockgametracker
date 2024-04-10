interface Props {
    title: string
    value: string | number
}

export const StatisticSmall = ({ title, value }: Props) => (
    <div className="flex flex-row gap-4">
        <p>{title}:</p>
        <p className="text-mainText">{value}</p>
    </div>
)
