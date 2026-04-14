import { useEffect, useRef, useState } from "react";


export function useDebounce<T>(value: T, delay: number): T {

    const [debouncedValue, setDebouncedValue] = useState(value);
    const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if(delay === 0){
            setDebouncedValue(value);
            return;
        }
        timeoutIdRef.current = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        }
    }, [value, delay])

    return debouncedValue;

}