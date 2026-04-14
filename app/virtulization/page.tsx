"use client";
import { useEffect, useMemo, useState } from "react";
import getData from "./utils/data";
import VirtulizedList from "./components/VirtulizedList";

const TOTAL_COUNT = 100000;
// in px
const ELEMENT_HEIGHT = 50;
const WINDOW_HEIGHT = 400;

function ItemElement(item: ReturnType<typeof getData>[0]){
    return (
        <>
            <div className="text-2xl">
                #{item.id + 1}
            </div>
            <div className="flex flex-col">
                <div>
                    {item.name}
                </div>
                <div>
                    {item.role}
                </div>
            </div>
        </>
    )
}


export default function Virtulization() {

    const [data, setData] = useState<ReturnType<typeof getData>>([]);

    useEffect(() => {
        setData(getData(TOTAL_COUNT));
    }, []);




    return (
        <div className="h-dvh w-dvw flex justify-center items-center gap-4 flex-col">
            <VirtulizedList
                data={data}
                itemHeight={ELEMENT_HEIGHT}
                containerHeight={WINDOW_HEIGHT}
                itemRenderer={ItemElement}
                getKey={(item)=>item.id}
                itemClasses="flex gap-4 items-center justify-start px-40 border-b border-dashed w-full"
                containerClasses="bg-black text-white border border-white rounded-2xl w-[90%]"
            />  
        </div>
    )
}