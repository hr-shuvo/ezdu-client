'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { LeaderboardCard } from './leaderboard-card';
import { loadLeaderboard } from '../_services/leaderboard-service';

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


const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [isPending, startTrnsition] = useTransition();

    useEffect(() => {
        setLeaderboard(LeaderboardData);

        startTrnsition(async() =>{
            const _leaderboard = await loadLeaderboard();
            console.log(_leaderboard.data);
            setLeaderboard(_leaderboard.data)
        })
        

    }, []);

    return (
        <>

            <div className="max-w-3xl mx-auto p-6 space-y-6">
                <h1 className="text-3xl font-bold text-center mb-4 text-primary">
                    EzDu Weekly Leaderboard
                </h1>
                <p className="text-center text-muted-foreground">
                    See how you rank among other learners this week! This leaderboard tracks your total XP points
                    earned through quizzes, lessons, and streaks. Top performers get fame and fun rewards!
                </p>

                {isPending ? (
                    <p className="text-center mt-6">Loading leaderboard...</p>
                ) : (
                    <div className="space-y-3">
                        {leaderboard.map((user) => (
                            <LeaderboardCard
                                key={user.userId}
                                user={user}
                                isCurrent={user.isCurrentUser}
                            />
                        ))}
                    </div>
                )}

                <div className="mt-10 p-4 bg-muted rounded-xl text-sm text-muted-foreground">
                    <p><strong>Tip:</strong> Keep your streak going and complete daily quizzes to climb up faster! XP is calculated based on accuracy, streaks, and consistency.</p>
                    <p className="mt-2">You earn bonus XP for:</p>
                    <ul className="list-disc ml-6 mt-1">
                        <li>Finishing quizzes with 100% accuracy</li>
                        <li>Maintaining a 7-day streak</li>
                        <li>Participating in challenges or bonus rounds</li>
                    </ul>
                </div>
            </div>


        </>
    );

}

export default Leaderboard;