import { HTMLAttributes, ReactNode } from "react";
import { useToast } from "../contexts/ToastProvider";

interface NestedButtonProps extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode,
    onClick?: ()=>void,
}

export default function NestedButton({
    children,
    onClick,
    ...props
}:NestedButtonProps){

    const {addToast, toasts} = useToast();

    function hanldeOnClick(){
        addToast({
            text:"Yo! phase one works!",
            type:"error"
        })
        // toast will be called here
        onClick?.();
    }

    return (
        <div onClick={hanldeOnClick} {...props} className="bg-black rounded-xl p-4 text-white active:scale-90 cursor-pointer transition-transform duration-75 ease-out">
            {children}
        </div>
    )
}