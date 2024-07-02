"use client";

import { useEffect } from "react";
import { CompareItem } from "@/utils/parsedData";
import { Container } from "../layout/container/container";
import { ServerIcon } from "@/components/server/serverIcon";

interface Props {
    sessionStorageID: string,
    compareItems: CompareItem[];
    selectedItems: string[]
    setSelectedItems: any
}

export const CompareItems = ({ sessionStorageID, compareItems, selectedItems, setSelectedItems }: Props) => {
    useEffect(() => {
        const storedString = sessionStorage.getItem(sessionStorageID);
        if (storedString) {
            setSelectedItems(storedString.split(','));
        }
    }, []);

    const setServer = (active: boolean, server: CompareItem) => {
        let updatedSelectedServerIds;

        if (active) {
            updatedSelectedServerIds = selectedItems.filter(id => id !== server.slug);
        } else {
            updatedSelectedServerIds = [...selectedItems, server.slug];
        }

        setSelectedItems(updatedSelectedServerIds);
        sessionStorage.setItem(sessionStorageID, updatedSelectedServerIds.join(','));
    };

    return (
        <Container className="w-full tablet:w-fit flex flex-col tablet:overflow-auto shrink-0 select-none shadow-md dark:shadow-none overflow-x-hidden">
            <table className="w-full table-auto divide-y-2 divide-whiteBorder dark:divide-darkBorder">
                <thead>
                    <tr className="text-dark font-semibold dark:text-mainText dark:font-medium divide-whiteBorder">
                        <th />
                        <th className="p-4 text-start">Servers</th>
                        <th className="text-start p-4">Current</th>
                        <th className="text-start p-4">Mean</th>
                        <th className="text-start p-4">Max</th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-whiteBorder dark:divide-darkBorder">
                    {compareItems.map((compareItem, index) => {
                        const active = selectedItems.includes(compareItem.slug);

                        return (
                            <tr 
                                onClick={() => setServer(active, compareItem)}
                                key={index} 
                                className={`fade hover:bg-whiteSelected hover:text-whiteMT dark:hover:bg-darkSelected dark:hover:text-mainText cursor-pointer ${active ?
                                    "bg-whiteSelected text-whiteMT font-semibold dark:font-normal dark:bg-darkSelected dark:text-mainText":
                                    "text-whiteST"
                                }`}
                            >
                                <td>
                                    <div className={`flex items-center justify-center w-2 h-14`} style={{ backgroundColor: `${active ? compareItem.color:""}` }} />
                                </td>
                                <td className="items-center inline-flex gap-4 px-4 h-14">
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
