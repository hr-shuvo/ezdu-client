'use client';

import { ComingSoon } from "@/components/comming-soon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, BookOpenCheck, Bot, CircleUserRound, Flame, ListChecks, ShieldCheck, Trophy, Zap } from "lucide-react";
import Link from "next/link";



const AcademyQuizDashboardPage = () => {
    const leaderboard = [
        { name: "Shuvo", rank: 1, xp: 2290, badge: "🔥 Champion" },
        { name: "Amina", rank: 2, xp: 2150, badge: "🥈 Pro" },
        { name: "Rafi", rank: 3, xp: 1525, badge: "🥉 Fast Learner" },
        { name: "Nila", rank: 4, xp: 1280, badge: "📘 Achiever" },
        { name: "Tuhin", rank: 5, xp: 940, badge: "🎯 Active" },
        { name: "Mitu", rank: 6, xp: 900, badge: "🚀 Quick" },
        { name: "Salman", rank: 7, xp: 460, badge: "📚 Steady" },
    ];


    const recentTests = [
        { subject: "গণিত", score: "8/10", date: "আজ" },
        { subject: "বিজ্ঞান", score: "6/10", date: "গতকাল" },
        { subject: "বাংলা", score: "9/10", date: "২ দিন আগে" },
    ];

    const recommended = [
        "গণিত - অমৌলিক সংখ্যা",
        "বিজ্ঞান - পদার্থ ও শক্তি",
        "ইংরেজি - Sentence Correction",
    ];

    const links = [
        { title: "প্রশ্নব্যাংক", icon: BookOpenCheck, color: "bg-[#DFF3FD]", href: "/question-bank" },
        { title: "প্রাকটিস প্রশ্ন", icon: ListChecks, color: "bg-[#FFF3C7]", href: "/practice" },
        { title: "Quick Practice", icon: Bot, color: "bg-[#DAF7DC]", href: "/quick-practice" },
        { title: "Mock Test", icon: Trophy, color: "bg-[#FFD6D6]", href: "/mock-test" },
    ];

    function getLeagueTitleByXP(xp: number) {
        if (xp >= 2000) return "💎 ডায়মন্ড";
        if (xp >= 1500) return "🔷 প্লাটিনাম";
        if (xp >= 1000) return "🥇 গোল্ড";
        if (xp >= 500) return "🥈 সিলভার";
        return "🥉 ব্রোঞ্জ";
    }






    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-6 gap-6 bg-gradient-to-r from-white via-indigo-100 to-white min-h-screen">
            {/* Left Main Content */}
            <div className="lg:col-span-4 space-y-6">
                {/* Navigation Cards */}
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                    {links.map(({ title, icon: Icon, color, href }, index) => (
                        <Link key={index} href={href}>
                            <Card className={`h-32 ${color} hover:scale-105 transition-transform cursor-pointer shadow-md`}>
                                <CardContent className="p-4 flex flex-col items-start justify-between h-full">
                                    <Icon className="w-8 h-8 text-gray-700" />
                                    <h3 className="text-lg font-semibold text-gray-800 mt-2">{title}</h3>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Daily Goal */}
                <Card className="shadow-lg">
                    <CardContent className="p-5">
                        <h2 className="text-xl font-bold mb-2">🎯 আজকের লক্ষ্য</h2>
                        <p className="text-base">গণিত অধ্যায়ের ১০টি প্রশ্ন সমাধান করুন এবং ৫০ XP অর্জন করুন!</p>
                        <div className="mt-3 bg-green-200 h-3 w-full rounded-full">
                            <div className="bg-green-500 h-3 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                        <p className="text-sm text-right mt-1 text-muted-foreground">40% সম্পন্ন</p>
                    </CardContent>
                </Card>

                {/* Recommended Subjects */}
                <Card className="shadow-lg">
                    <CardContent className="p-5">
                        <h2 className="text-xl font-bold mb-4">🎯 সাজেস্টেড টেস্ট</h2>
                        <ul className="list-disc ml-5 space-y-2">
                            {recommended.map((topic, idx) => (
                                <li key={idx} className="text-sm">{topic}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* Right Side Info Panel */}
            <div className="lg:col-span-2 space-y-6">
                {/* XP & Streak Tracker */}
                <div className="bg-white rounded-xl p-4 shadow-md">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Flame className="text-orange-500" />
                            <span className="font-semibold text-base">4 দিন স্ট্রিক</span>
                        </div>
                        <p className="text-sm">XP: <span className="font-bold">3870</span></p>
                    </div>
                </div>

                {/* Topic Progress */}
                <Card className="shadow-lg">
                    <CardContent className="p-5">
                        <h2 className="text-xl font-bold mb-2">📘 বিষয়ভিত্তিক অগ্রগতি</h2>
                        <div className="space-y-2">
                            <div>
                                <p className="font-medium">গণিত - 70%</p>
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: "70%" }}></div>
                                </div>
                            </div>
                            <div>
                                <p className="font-medium">বাংলা - 40%</p>
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <div className="h-2 bg-pink-500 rounded-full" style={{ width: "40%" }}></div>
                                </div>
                            </div>
                            <div>
                                <p className="font-medium">বিজ্ঞান - 10%</p>
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "10%" }}></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg lg:row-span-2">
                    <CardContent className="p-5">
                        <h2 className="text-xl font-bold mb-4">🏆 লিডারবোর্ড</h2>
                        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                            {leaderboard.map((user) => (
                                <div
                                    key={user.rank}
                                    className="flex items-center justify-between px-2 py-1 border-b"
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-base">
                                                #{user.rank} {user.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">XP: {user.xp}</p>
                                        </div>
                                    </div>

                                    {user.rank <= 3 ? (
                                        <Badge className="text-sm px-2 py-1 min-w-[100px] text-center">
                                            {user.badge}
                                        </Badge>
                                    ) : (
                                        <Badge className="text-xs px-2 py-1 min-w-[80px] bg-gray-200 text-gray-800 font-semibold">
                                            {getLeagueTitleByXP(user.xp)}
                                        </Badge>
                                    )}

                                </div>
                            ))}
                        </div>

                        <Button className="w-full mt-4" variant="outline" asChild>
                            <Link href="/leaderboard">
                                <div className="flex items-center justify-center gap-1">
                                    বিস্তারিত দেখুন <ArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                        </Button>
                    </CardContent>
                </Card>



                {/* Recent Test Results */}
                <Card className="shadow-lg">
                    <CardContent className="p-5">
                        <h2 className="text-xl font-bold mb-4">📊 সাম্প্রতিক টেস্ট</h2>
                        {recentTests.map((test, idx) => (
                            <div key={idx} className="mb-4">
                                <p className="text-base font-medium">{test.subject}</p>
                                <p className="text-sm text-muted-foreground">
                                    স্কোর: {test.score} ({test.date})
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );

};

export default AcademyQuizDashboardPage;