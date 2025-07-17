'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { LeaderboardCard } from './leaderboard-card';
import { cn } from '@/lib/utils';
import XpWeeklyChart from "../academy/_components/xp-graph";
import { Card } from '@/components/ui/card';
import { useSecure } from '@/context/SecureContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { loadLeaderboard } from "@/app/_services/leaderboard-service";
import { getAcademyProgress } from "@/app/_services/academy/academyProgressService";

const LeaderboardData = [
    {
        userId: '1',
        userName: 'Arif',
        userImageSrc: '',
        totalXp: 185.5,
        rank: 1,
        isCurrentUser: false
    },
    {
        userId: '2',
        userName: 'Zara',
        userImageSrc: '',
        totalXp: 176.2,
        rank: 2,
        isCurrentUser: false
    },
    {
        userId: '3',
        userName: 'Rifat',
        userImageSrc: '',
        totalXp: 150.0,
        rank: 3,
        isCurrentUser: false
    },
    {
        userId: '4',
        userName: 'Shuvo',
        userImageSrc: '',
        totalXp: 144.7,
        rank: 4,
        isCurrentUser: true
    },
    {
        userId: '5',
        userName: 'Nabila',
        userImageSrc: '',
        totalXp: 132.3,
        rank: 5,
        isCurrentUser: false
    }
];

const leagues = [
    {name: "Bronze", icon: "🪙", gradient: "from-[#b08d57] to-[#a87d4d]"},
    {name: "Silver", icon: "🧀", gradient: "from-[#c0c0c0] to-[#a9a9a9]"},
    {name: "Gold", icon: "🥉", gradient: "from-[#FFD700] to-[#FFC107]"},
    {name: "Crystal", icon: "💎", gradient: "from-[#00FFFF] to-[#1E90FF]"},
    {name: "Master", icon: "🛡️", gradient: "from-[#FF6347] to-[#FF4500]"},
    {name: "Champion", icon: "🦁", gradient: "from-[#800080] to-[#4B0082]"},
    {name: "Titan", icon: "🐉", gradient: "from-[#FF4500] to-[#DC143C]"},
    {name: "Legend", icon: "👑", gradient: "from-yellow-400 to-red-600"},
];

const rivals = [
    {
        name: "Zara",
        rank: 3,
        xp: "153.2 XP",
        status: "+8 XP Ahead",
        statusColor: "text-blue-600 dark:text-sky-300",
        bg: "bg-white dark:bg-slate-800",
        textColor: "text-gray-800 dark:text-gray-100"
    },
    {
        name: "You",
        rank: 4,
        xp: "145.2 XP",
        status: "Keep Going 💪",
        statusColor: "text-lime-700 dark:text-lime-300",
        bg: "bg-lime-100 dark:bg-lime-900 border border-lime-400",
        textColor: "text-green-900 dark:text-green-200"
    },
    {
        name: "Rifat",
        rank: 5,
        xp: "139.7 XP",
        status: "+6 XP Behind",
        statusColor: "text-red-500 dark:text-red-400",
        bg: "bg-white dark:bg-slate-800",
        textColor: "text-gray-800 dark:text-gray-100"
    }
];


