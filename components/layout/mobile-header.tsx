'use client';

import { MobileSidebar } from "./mobile-sidebar"
import { Flame } from "lucide-react";
import { getAcademyProgress } from "@/app/_services/academy/academyProgressService";
import { useEffect, useState, useTransition } from "react";
import { cn } from "@/lib/utils";


export const MobileHeader = () => {
    const [isPending, startTransition] = useTransition();
    const [progress, setProgress] = useState<any>();


    useEffect(() => {
        startTransition(async () => {
            const response = await getAcademyProgress();
            if (response) {
                setProgress(response);
                console.log(response);
            }
        })
    }, [])


    return (
        <nav
            className='lg:hidden px-6 h-[50px] flex justify-between items-center border-b fixed top-0 w-full z-50 bg-sky-100 dark:bg-sky-900 border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-100'>
            <MobileSidebar/>

            {
                progress && !isPending && (
                    <div className={cn('flex items-center justify-center ', progress.streakCount > 0 ? 'text-orange-400' : 'text-muted dark:text-gray-400')}>
                        <Flame className=''/> <span className='font-bold text-xl'>{progress.streakCount || '0'}</span>
                    </div>
                )
            }


        </nav>
    )
}
