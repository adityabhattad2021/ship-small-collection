"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useReducer, useRef, useState } from "react";

interface MultiSelectInputWithKeyboardNavigationProps {
    options: string[];
    setSelected: (items: string[]) => void;
}

type ReducerState = {
    input: string;
    selected: string[];
    activeIndex: number;
}

type ReducerAction =
    | { type: "inputChange", payload: { newInput: string } }
    | { type: "onClick", payload: { selectedOption: string } }
    | { type: "onDownArrow" }
    | { type: "onUpArrow" }
    | { type: "removeLastSelected" }

function reducer(prevState: ReducerState, action: ReducerAction): ReducerState {
    switch (action.type) {
        case "inputChange": {
            return {
                ...prevState,
                input: action.payload.newInput,
                activeIndex: 0
            }
        }

        case "onClick": {
            return {
                ...prevState,
                selected: [...prevState.selected, action.payload.selectedOption],
                activeIndex: Math.max(0, prevState.activeIndex - 1)
            }
        }

        case "onDownArrow": {
            return {
                ...prevState,
                activeIndex: prevState.activeIndex + 1
            }
        }

        case "onUpArrow": {
            return {
                ...prevState,
                activeIndex: prevState.activeIndex - 1
            }
        }

        case "removeLastSelected": {
            return {
                ...prevState,
                selected: prevState.selected.slice(0, -1)
            }
        }

        default: {
            return prevState;
        }
    }
}

const INITIAL_STATE = {
    input: "",
    selected: [],
    activeIndex: 0
}

export default function MultiSelectInputWithKeyboardNavigation({
    options,
    setSelected
}: MultiSelectInputWithKeyboardNavigationProps) {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const [isOpen, setIsOpen] = useState(false);
    // display options is a derived state hence it can directly be a const.
    const displayOptions = options.filter(option => option.toLowerCase().includes(state.input)).filter((option) => !state.selected.includes(option));
    const inputRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        setSelected(state.selected);
    },[state.selected])

    useEffect(() => {
        function handleClickOutSide(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutSide);
        return () => document.removeEventListener("mousedown", handleClickOutSide)
    }, [])

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        dispatch({
            type: "inputChange",
            payload: {
                newInput: event.target.value
            }
        })
    }

    function handleClickOption(index: number) {
        dispatch({
            type: "onClick",
            payload: {
                selectedOption: displayOptions[index]
            }
        })
        inputRef.current?.focus();
    }

    function handleOnKeyDown(event: KeyboardEvent<HTMLInputElement>) {

        switch (event.key) {
            case "ArrowDown": {
                if (state.activeIndex < displayOptions.length - 1) {
                    dispatch({
                        type: "onDownArrow"
                    })
                }
                return;
            }

            case "ArrowUp": {
                if (state.activeIndex > 0) {
                    dispatch({
                        type: "onUpArrow"
                    })
                }
                return;
            }

            case "Backspace": {
                if (state.input.length === 0) {
                    dispatch({
                        type: "removeLastSelected"
                    })
                }
                return;
            }

            case "Enter": {
                dispatch({
                    type: "onClick",
                    payload: {
                        selectedOption: displayOptions[state.activeIndex]
                    }
                })
            }

        }
    }

    return (
        <div className="w-1/2 flex flex-col justify-center items-center gap-1" ref={containerRef}>
            <div className="flex w-full h-13 overflow-x-scroll bg-white p-1 rounded-md" role="combobox" aria-haspopup="listbox" aria-controls="skills-listbox">
                <div className="flex gap-2">
                    {state.selected.map((selected) => {
                        return (
                            <div className="bg-gray-100 border py-1 px-2 text-2xl flex gap-2 rounded-md whitespace-nowrap" key={selected}>
                                {selected}
                            </div>
                        )
                    })}
                </div>
                <input
                    type="text"
                    value={state.input}
                    onChange={handleInputChange}
                    className="flex-1 rounded-sm focus:outline-none p-4 text-2xl"
                    onKeyDown={handleOnKeyDown}
                    id="input-element"
                    ref={inputRef}
                    onFocus={() => setIsOpen(true)}
                    placeholder={isOpen ? state.selected.length === 0 ? "type here": " " : "click to expand"}
                />
            </div>
            {
                isOpen && (
                    <div className="flex flex-col gap-1 w-full h-100 overflow-y-scroll" role="listbox" id="skills-listbox">
                        {displayOptions.map((item, index) => {
                            return (
                                <div
                                    key={item}
                                    className={`text-2xl py-1 px-4 rounded-sm text-black cursor-pointer active:bg-gray-300 ${state.activeIndex === index ? 'bg-gray-300' : 'bg-gray-100'}`}
                                    onClick={() => handleClickOption(index)}
                                    ref={state.activeIndex === index ? el => el?.scrollIntoView({ block: "nearest" }) : null}
                                >
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                )
            }
        </div>
    )
}
