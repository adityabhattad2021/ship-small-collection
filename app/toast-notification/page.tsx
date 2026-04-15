import ExampleChild from "./components/ExampleChildComponent";

export default function Page(){
    return (
        <div className="h-dvh w-dvw bg-black overflow-hidden flex justify-center items-center">
            Parent Page
            <ExampleChild />
        </div>
    )
}