"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";

const SWIPE_TRIGGER_OFFSET = 60;
const MAX_SWIPE_PREVIEW_OFFSET = 72;
const MAX_VISIBLE_STACK_CARDS = 3;
const CARD_STACK_ANIMATION_DURATION = 220;
const CARD_STACK_SETTLE_DURATION = 40;


interface CardBodyProps{
    index:number;
}

function CardBody({
    index
}:CardBodyProps){
    return (
        <div className="text-black">
            Card {index}
        </div>
    )
}

interface CardsProps {
    cardsArr: number[];
}

export function Cards({
    cardsArr
}: CardsProps){

    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [cardDragOffsetY, setCardDragOffsetY] = useState(0);
    const [isCyclingCard, setIsCyclingCard] = useState(false);
    const [settlingCardId, setSettlingCardId] = useState<string | null>(null);
    const activePointerIdRef = useRef<number | null>(null);
    const cardCycleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const cardSettleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const swipeStartYRef = useRef<number | null>(null);

    useEffect(()=>{
        setActiveCardIndex(0);
        setCardDragOffsetY(0);
        setIsCyclingCard(false);
        setSettlingCardId(null);
    }, [cardsArr]);

    const handleSwipeStart = (clientY:number) => {
        if(cardsArr.length < 1 || isCyclingCard){
            return;
        }
        swipeStartYRef.current = clientY;
    }

    const handleSwipeMove = (clientY: number) => {
        if (swipeStartYRef.current === null || cardsArr.length <= 1 || isCyclingCard) {
            return;
        }
        const deltaY = clientY - swipeStartYRef.current;
        if (deltaY < 0) {
            setCardDragOffsetY(Math.max(deltaY, -MAX_SWIPE_PREVIEW_OFFSET));
        } else {
            setCardDragOffsetY(0);
        }
    };

    const handleSwipeEnd = () => {
        if(swipeStartYRef.current === null){
            return;
        }
        if(cardDragOffsetY <= -SWIPE_TRIGGER_OFFSET && cardsArr.length > 1){
            const currentCardId = `${activeCardIndex}`;
            setIsCyclingCard(true);

            cardCycleTimeoutRef.current = setTimeout(() => {
                setActiveCardIndex((prev) => (prev + 1) % cardsArr.length);
                setCardDragOffsetY(0);
                setIsCyclingCard(false);

                setSettlingCardId(currentCardId);

                cardSettleTimeoutRef.current = setTimeout(()=>{
                    setSettlingCardId(null);
                    cardSettleTimeoutRef.current = null;
                }, CARD_STACK_SETTLE_DURATION);

                cardCycleTimeoutRef.current = null;
            }, CARD_STACK_ANIMATION_DURATION);
        } else {
            setCardDragOffsetY(0);
        }

        activePointerIdRef.current = null;
        swipeStartYRef.current = null;
    }

    const handlePointerStart = (event:PointerEvent<HTMLDivElement>) => {
        if(event.pointerType === "mouse" && event.button !== 0){
            return;
        }
        activePointerIdRef.current = event.pointerId;
        event.currentTarget.setPointerCapture(event.pointerId);
        handleSwipeStart(event.clientY)
    }

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if(activePointerIdRef.current !== event.pointerId){
            return;
        }
        handleSwipeMove(event.clientY);
    }

    const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
        if(activePointerIdRef.current !== event.pointerId){
            return;
        }
        if(event.currentTarget.hasPointerCapture(event.pointerId)){
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        handleSwipeEnd();
    }

    if(!cardsArr.length) {
        return null;
    }

    return (
        <div className="bg-black h-screen w-dvw flex justify-center items-center">
            <div className="w-90 relative">
                {
                    cardsArr.map((card,index)=>{
                        const cardId = `${index}`;
                        const offset = (index - activeCardIndex + cardsArr.length) % cardsArr.length;
                        const cycleOffset = Math.min(cardsArr.length - 1, MAX_VISIBLE_STACK_CARDS - 1);

                        const isActive = offset === 0;
                        const isSettlingCard = settlingCardId === cardId;
                        const isVisible = offset < MAX_VISIBLE_STACK_CARDS;
                        const isCyclingOut = isActive && isCyclingCard;
                        const isDragging = isActive && cardDragOffsetY !== 0;

                        const translateY = isCyclingOut ? cycleOffset * 12 : offset * 12 + (isActive ? cardDragOffsetY : 0);

                        const scale = isCyclingOut ? Math.max(1 - cycleOffset * 0.04, 0.9) : Math.max(1 - offset * 0.04, 0.9);
                        const opacity = isCyclingOut ? 1 - cycleOffset * 0.08 : isVisible ? 1 : 0;

                        const zIndex = isCyclingOut ? 0 : isVisible ? MAX_VISIBLE_STACK_CARDS - offset : 0;

                        const disableTransition = isSettlingCard;
                        const disableDragTransition = isDragging && isActive && !isCyclingOut;
                        const transition = disableTransition || disableDragTransition ? "none" : `transform ${CARD_STACK_ANIMATION_DURATION}ms ease, opacity ${CARD_STACK_ANIMATION_DURATION}ms ease`;

                        return (
                            <div
                                key={index}
                                className={[
                                    "flex flex-row items-center",
                                    "border border-black/10",
                                    "rounded-[10px]",
                                    "box-border p-4 w-full bg-white",
                                    "left-0 absolute top-0 w-full",
                                    "touch-none select none",
                                    "will-change-transform",
                                    isActive ? "pointer-events-auto cursor-grab" : "pointer-events-none cursor-default"
                                ].join(" ")}
                                style={{
                                    boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.1)",
                                    zIndex,
                                    transform: `translateY(${translateY}px) scale(${scale})`,
                                    opacity,
                                    transition
                                }}
                                onPointerCancel={isActive ? handlePointerEnd : undefined}
                                onPointerDown={isActive ? handlePointerStart : undefined}
                                onPointerMove={isActive ? handlePointerMove : undefined}
                                onPointerUp={isActive ? handlePointerEnd : undefined}
                            >
                                <CardBody index={index} />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default function Page(){
    const arr = [1,2,3,4,5];

    return (
        <Cards cardsArr={arr} />
    )
}