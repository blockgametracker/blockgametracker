interface Props {
    title: string
    value: string | number
}

export const ListItem = ({ title, value }: Props) => (
    <div className="flex flex-row gap-4 p-4">
        <p>{title}:</p>
        <p className="text-mainText">{value}</p>
    </div>
)
