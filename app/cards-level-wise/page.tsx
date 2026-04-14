"use client";

import { PointerEvent, useRef, useState } from "react";


const MAX_ALLOWED_DRAG = 50;
const TRANSITION_DURATION = 1000;
const cards = [1, 2, 3, 4, 5, 6];
const MAX_VISIBLE_CARDS = 200;

export default function CardsLevelWise() {

    const [isDragging, setIsDragging] = useState(false);
    const [dragOffsetY, setDragOffsetY] = useState(0);
    const [dragOffsetX, setDragOffsetX] = useState(0);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [activeScale, setActiveScale] = useState(1);
    const [activeZIndex, setActiveZIndex] = useState(cards.length);
    const [hasCrossed, setHasCrossed] = useState(false);
    const startYRef = useRef(0);
    const startXRef = useRef(0);
    const pointerIdRef = useRef<number | null>(null);

    function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsDragging(true);
        setHasCrossed(false);
        setDragOffsetX(0);
        setDragOffsetY(0);
        startYRef.current = event.clientY
        startXRef.current = event.clientX;
        pointerIdRef.current = event.pointerId;
    }

    function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
        if (pointerIdRef.current !== event.pointerId) {
            return;
        }
        const deltaY = event.clientY - startYRef.current;
        const deltaX = event.clientX - startXRef.current;
        console.log(deltaY, deltaX);
        if (Math.abs(deltaX) > MAX_ALLOWED_DRAG || Math.abs(deltaY) > MAX_ALLOWED_DRAG) {
            setHasCrossed(true);
        }
        setDragOffsetY(deltaY);
        setDragOffsetX(deltaX);
    }

    function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
        event.currentTarget.releasePointerCapture(event.pointerId);
        pointerIdRef.current = null;
        setIsDragging(false);
        if (!hasCrossed) {
            setDragOffsetY(0)
            setDragOffsetX(0);

        } else {
            const backOffset = Math.min(cards.length, MAX_VISIBLE_CARDS) - 1;
            setActiveScale(1 - backOffset * 0.08)
            setDragOffsetY(backOffset * 20);
            setDragOffsetX(0);
            setActiveZIndex(cards.length - backOffset - 1);
            setTimeout(()=>{
                setDragOffsetX(0);
                setDragOffsetY(0);
                setActiveScale(1);
                setActiveZIndex(cards.length)
                setActiveCardIndex(v=>(v+1)%cards.length);
            },TRANSITION_DURATION)
        }
    }


    return (
        <div
            className="bg-black h-dvh w-dvw flex flex-col justify-center items-center"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <div className="flex-1 flex justify-center items-center relative">
                {cards.map((_, index) => {
                    const isActiveCard = activeCardIndex === index;
                    const offset = (index - activeCardIndex + cards.length) % cards.length;
                    const zIndex = isActiveCard ? activeZIndex : cards.length - offset;
                    const scale = isActiveCard ? activeScale : 1 - (offset) * 0.08;
                    const offsetX = isActiveCard ? dragOffsetX : 0
                    const offsetY = isActiveCard ? dragOffsetY : offset * 20; 
                    if(offset+1 > MAX_VISIBLE_CARDS){
                        return null;
                    }
                    return (
                        <div
                            className="bg-white text-black w-100 h-25 rounded-2xl flex justify-center items-center absolute border border-black will-change-transform"
                            style={{
                                transition: (isDragging) ? "none" : `transform ${TRANSITION_DURATION}ms ease-in-out`,
                                transform: `translateY(${offsetY}px) translateX(${offsetX}px) scale(${scale})`,
                                zIndex:zIndex
                            }}
                            key={index}
                        >
                            Card {index}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


