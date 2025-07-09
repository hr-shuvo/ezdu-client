import { getUserProfile } from "@/app/_services/user-service";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Flame, Star } from "lucide-react";

type Props = {
    params: Promise<{
        slug: string;
    }>;
}

const UserDetailsPage = async ({ params }:Props) => {
    const { slug } = await params;

    const userProfile = await getUserProfile(slug);
    // console.log(userProfile);
    if(!userProfile){
        toast.error("User profile not found.");
        redirect('/');
    }

    userProfile.badges = [
        { label: "Fast Learner", icon: <Flame className="text-orange-500" /> },
        { label: "Top 10%", icon: <Star className="text-yellow-500" /> },
    ];
    userProfile.recentLessons = [
        { title: "Class 7 Science - Chapter 3", xp: 30 },
        { title: "BCS English Practice", xp: 20 },
    ];


    return (

        <>
            <div className='grid grid-cols-1 lg:grid-cols-8 gap-4'>

                <div className='lg:col-span-3'>

                    <div className='w-full space-y-6'>
                        <Card className="shadow-md rounded-2xl w-full">
                            <CardHeader className='p-2 lg:p-6'>
                                <div className='flex items-center gap-4'>
                                    <Image
                                        height={30}
                                        width={30}
                                        src={userProfile.avatar || "/mascot.svg"}
                                        alt="Avatar"
                                        className="w-20 h-20 rounded-full border-4 border-lime-400"
                                    />
                                    <div className='flex flex-col gap-2'>
                                        <div>
                                            <h2 className="text-xl font-bold">{userProfile.name}</h2>
                                            <p className="text-sm text-muted-foreground">@{userProfile.username}</p>

                                        </div>

                                        <div className={'flex items-center gap-4'}>
                                            <p className="text-muted-foreground">Total XP: <span className="text-lime-500 font-semibold">{userProfile.totalXp | 0}</span></p>
                                            <p className="text-muted-foreground">Streak: <span className="text-orange-500 font-semibold">{userProfile.currentStreak | 0} days 🔥</span></p>

                                        </div>

                                    </div>
                                </div>

                            </CardHeader>


                        </Card>

                    </div>


                </div>

                <div className='lg:col-span-5'>
                    <div className="w-full space-y-2">


                        {/* Badges */}
                        <div className="bg-white dark:bg-zinc-900 shadow-md rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-3">🏅 Badges</h3>
                            <div className="flex flex-wrap gap-4">
                                {userProfile?.badges?.map((badge:any, i:number) => (
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
                                {userProfile?.recentLessons?.map((lesson:any, i:number) => (
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

export default UserDetailsPage;