import { Fragment, ReactHTMLElement, ReactNode, UIEvent, useState } from "react"


interface VirtulizedListProps<T>{
    data:T[],
    itemHeight: number,
    containerHeight: number,
    itemRenderer: (item: T) => ReactNode,
    getKey:(item:T)=>number,
    overscan?: number,
    itemClasses?: string,
    containerClasses?: string
}

export default function VirtulizedList<T>({
    data,
    itemHeight,
    containerHeight,
    itemRenderer,
    getKey,
    overscan = 5,
    itemClasses = "",
    containerClasses = ""
}:VirtulizedListProps<T>){
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0 + (containerHeight/itemHeight));

    function handleScroll(event: UIEvent<HTMLDivElement>){
        const scrollTop = event.currentTarget.scrollTop;
        const visibleStart = Math.floor(scrollTop/itemHeight);
        const visibleEnd = Math.floor(visibleStart + (containerHeight/itemHeight));

        const sIndex = Math.max(0, visibleStart - overscan);
        const eIndex = Math.min(data.length, visibleEnd + overscan);
        setStartIndex(sIndex);
        setEndIndex(eIndex);
    }

    return (
        <div style={{
            height: containerHeight
        }} onScroll={handleScroll} className={`overflow-y-scroll ${containerClasses}`}>
            <div className="relative" style={{
                height: data.length*itemHeight
            }}>
                {data.slice(startIndex,endIndex).map((item,index)=>{
                    return (
                        <div key={getKey(item)} className={`absolute ${itemClasses}`} style={{transform:`translateY(${(index+startIndex)*itemHeight}px)`,height:itemHeight}}>
                            {itemRenderer(item)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}