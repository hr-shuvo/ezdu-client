'use client'



import { Card, CardHeader } from '@/components/ui/card';
import { getCurrentUser } from '@/services/authService';
import { Flame, Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, useTransition } from 'react';
import Loading from '../../(main)/courses/loading';

const User = {
    name: "Harun Shuvo",
    avatar: "/avatar.png", // Placeholder
    totalXp: 4520,
    currentStreak: 8,
    badges: [
        { label: "Fast Learner", icon: <Flame className="text-orange-500" /> },
        { label: "Top 10%", icon: <Star className="text-yellow-500" /> },
    ],
    recentLessons: [
        { title: "Class 7 Science - Chapter 3", xp: 30 },
        { title: "BCS English Practice", xp: 20 },
    ],
};

const UserProfile = () => {
    const [isPending, startTransition] = useTransition();
    const [user, setUser] = useState<any>(User);

    useEffect(() =>{
        startTransition(async() =>{
            const _user = await getCurrentUser();
            console.log(_user.data);
            // setUser(_user.data);
            const _temp = {...User, name: _user.data.name}
            setUser(_temp);
        })
    }, [])



    if(isPending){
        return <Loading/>
    }


    return (
        <>
            <div className='grid grid-cols-8 gap-2w-full'>

                <div className='col-span-3 p-2'>

                    <div className='w-full space-y-6'>
                        <Card className="shadow-md rounded-2xl">
                            <CardHeader>
                                <div className='flex items-center  gap-4'>
                                    <Image
                                        height={30}
                                        width={30}
                                        src={user.avatar}
                                        alt="Avatar"
                                        className="w-20 h-20 rounded-full border-4 border-lime-400"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-bold">{user.name}</h2>
                                        <p className="text-muted-foreground">Total XP: <span className="text-lime-500 font-semibold">{user.totalXp}</span></p>
                                        <p className="text-muted-foreground">Streak: <span className="text-orange-500 font-semibold">{user.currentStreak} days 🔥</span></p>
                                    </div>
                                </div>

                            </CardHeader>


                        </Card>

                    </div>


                </div>

                <div className='col-span-5 p-2'>
                    <div className="w-full space-y-6">


                        {/* Badges */}
                        <div className="bg-white dark:bg-zinc-900 shadow-md rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-3">🏅 Badges</h3>
                            <div className="flex flex-wrap gap-4">
                                {user.badges.map((badge:any, i:number) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 px-4 py-2 bg-lime-100 dark:bg-lime-900 text-lime-800 dark:text-lime-200 rounded-xl shadow-sm"
                                    >
                                        {badge.icon}
                                        <span>{badge.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Recent Activity */}
                        <div className="bg-white dark:bg-zinc-900 shadow-md rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-3">📘 Recent Activity</h3>
                            <ul className="space-y-2">
                                {user.recentLessons.map((lesson:any, i:number) => (
                                    <li
                                        key={i}
                                        className="flex justify-between items-center p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg"
                                    >
                                        <span>{lesson.title}</span>
                                        <span className="text-sm text-lime-500 font-medium">+{lesson.xp} XP</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>



            </div>

        </>
    )

}


export default UserProfile;