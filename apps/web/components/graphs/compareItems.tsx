"use client";

import { useEffect } from "react";
import { CompareItem } from "@/utils/parsedData";
import { Container } from "../layout/container/container";
import { Icon } from "@/components/icon";
import { ServerIcon } from "@/components/server/serverIcon";

interface Props {
    sessionStorageID: string,
    compareItems: CompareItem[];
    selectedServers: string[]
    setSelectedServers: any
}

export const CompareItems = ({ sessionStorageID, compareItems, selectedServers, setSelectedServers }: Props) => {
    useEffect(() => {
        const storedString = sessionStorage.getItem(sessionStorageID);
        if (storedString) {
            setSelectedServers(storedString.split(','));
        }
    }, []);

    const setServer = (active: boolean, server: CompareItem) => {
        let updatedSelectedServerIds;

        if (active) {
            updatedSelectedServerIds = selectedServers.filter(id => id !== server.slug);
        } else {
            updatedSelectedServerIds = [...selectedServers, server.slug];
        }

        setSelectedServers(updatedSelectedServerIds);
        sessionStorage.setItem(sessionStorageID, updatedSelectedServerIds.join(','));
    };

    return (
        <Container className="w-full tablet:w-[20vw] flex flex-col tablet:overflow-auto shrink-0 select-none">
            <table className="w-full table-auto divide-y-2 divide-darkOverlay">
                <thead>
                    <tr className="text-mainText divide-darkOverlay">
                        <th />
                        <th className="p-4 text-start font-medium">Servers</th>
                        <th className="text-start font-medium p-4">Current</th>
                        <th className="text-start font-medium p-4">Mean</th>
                        <th className="text-start font-medium p-4">Max</th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-darkOverlay">
                    {compareItems.map((compareItem, index) => {
                        const active = selectedServers.includes(compareItem.slug);

                        return (
                            <tr 
                                onClick={() => setServer(active, compareItem)}
                                key={index} 
                                className={`fade hover:bg-darkSelected hover:text-mainText cursor-pointer ${active && "bg-darkSelected text-mainText"}`}
                            >
                                <td className="px-4">
                                    <div className={`flex items-center justify-center size-4 rounded-md ${!active && "border-2 border-darkOverlay"}`} style={{ backgroundColor: `${active ? compareItem.color:""}` }}>
                                        {active && <Icon iconName="check" className="fill-dark size-3" />}
                                    </div>
                                </td>
                                <td className="items-center inline-flex gap-4 p-4">
                                    {compareItem.icon &&
                                        <ServerIcon icon={compareItem.icon} className={"size-8"} />
                                    }
                                    {compareItem.name}
                                </td>
                                <td className="p-4">{compareItem.current}</td>
                                <td className="p-4">{compareItem.mean}</td>
                                <td className="p-4">{compareItem.max}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Container>
    );
};
