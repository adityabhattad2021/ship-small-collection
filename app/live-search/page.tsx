"use client";

import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import useThrottle from "./hooks/useThrottle";
import Results from "./components/Results";


export default function LiveSearch() {
    const [searchTerm, setSearchTerm] = useState("");


    const [isDebounced, setIsDebounced] = useState(false);
    const [isThrottled, setIsThrottled] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, isDebounced ? 300 : 0);
    const throttledSearchTerm = useThrottle(searchTerm, isThrottled ? 300 : 0);

    return (
        <div className="h-dvh w-dvw bg-black flex flex-col justify-center items-center py-3">
            <div className="flex gap-4 justify-center items-center w-[90%]">
                <input
                    name="search-by-name"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-4 rounded-xl bg-white text-black text-2xl font-medium focus:outline-none w-full"
                />
            </div>
            <div className="p-4 flex gap-2">
                <button onClick={() => setIsDebounced(val => !val)} className="bg-white p-2 rounded-md active:scale-95">
                    {isDebounced ? 'Debounce On' : 'Debounce Off'}
                </button>
                <button onClick={() => setIsThrottled(val => !val)} className="bg-white p-2 rounded-md active:scale-95">
                    {isThrottled ? 'Throttled On' : 'Throttled Off'}
                </button>
            </div>
            <div className="flex  gap-2 overflow-y-scroll">
                <Results searchTerm={searchTerm} original={searchTerm} isEffect={true} />
                <Results searchTerm={debouncedSearchTerm} original={searchTerm} isEffect={isDebounced} />
                <Results searchTerm={throttledSearchTerm} original={searchTerm} isEffect={isThrottled} />
            </div>
        </div>
    )
}