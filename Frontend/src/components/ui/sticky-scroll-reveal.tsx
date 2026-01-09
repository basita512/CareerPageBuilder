"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
    content,
    contentClassName,
}: {
    content: {
        title: string;
        description: string;
        content?: React.ReactNode | any;
    }[];
    contentClassName?: string;
}) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef<any>(null);
    const { scrollYProgress } = useScroll({
        container: ref,
        offset: ["start start", "end start"],
    });
    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0,
        );
        setActiveCard(closestBreakpointIndex);
    });


    return (
        <motion.div
            className={cn(
                // Container handles scrolling
                "h-[30rem] lg:h-[40rem] overflow-y-auto relative flex flex-col rounded-md p-4 lg:p-10 no-scrollbar items-center",
                contentClassName
            )}
            ref={ref}
        >
            {/* Phantom Scroll Track */}
            <div className="absolute top-0 left-0 right-0 w-full" style={{ height: `${content.length * 50}vh` }} />

            {/* Sticky Content Wrapper */}
            <div className="sticky top-0 h-full w-full flex flex-col lg:flex-row gap-4 lg:gap-10 overflow-hidden items-center justify-start lg:justify-center pt-8 lg:pt-0">

                {/* Text Column */}
                <div className="w-full lg:w-1/3 h-[100px] lg:h-[300px] relative flex items-center justify-center shrink-0">
                    {content.map((item, index) => (
                        <motion.div
                            key={item.title + index}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: activeCard === index ? 1 : 0,
                                y: activeCard === index ? 0 : activeCard > index ? -20 : 20,
                                scale: activeCard === index ? 1 : 0.95,
                                filter: activeCard === index ? "blur(0px)" : "blur(4px)",
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 w-full h-full flex flex-col justify-center items-start lg:items-start"
                        >
                            <h2 className="text-2xl lg:text-4xl font-bold font-display text-foreground">
                                {item.title}
                            </h2>
                            <p className="text-sm lg:text-lg text-muted-foreground mt-2 lg:mt-6 leading-relaxed max-w-sm">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Image Column */}
                <div className="w-full lg:w-2/3 relative flex items-center justify-center">
                    <div className="relative w-full h-full perspective-1000 flex items-center justify-center">
                        {/* Spacer to force natural height/width if needed, though absolute positioning handles it */}
                        <div className="invisible opacity-0 pointer-events-none relative w-full h-full flex items-center justify-center">
                            {content[activeCard].content}
                        </div>

                        {content.map((item, index) => (
                            <motion.div
                                key={item.title + index}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0,
                                    y: activeCard === index ? 0 : activeCard > index ? -50 : 50,
                                    rotateX: activeCard === index ? 0 : activeCard > index ? 10 : -10,
                                    scale: activeCard === index ? 1 : 0.9,
                                    zIndex: activeCard === index ? 10 : 0
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 w-full h-full origin-bottom flex items-center justify-center"
                            >
                                {item.content}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
