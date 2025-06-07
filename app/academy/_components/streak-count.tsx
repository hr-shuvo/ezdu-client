'use client';

import { Flame } from "lucide-react";

type Props = {
    count: number,
    xp: number
}

export const StreakCount = ({ count, xp }: Props) => {

    return (
        <>
            <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Flame className="text-orange-500" />
                        <span className="font-semibold text-base">{count} দিন স্ট্রিক</span>
                    </div>
                    <p className="text-sm">XP: <span className="font-bold">{xp}</span></p>
                </div>
            </div></>
    )

}

