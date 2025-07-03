import React, {  } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';



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
            'flex items-center justify-between gap-4 p-4 shadow-sm transition hover:shadow-md',
            isCurrent && 'bg-lime-100 dark:bg-lime-900 border-lime-400 border'
        )}>
            <div className="flex items-center gap-4">
                <div className="text-xl font-bold w-6 text-right">
                    {getMedal(user.rank) || user.rank}
                </div>
                <Avatar>
                    <AvatarImage src={user.userImageSrc || '/mascot.svg'} />
                    <AvatarFallback>{user.userName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <div className="text-md font-semibold">
                        {user.name || 'Unknown User'}
                        {isCurrent && <span className="text-xs text-lime-500"> (You)</span>}
                    </div>
                    <div className="text-sm text-muted-foreground">XP: {user.totalXp}</div>
                </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-yellow-600 font-semibold">
                <Star className="w-4 h-4" /> {user.totalXp.toFixed(1)} XP
            </div>
        </Card>
    );
};