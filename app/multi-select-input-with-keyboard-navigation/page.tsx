"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useReducer, useRef, useState } from "react";
import MultiSelectInput from "./components/MultiSelectInputWithKeyboard";


const OPTIONS = [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "GraphQL",
    "Docker",
    "AWS",
    "Redis",
    "PostgreSQL",
    "MongoDB",
    "Kubernetes",
    "Figma",
    "Next.js",
    "Tailwind CSS",
    "Rust",
    "Go",
    "Vue.js",
    "Firebase",
    "Prisma",
];




export default function Page() {

    const [selected, setSelected] = useState<string[]>([]);

    function onSelectedChange(val:string[]):void{
        setSelected(val);
    }


    return (
        <div className="h-dvh w-dvw bg-black flex justify-center items-center">
            <MultiSelectInput
                options={OPTIONS}
                setSelected={onSelectedChange}
            />
        </div>
    )
}