import { ChangeEvent, KeyboardEvent, useEffect, useReducer, useRef, useState } from "react";

interface StateType{
    input: string;
    selected: string[];
    currIndex: number;
}

const INITIAL_STATE:StateType = {
    input: "",
    selected: [],
    currIndex: 0,
}

type Action =
    | { type: "inputChange"; payload: { input: string } }
    | { type: "onEnter"; payload: { newSelected: string } }
    | { type: "removeSelected" }
    | { type: "incrementCurr" }
    | { type: "decrementCurr" }
    | { type: "onClick" , payload: { currIndex: number, newSelected: string }};

function reducer(state: StateType, action: Action){
    switch(action.type){
        case "inputChange":{
            return {
                ...state,
                input: action.payload.input,
                currIndex: 0
            }
        }

        case "onEnter":{
            return {
                ...state,
                selected: [...state.selected, action.payload.newSelected],
                input: ""
            }
        }

        case "removeSelected":{
            return {
                ...state,
                selected: state.selected.slice(0,-1)
            }
        }

        case "incrementCurr":{
            return {
                ...state,
                currIndex: state.currIndex + 1
            }
        }

        case "decrementCurr":{
            return {
                ...state,
                currIndex: state.currIndex - 1
            }
        }

        case "onClick":{
            return {
                ...state,
                selected: [...state.selected, action.payload.newSelected],
                currIndex: action.payload.currIndex
            }
        }

        default:{
            return state;
        }
    }
}

interface MultiSelectInputProps{
    options: string[];
    setSelected?: (val:string[]) => void;
}

export default function MultiSelectInput({
    options,
    setSelected
}:MultiSelectInputProps){
    
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    const displayOptions = options.filter((val) => val.toLowerCase().includes(state.input)).filter(val => !state.selected.includes(val));
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement|null>(null);

    useEffect(()=>{
        function handleClickOutside(e:MouseEvent){
            if(containerRef.current && !containerRef.current.contains(e.target as Node)){
                setIsOpen(false);
            }else{
                console.log("What the fick");
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown",handleClickOutside);
    },[])

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        dispatch({
            type: "inputChange",
            payload:{
                input: event.target.value,
            }
        })
    }

    function handleOnKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Enter") {
            dispatch({
                type: "onEnter",
                payload:{
                    newSelected:displayOptions[state.currIndex],
                }
            });
            setSelected?.(state.selected);
        }
        if (event.key === "ArrowDown" && state.currIndex < displayOptions.length-1) {
            dispatch({
                type:"incrementCurr"
            })
        }
        if (event.key === "ArrowUp" && state.currIndex > 0) {
            dispatch({
                type: "decrementCurr",
            })
        }
        if (event.key === "Backspace" && state.input.length === 0) {
            dispatch({
                type: "removeSelected",
            })
        }
        
    }

    function handleOnItemClick(index: number){
        dispatch({
            type:"onClick",
            payload:{
                newSelected: displayOptions[index],
                currIndex: 0
            }
        })
        inputRef.current?.focus();
    }

    return (
        <div ref={containerRef} className="flex flex-col justify-center items-center h-100 w-300 overflow-y-scroll" >
            <div className="w-full text-2xl p-4 bg-white text-black rounded-xl flex overflow-x-scroll" role="combobox" aria-expanded={isOpen} aria-haspopup="listbox" aria-controls="skills-listbox">
                <div className="mr-2 flex gap-2">
                    {state.selected.map((item) => {
                        return (
                            <div key={item} className="bg-gray-500 text-white px-3 py-2 rounded-xl flex justify-center items-center gap-1">
                                <div className="text-lg">
                                    {item}
                                </div>
                                <div className="text-[10px] -mr-2">
                                    ❌
                                </div>
                            </div>
                        )
                    })}
                </div>
                <input
                    type="text"
                    value={state.input}
                    onChange={handleChange}
                    onKeyDown={handleOnKeyDown}
                    onFocus={() => setIsOpen(true)}
                    placeholder="options will go here..."
                    className="focus:outline-none flex-1" ref={inputRef}
                    aria-activedescendant={state.currIndex >= 0 ? `option-${state.currIndex}` : undefined}
                />
            </div>
            {isOpen && (
                <div className="w-full flex flex-col max-h-1/2 overflow-y-scroll gap-2 mt-3" role="listbox" id="skills-listbox">
                    {displayOptions.map((item, index) => {
                        return (
                            <div 
                                id={`option-${index}`}
                                key={item} 
                                role="option"
                                aria-selected={state.selected.includes(item)}
                                className={`text-white w-full rounded-xl p-4 ${state.currIndex === index ? 'bg-gray-800' : 'bg-gray-500 '}`} 
                                onClick={()=>handleOnItemClick(index)}
                                ref={index === state.currIndex ? (el)=> el?.scrollIntoView({block:"nearest"}): null}
                                >
                                {item}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )

}