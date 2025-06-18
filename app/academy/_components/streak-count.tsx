'use client';

import { getAcademyProgress } from "@/app/_services/academy/academyProgressService";
import { useSecure } from "@/context/SecureContext";
import { Flame } from "lucide-react";
import { useEffect, useState, useTransition } from "react";


export const StreakCount = () => {
    const [isPending, startTransition] = useTransition();
    const [progress, setProgress] = useState<any>();
    const { isLoggedIn } = useSecure();

    useEffect(() => {
        if (isLoggedIn) {
            startTransition(async () => {
                const _progress = await getAcademyProgress();
                // console.log('progress: ', _progress);
                setProgress(_progress.data);
            })
        }

    }, [isLoggedIn]);

    if (isPending) {
        return <div>...</div>
    }


    return (
        <>
            <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Flame className="text-orange-500" />
                        <span className={`font-semibold ${!progress?.streakCount || progress?.streakCount == 0 ? 'text-base' : 'text-base'}`}>{progress?.streakCount | 0} দিন স্ট্রিক</span>
                    </div>
                    <p className="text-sm">XP : <span className="font-bold">{progress?.totalXp?.toFixed(0) | 0}</span></p>
                </div>

            </div>
        </>
    )

}

