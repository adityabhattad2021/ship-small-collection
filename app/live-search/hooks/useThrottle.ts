import { useEffect, useRef, useState } from "react";

export default function useThrottle<T>(value:T, delay: number): T {

    const [throttledValue, setThrottledValue] = useState<T>(value);
    const lastExecutedRef = useRef(0);
    const timeoutIdRef = useRef<ReturnType<typeof setTimeout>|null>(null);


    useEffect(()=>{
        if(delay === 0){
            setThrottledValue(value);
            return;
        }

        const now = Date.now();
        const timeSinceLastExecution = now - lastExecutedRef.current;
        const remaining = delay - timeSinceLastExecution;

        if(remaining <= 0){
            if(timeoutIdRef.current){
                clearTimeout(timeoutIdRef.current);
                timeoutIdRef.current = null;
            }
            setThrottledValue(value);
            lastExecutedRef.current = Date.now();
        } else if(!timeoutIdRef.current){
            timeoutIdRef.current = setTimeout(()=>{
                setThrottledValue(value);
                lastExecutedRef.current = Date.now();
                timeoutIdRef.current = null;
            }, remaining);
        }

            return () => {
                if(timeoutIdRef.current){
                clearTimeout(timeoutIdRef.current);
                timeoutIdRef.current = null;
            }
        }
 
    },[value, delay])


    return throttledValue;

}