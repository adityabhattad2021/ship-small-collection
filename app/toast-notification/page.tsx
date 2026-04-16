"use client";
import ExampleChild from "./components/ExampleChildComponent";
import ToastProvider from "./contexts/ToastProvider";

export default function Page(){
    return (
        <ToastProvider>
            <div className="h-dvh w-dvw bg-black overflow-hidden flex justify-center items-center">
                Parent Page
                <ExampleChild />
            </div>
        </ToastProvider>
    )
}