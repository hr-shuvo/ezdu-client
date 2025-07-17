'use client';

import React, {  } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Flame, Star } from 'lucide-react';
import Link from "next/link";



type Props = {
    user: any,
    isCurrent: any
}

const getMedal = (rank: number) => {
    const medals = ['🥇', '🥈', '🥉'];
    return medals[rank - 1] || null;
};

export const LeaderboardCard = ({ user, isCurrent }: Props) => {
    return (
        <Card className={cn(
            'flex items-center justify-between gap-4 p-2 px-4 shadow-sm transition hover:shadow-md',
            isCurrent && 'bg-lime-100 dark:bg-lime-900 border-lime-400 border'
        )}>
            <div className="flex items-center gap-4">
                <div className=" text-right">
                    {getMedal(user.rank) || user.rank}
                </div>
                <Avatar>
                    <AvatarImage src={user.userImageSrc} />
                    <AvatarFallback>{(user.username?.charAt(0))?.toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                    <div className="text-md font-semibold">
                        <Link href={`/u/${user.username}`} className="hover:underline text-blue-600 dark:text-blue-400">
                            {user.username || 'Unknown User'}
                        </Link>
                        {isCurrent && <span className="text-xs text-lime-500"> (You)</span>}
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className="text-sm text-muted-foreground">XP: {user.totalXp}</div>
                        <div className="text-sm text-muted-foreground flex items-center"><Flame className='h-4'/> {user.totalXp}</div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-yellow-600 font-semibold">
                <Star className="w-4 h-4" /> {user.totalXp.toFixed(1)} XP
            </div>
        </Card>
    );
};