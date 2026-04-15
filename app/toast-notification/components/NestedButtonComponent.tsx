import { HTMLAttributes, ReactNode } from "react";

interface NestedButtonProps extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode,
    onClick?: ()=>void,
}

export default function NestedButton({
    children,
    onClick,
    ...props
}:NestedButtonProps){

    function hanldeOnClick(){
        // toast will be called here
        onClick?.();
    }

    return (
        <div onClick={hanldeOnClick} {...props} className="bg-black rounded-xl p-4 text-white active:scale-90 cursor-pointer transition-transform duration-75 ease-out">
            {children}
        </div>
    )
}