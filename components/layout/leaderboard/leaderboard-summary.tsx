'use client';

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react";
import { loadLeaderboard } from "@/app/_services/leaderboard-service";
import { Skeleton } from "@/components/ui/skeleton";


// const leaderboard = [
//     { name: "Shuvo", rank: 1, xp: 2290, badge: "🔥 Champion" },
//     { name: "Amina", rank: 2, xp: 2150, badge: "🥈 Pro" },
//     { name: "Rafi", rank: 3, xp: 1525, badge: "🥉 Fast Learner" },
//     { name: "Nila", rank: 4, xp: 1280, badge: "📘 Achiever" },
//     { name: "Tuhin", rank: 5, xp: 940, badge: "🎯 Active" },
//     { name: "Mitu", rank: 6, xp: 900, badge: "🚀 Quick" },
//     { name: "Salman", rank: 7, xp: 460, badge: "📚 Steady" },
// ];

export const LeaderboardSummary = () => {
    const [isPending, startTransition] = useTransition();
    const [leaderboard, setLeaderboard] = useState<any[]>();


    function getLeagueTitleByXP(xp: number) {
        if (xp >= 2000) return "💎 ডায়মন্ড";
        if (xp >= 1500) return "🔷 প্লাটিনাম";
        if (xp >= 1000) return "🥇 গোল্ড";
        if (xp >= 500) return "🥈 সিলভার";
        return "🥉 ব্রোঞ্জ";
    }


    useEffect(() => {
        startTransition(async () => {
            const _leaderboard = await loadLeaderboard();
            console.log(_leaderboard.data);
            setLeaderboard(_leaderboard.data);
        })

    }, []);

    return (
        <>

            <Card className="shadow-lg lg:row-span-2">
                <CardContent className="p-5">
                    <h2 className="text-xl font-bold mb-4">🏆 লিডারবোর্ড</h2>
                    {
                        isPending ? (
                            <>
                                <Skeleton className='h-32 w-full'/>
                            </>
                            )
                            : (
                                <>
                                    <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
                                        {leaderboard?.map((user) => (
                                            <div
                                                key={user.rank}
                                                className="flex items-center justify-between px-2 py-1 border-b"
                                            >
                                                <div className={`flex items-center gap-3 `}>
                                                    <Avatar className="w-8 h-8">
                                                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium text-base">
                                                            #{user.rank} {user.name}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">XP: {user.totalXp}</p>
                                                    </div>
                                                </div>

                                                {/*{user.rank <= 3 ? (*/}
                                                {/*    <Badge className="text-sm px-2 py-1 min-w-[100px] text-center">*/}
                                                {/*        {user.badge}*/}
                                                {/*    </Badge>*/}
                                                {/*) : (*/}
                                                {/*    <Badge className="text-xs px-2 py-1 min-w-[80px] bg-gray-200 text-gray-800 font-semibold">*/}
                                                {/*        {getLeagueTitleByXP(user.totalXp)}*/}
                                                {/*    </Badge>*/}
                                                {/*)}*/}

                                                <Badge className="text-sm px-2 py-1 min-w-[100px] text-center">
                                                    {getLeagueTitleByXP(user.totalXp)}
                                                </Badge>

                                            </div>
                                        ))}
                                    </div>

                                    <Button className="w-full mt-4" variant="outline" asChild>
                                        <Link href="/leaderboard">
                                            <div className="flex items-center justify-center gap-1">
                                                বিস্তারিত দেখুন <ArrowRight className="w-4 h-4"/>
                                            </div>
                                        </Link>
                                    </Button>
                                </>

                            )
                    }
                </CardContent>
            </Card>
        </>
    )
}