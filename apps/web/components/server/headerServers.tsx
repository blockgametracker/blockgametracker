import { getServers } from "@repo/gateway"
import React from "react"
import ServerCardSmall from "./serverCardSmall"
import { DataRangeParams } from "@/utils/dataRange"

interface Props {
    rangeParams: DataRangeParams
}

export const Servers = async (props: Props) => {
    const serverList = await getServers("java")

    return (
        <div className="w-fit grid grid-cols-1 phone:grid-cols-2 small:grid-cols-4 gap-4">
            {serverList.data.slice(0, 4).map((server, index) => (
                <React.Fragment key={index}>
                    <ServerCardSmall
                        server={server}
                        rangeParams={props.rangeParams}
                    />
                </React.Fragment>
            ))}
        </div>
    )
}

export default Servers
