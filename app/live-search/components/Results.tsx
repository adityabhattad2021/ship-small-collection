import { useEffect, useState } from "react";
import getUsersByName, { UserData } from "../utils/mockApiClient";

interface ResultsProps {
    original: string;
    searchTerm: string;
    isEffect: boolean
}

export default function Results({
    original,
    searchTerm,
    isEffect
}: ResultsProps) {
    const [results, setResults] = useState<UserData[] | null>(null);
    const [timesCalled, setTimeCalled] = useState(0);
    const [keyStrokes, setKeyStrokes] = useState(0);
    useEffect(() => {
        getUsersByName(searchTerm).then((res) => setResults(res));
        setTimeCalled(val => val + 1);
    }, [searchTerm])

    useEffect(() => {
        setKeyStrokes(val => val + 1);
    }, [original])

    return (
        <div className="h-[90%] w-50  pt-4 flex gap-2 flex-col">
            {isEffect && (
                <>
                    <div className="flex gap-2 w-full items-center text-2xl text-white">
                        <h1>
                            {timesCalled}
                        </h1>
                        <h1>
                            {keyStrokes}
                        </h1>
                    </div>
                    {results && results.map((result) => {
                        return (
                            <div key={result.id} className="flex gap-2 w-full p-4 rounded-xl items-center">
                                <img src={result.heroImage} alt="profile picture" className="w-4 h-4" />
                                <p className="text-white">{result.name}</p>
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    )
}