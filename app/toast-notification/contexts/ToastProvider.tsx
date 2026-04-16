import { useContext, createContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Toast {
    type: string;
    text: string;
    id: number;
}

interface ToastWithoutId{
    type: string;
    text: string;
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (toast: ToastWithoutId) => void;
}

const ToastType = {
    SUCCESS: "success",
    ERROR: "error"
}

const ToastContext = createContext<ToastContextType | null>(null);

interface ToastProviderProps {
    children: React.ReactNode
}

const MAX_VISIBLE_TOASTS = 4;
const VISIBLE_DURATION = 4000; // ms

export default function ToastProvider({
    children
}: ToastProviderProps) {

    const [shouldCreatePortal, setShouldCreatePortal] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(()=>{
        setShouldCreatePortal(true);
    },[])


    function addToast(toast: ToastWithoutId) {
        setToasts(prev => [...prev, { id: Date.now(), ...toast }])
        setTimeout(()=>{
            setToasts((prev)=>[...prev.slice(1)]);
        },VISIBLE_DURATION);
    }

    function handleMouseEnter(index:number){
        if(toasts.length - 1 !== index){
            return;
        }
        setIsHovering(true);
    }

    function handleMouseLeave(index:number){
        if(toasts.length - 1 !== index){
            return;
        }
        setIsHovering(false);
    }

    return (
        <ToastContext.Provider
            value={{
                toasts,
                addToast
            }}
        >
            {children}
            {shouldCreatePortal && createPortal(
                <>
                    {toasts.map((toast,index)=>{
                        if(toasts.length - index > MAX_VISIBLE_TOASTS){
                            return null;
                        }
                        return (
                            <div
                                className={`fixed top-10 left-1/2 -translate-1/2
                                    rounded-2xl px-8 py-4 backdrop-blur-sm
                                    text-xl font-medium
                                    animate-[slide-in_0.3s_ease-out]
                                    ${toast.type === ToastType.SUCCESS
                                    ? 'bg-emerald-900/80 border border-emerald-400/30 text-emerald-50 shadow-[0_4px_12px_rgba(16,185,129,0.1)]'
                                    : 'bg-rose-900/80 border border-rose-400/30 text-rose-50 shadow-[0_4px_12px_rgba(244,63,94,0.1)]'
                                    }`}
                                key={toast.id}
                                style={{
                                    transition: 'transform 200ms ease-in',
                                    transform: isHovering ? `translateY(${120 * (toasts.length - (index + 1))}%)` : `translateY(${10*(toasts.length - (index + 1))}px) scale(${100 -  8 * (toasts.length - (index + 1))}%)`,
                                    // from 1 to toast length
                                    zIndex:`${(1+index)*50}`
                                }}
                                onMouseEnter={()=>handleMouseEnter(index)}
                                onMouseLeave={()=>handleMouseLeave(index)}    
                            >
                                {toast.text} {index}
                            </div>
                        )
                    })}
                </>,
                document.body
            )}
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('use Toast can only be used inside `ToastProvider`');
    }
    return context;
}