const Leaderboard = () => {
    const {isLoggedIn} = useSecure();
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [isPending, startTransition] = useTransition();
    const [progress, setProgress] = useState<any>();

    useEffect(() => {
        setLeaderboard(LeaderboardData);
        startTransition(async () => {
            const _leaderboard = await loadLeaderboard();
            // console.log(_leaderboard.data);
            setLeaderboard(_leaderboard.data);
        })

    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            startTransition(async () => {
                const _progress = await getAcademyProgress();
                // console.log(_progress)
                setProgress(_progress)
            })
        }

    }, [isLoggedIn]);

    return (
        <>

            <div>

                <div className="mx-auto lg:px-6 space-y-6">
                    <div className="text-center my-6">
                        <h1 className="text-xl lg:text-4xl font-extrabold text-primary tracking-tight mb-2">
                            🏆 EzDu Leaderboard
                        </h1>
                        <p className="hidden lg:block text-muted-foreground text-base max-w-xl mx-auto">
                            Compete with fellow learners and climb the ranks! Earn XP from quizzes, lessons, and daily
                            streaks.
                            Top learners unlock rewards, badges, and bragging rights!
                        </p>
                    </div>


                    <div>
                        <div className="flex overflow-x-auto gap-4 py-4 scrollbar-hide">
                            {leagues.map((league) => (
                                <div
                                    key={league.name}
                                    className={cn(
                                        'flex items-center justify-between gap-3 rounded-2xl px-6 py-4 shadow-md text-white bg-gradient-to-r',
                                        league.gradient
                                    )}
                                >
                                    <span className="text-xl">{league.icon}</span>
                                    <span className="text-sm font-semibold tracking-wide">{league.name}</span>
                                </div>
                            ))}
                        </div>

                    </div>


                </div>

            </div>

            <div className="lg:px-6 grid grid-cols-1 lg:grid-cols-6 gap-6">


                <div className="lg:col-span-4 space-y-6">

                    <div className='w-full'>
                        {isPending ? (
                            <p className="text-center mt-6">Loading leaderboard...</p>
                        ) : (
                            <div className="space-y-3">
                                {leaderboard?.map((user) => (
                                    <LeaderboardCard
                                        key={user.userId}
                                        user={user}
                                        isCurrent={user.isCurrentUser}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {
                        isLoggedIn && (
                            <>
                                <div>
                                    <XpWeeklyChart xpData={progress?.lastWeekXp}/>

                                </div>

                            </>
                        )
                    }
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <div>
                        <Card
                            className="col-span-2 bg-gradient-to-br from-white to-lime-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl p-6 space-y-4">
                            <h2 className="text-xl font-bold text-lime-800 dark:text-lime-300 flex items-center gap-2">
                                🚀 Push Your Rank!
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                You&apos;re just <span className="font-semibold text-green-700 dark:text-lime-300">a few XP</span> away
                                from climbing the leaderboard!
                                Stay consistent with daily lessons, finish your streak, and challenge a friend to earn
                                bonus XP.
                            </p>
                            <ul className="list-disc ml-6 text-sm text-green-900 dark:text-green-200 space-y-1">
                                <li>🎯 Complete one more quiz today</li>
                                <li>🔥 Maintain your streak to get bonus XP</li>
                                <li>👥 Invite a friend and both get rewards</li>
                            </ul>

                            <Link href="/academy/quiz" className="mt-2 block">
                                <Button variant="secondary" className="">
                                    Take a Quick Challenge
                                </Button>
                            </Link>
                        </Card>


                    </div>

                    <div>
                        <Card
                            className="bg-gradient-to-br from-white to-yellow-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl p-6 space-y-5">
                            <h3 className="text-lg font-bold text-orange-900 dark:text-yellow-200 flex items-center gap-2">
                                🎯 Today’s Missions
                            </h3>

                            <ul className="space-y-3 text-sm text-orange-800 dark:text-yellow-100">
                                <li className="flex items-center gap-3 bg-white/60 dark:bg-zinc-800/50 p-3 rounded-lg shadow-sm hover:bg-white/80 dark:hover:bg-zinc-700 transition-all">
                                    <input type="checkbox" className="accent-orange-500 w-4 h-4"/>
                                    <span>✅ Complete <strong>1 Quiz</strong></span>
                                    <span
                                        className="ml-auto bg-orange-200 dark:bg-yellow-600 text-orange-800 dark:text-yellow-100 text-xs px-2 py-1 rounded-full min-w-16">
                +5 XP
            </span>
                                </li>
                                <li className="flex items-center gap-3 bg-white/60 dark:bg-zinc-800/50 p-3 rounded-lg shadow-sm hover:bg-white/80 dark:hover:bg-zinc-700 transition-all">
                                    <input type="checkbox" className="accent-orange-500 w-4 h-4"/>
                                    <span>🔥 Maintain <strong>Daily Streak</strong></span>
                                    <span
                                        className="ml-auto bg-orange-200 dark:bg-yellow-600 text-orange-800 dark:text-yellow-100 text-xs px-2 py-1 rounded-full w-10 text-center  min-w-16">
                +10 XP
            </span>
                                </li>
                                <li className="flex items-center gap-3 bg-white/60 dark:bg-zinc-800/50 p-3 rounded-lg shadow-sm hover:bg-white/80 dark:hover:bg-zinc-700 transition-all">
                                    <input type="checkbox" className="accent-orange-500 w-4 h-4"/>
                                    <span>🔍 Review <strong>3 Wrong Answers</strong></span>
                                    <span
                                        className="ml-auto bg-orange-200 dark:bg-yellow-600 text-orange-800 dark:text-yellow-100 text-xs px-2 py-1 rounded-full  min-w-16">
                +8 XP
            </span>
                                </li>
                            </ul>
                        </Card>


                    </div>

                    <div>
                        <Card className="bg-gradient-to-br from-white to-lime-50 dark:from-gray-900 dark:to-slate-800 rounded-2xl shadow-lg p-6 space-y-4">
                            <h2 className="text-lg font-bold text-blue-900 dark:text-lime-300 flex items-center gap-2">
                                🧑‍🤝‍🧑 Your Rivals
                            </h2>

                            <div className="space-y-3">
                                {rivals.map((rival, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-between rounded-lg px-4 py-2 shadow-sm transition-all ${rival.bg}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <img src="/mascot.svg" className="w-8 h-8 rounded-full" alt={rival.name} />
                                            <div>
                                                <p className={`text-sm font-medium ${rival.textColor}`}>{rival.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Rank {rival.rank} • {rival.xp}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`text-xs font-semibold ${rival.statusColor}`}>
                    {rival.status}
                </span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                    </div>


                </div>
            </div>

            <div className='my-4'>
                <Card>


                    <div className="p-4  rounded-xl text-sm text-muted-foreground">
                        <p><strong>Tip:</strong> Keep your streak going and complete daily quizzes to climb up faster!
                            XP is calculated based on accuracy, streaks, and consistency.</p>
                        <p className="mt-2">You earn bonus XP for:</p>
                        <ul className="list-disc ml-6 mt-1">
                            <li>Finishing quizzes with 100% accuracy</li>
                            <li>Maintaining a 7-day streak</li>
                            <li>Participating in challenges or bonus rounds</li>
                        </ul>
                    </div>
                </Card>
            </div>


        </>
    );

}

export default Leaderboard;