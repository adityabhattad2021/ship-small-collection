"use client";

import { UIEvent, useCallback, useEffect, useRef, useState } from "react";
import { fakeFetch, UserData } from "./utils/data";


export default function InfiniteScroll2Page() {

    const [displayData, setDisplayData] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const isLoadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const pageNumberRef = useRef(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    function fetchData() {
        setIsLoading(true);
        isLoadingRef.current = true
        fakeFetch(pageNumberRef.current)
            .then((data) => {
                if (data.length !== 0) {
                    setDisplayData((prev) => [...prev, ...data])
                } else {
                    setHasMore(false);
                    hasMoreRef.current = false;
                }
                pageNumberRef.current += 1;
            })
            .catch((error) => {
                console.log("there was an error while loading the data: ", error);
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
                isLoadingRef.current = false;
            })
    }

    // only needs to run once in any case
    useEffect(() => {
        // no guard statement needed as this runs only once on mount
        fetchData();
    }, []);

    const sentinalCallbackRef = useCallback((node: HTMLDivElement | null) => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }
        if (!node) {
            return;
        }
        observerRef.current = new IntersectionObserver((entires) => {
            if (entires[0].isIntersecting && hasMoreRef.current && !isLoadingRef.current) {
                fetchData();
            }
        })
        observerRef.current.observe(node);
    }, [])

    function handleScroll(event: UIEvent<HTMLDivElement>) {
        if (event.currentTarget.scrollTop > 500) {
            setShowScrollTop(true);
        } else{
            setShowScrollTop(false);
        }
    }

    function handleScrollToTop() {
        containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="h-dvh w-dvw overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-10" ref={containerRef} onScroll={handleScroll}>
            {displayData.map((data) => {
                return (
                    <div className="flex flex-col gap-2 aspect-square items-center" key={data.id}>
                        <div className="flex-1 overflow-hidden">
                            <img src={data.pfp} alt={`${data.name}'s Profile Picture`} className="max-h-full max-w-full object-contain rounded-2xl" />
                        </div>
                        <div className="p-4 text-2xl">
                            {data.name}
                        </div>
                    </div>
                )
            })}
            {isError ? (
                <div>
                    There is something wrong please refresh the page or visit again later.
                </div>
            ) : (
                <div>
                    {
                        hasMore ? (
                            <div ref={sentinalCallbackRef}>
                                {isLoading && 'Loading...'}
                            </div>
                        ) : (
                            <div>
                                No more items
                            </div>
                        )
                    }
                </div>
            )}
            {showScrollTop && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-black rounded-2xl z-10 p-4 cursor-pointer" onClick={handleScrollToTop}>
                    scroll top ^
                </div>
            )}
        </div>
    )
}