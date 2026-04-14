"use client";

import { useState } from "react";
import MultiSelectInputWithKeyboardNavigation from "./components/MultiSelectInputWithKeyboardNavigation";

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



export default function Page(){

    const [selected, setSelected] = useState<typeof OPTIONS>([]);

    console.log(selected);

    return (
        <div className="h-dvh w-dvw bg-black flex justify-center items-center">
            <MultiSelectInputWithKeyboardNavigation
                options={OPTIONS}
                setSelected={(items)=>setSelected(items)}
            />
        </div>
    )
}