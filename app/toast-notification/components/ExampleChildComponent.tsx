"use client";
import NestedButton from "./NestedButtonComponent";

export default function ExampleChild(){
    return (
        <div className="w-1/2 h-1/2 bg-white rounded-2xl text-2xl font-bold flex flex-col gap-4 justify-center items-center">
            Example Child Component
            <NestedButton >
                Press Me :)
            </NestedButton>
        </div>
    )
}