import React from "react"
import ServerCard from "./serverCard"
import { DataRangeParams } from "@/utils/dataRange"
import { getTotalEnsembled } from "@/utils/dataUtils"

interface Props {
    rangeParams: DataRangeParams
}

export const Servers = async (props: Props) => {
    const serverList = await getTotalEnsembled("java", props.rangeParams.start, props.rangeParams.step)
    
    return (
        <div className="w-full grid grid-cols-1 tablet:grid-cols-2 small:grid-cols-3 normal:grid-cols-4 gap-4">
            {serverList.map((serverData, index) => (
                <React.Fragment key={index}>
                    <ServerCard
                        serverData={serverData}
                        rangeParams={props.rangeParams}
                    />
                </React.Fragment>
            ))}
        </div>
    )
}
