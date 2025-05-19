"use client";

import { Particles } from "@/components/magicui/particles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
    title: string;
    height?: string;
    textSize?: 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl' | 'text-6xl' | 'text-7xl' | 'text-8xl' | 'text-9xl';
}

export const Particle = ({
                             title,
                             height = '150px',
                             textSize = 'text-6xl',
                         }: Props) => {
    const {resolvedTheme} = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme]);

    return (
        <div
            className={`relative flex h-[${height}] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background`}>
                      <span
                          className={`pointer-events-none z-10 whitespace-pre-wrap text-center ${textSize} font-semibold leading-none`}>
                        {title}
                      </span>
            <Particles
                className="absolute inset-0 z-0"
                quantity={500}
                ease={80}
                color={color}
                refresh
            />
        </div>
    )

}