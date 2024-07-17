import { Tag } from "@/components/tag"

interface Props {
    servers: string[]
    className?: string
    colors: string[]
}

export const GraphLegend = ({ servers, className, colors }: Props) => (
    <ul className={`${className}`}>
        {servers.map((server, index) => (
            <li key={index}>
                <Tag color={colors[index]} text={server}></Tag>
            </li>
        ))}
    </ul>
)
