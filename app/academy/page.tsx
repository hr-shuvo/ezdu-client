'use client';


import { LeaderboardSummary } from "@/components/layout/leaderboard/leaderboard-summary";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpenCheck, Bot, Flame, ListChecks, Trophy } from "lucide-react";
import Link from "next/link";



const AcademyDashboard = () => {
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
        { title: "Mock / Quiz", icon: Trophy, color: "bg-[#DFF3FD]", href: "./academy/mock" },
        { title: "বই রিভিউ", icon: BookOpenCheck, color: "bg-[#FFF3C7]", href: "./academy/subjects" },
        { title: "প্রাকটিস প্রশ্ন", icon: ListChecks, color: "bg-[#DAF7DC]", href: "./academy/practice" },
        { title: "প্রশ্নব্যাংক", icon: Bot, color: "bg-[#FFD6D6]", href: "./academy/qb" },
    ];




    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-6 gap-6 bg-gradient-to-r from-white via-indigo-100 to-white min-h-screen">
            <div className="lg:col-span-4 space-y-6">
                
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

                <LeaderboardSummary />



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

}

export default AcademyDashboard;