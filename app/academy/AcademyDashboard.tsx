'use client';

import { LeaderboardSummary } from "@/components/layout/leaderboard/leaderboard-summary";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BookOpenCheck, Bot, ListChecks, Trophy } from "lucide-react";
import Link from "next/link";
import { StreakCount } from "./_components/streak-count";
import { SubjectProgress } from "./_components/subject-progress";
import { RecentTest } from "./_components/recent-test";
import { useSecure } from "@/context/SecureContext";
import { useEffect, useState, useTransition } from "react";
import { getAcademyProgress } from "../_services/academy/academyProgressService";
import XpWeeklyChart from "./_components/xp-graph";
import Loading from "../(main)/learn/loading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const AcademyDashboard = () => {
    const { isLoggedIn } = useSecure();
    const [isPending, startTransition] = useTransition();
    const [progress, setProgress] = useState<any>();
    const [totalWeekXp, setTotalWeekXp] = useState<number>(0);

    const recommended = [
        "গণিত - অমৌলিক সংখ্যা",
        "বিজ্ঞান - পদার্থ ও শক্তি",
        "ইংরেজি - Sentence Correction",
    ];

    const links = [
        { title: "Mock / Quiz", icon: Trophy, color: "bg-[#DFF3FD]", href: "./academy/quiz" },
        { title: "বই রিভিউ", icon: BookOpenCheck, color: "bg-[#FFF3C7]", href: "./academy/subjects" },
        { title: "প্রাকটিস প্রশ্ন", icon: ListChecks, color: "bg-[#DAF7DC]", href: "./academy/practice" },
        { title: "প্রশ্নব্যাংক", icon: Bot, color: "bg-[#FFD6D6]", href: "./academy/qb" },
    ];

    useEffect(() => {
        if (isLoggedIn) {

            startTransition(async () => {
                const _progress = await getAcademyProgress();
                // console.log('progress: ', _progress.data);
                setProgress(_progress.data);

                const _xp = _progress.data.lastWeekXp.reduce((sum: number, item: any) => sum + item.xp, 0);
                setTotalWeekXp(_xp);
            })
        }

    }, [isLoggedIn]);


    if (isPending) {
        return <Loading />
    }


    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-6 gap-6">
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

                <Card>
                    <CardContent>
                        <div className="py-4">
                            <div className="flex justify-end mb-4">
                                <p className="text-xl">week XP : <span className="font-bold">{totalWeekXp.toFixed(0)}</span></p>
                            </div>

                            <XpWeeklyChart xpData={progress?.lastWeekXp} />
                        </div>

                        {
                            !isLoggedIn && (
                                <>
                                    <div className="flex gap-2">
                                        <Link
                                            href="/auth/login"
                                            className="text-indigo-600 font-semibold hover:underline"
                                        >
                                            Login or Sign up to unlock all features!
                                        </Link>
                                        <p>& Track your progress like this</p>
                                    </div>
                                </>
                            )
                        }

                    </CardContent>
                </Card>

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

                <div>
                    <div>
                        <h2 className="text-xl font-bold mb-4"> আজকের ছোট শুরু, আগামীর বড় সাফল্য</h2>

                    </div>
                    <Card>
                        <CardTitle>
                        </CardTitle>
                        <CardContent>
                            <Accordion
                                type="single"
                                className="w-full"
                                defaultValue={"0"}

                            >
                                <AccordionItem value={"0"}>
                                    <AccordionTrigger>পাঠ্যবইভিত্তিক অধ্যায়ভিত্তিক শেখা</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="list-disc ps-5 space-y-2 text-sm text-muted-foreground">
                                            <li>
                                                ক্লাস ৬-১০ এর জাতীয় শিক্ষাক্রম অনুযায়ী সাজানো অধ্যায়ভিত্তিক লেসন।
                                            </li>
                                            <li>
                                                প্রতিটি অধ্যায়ে সহজ ভাষায় ব্যাখ্যা, সংক্ষিপ্ত টিপস এবং উদাহরণসহ ব্যাখ্যা।
                                            </li>
                                            <li>
                                                ছাত্রছাত্রীরা নিজের গতিতে অধ্যায়গুলো পড়তে পারবে।
                                            </li>
                                        </ul>
                                    </AccordionContent>

                                </AccordionItem>
                                <AccordionItem value={"1"}>
                                    <AccordionTrigger>নিয়মিত কুইজ ও শেখার অগ্রগতি বুঝে এগিয়ে যাওয়ার সুবিধা</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="list-disc ps-5 space-y-1 text-sm text-muted-foreground">
                                            <li>
                                                প্রতিটি অধ্যায়ের শেষে ছোট কুইজ ও মডেল প্রশ্ন, যাতে শেখা যাচাই করা যায়।
                                            </li>
                                            <li>
                                                শিক্ষার্থী বুঝতে পারে কোন অধ্যায় সে ভালো শিখেছে, আর কোথায় আরও চর্চা প্রয়োজন।
                                            </li>
                                            <li>
                                                ব্যক্তিগত ড্যাশবোর্ডে অধ্যায় ও বিষয়ভিত্তিক অগ্রগতি দেখা যায়।
                                            </li>
                                        </ul>

                                    </AccordionContent>

                                </AccordionItem>
                                <AccordionItem value={"2"}>
                                    <AccordionTrigger>ব্যক্তিগত শেখার পথচিত্র ও অগ্রগতি বিশ্লেষণ</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="list-disc ps-5 space-y-1 text-sm text-muted-foreground">
                                            <li>
                                                প্রতিটি শিক্ষার্থীর জন্য তৈরি হয় আলাদা শেখার রোডম্যাপ।
                                            </li>
                                            <li>
                                                কুইজ, প্র্যাকটিস, ও অধ্যায়ভিত্তিক অগ্রগতি ডেটা বিশ্লেষণ করে ছাত্রকে সঠিক দিকনির্দেশনা দেওয়া হয়
                                            </li>
                                            <li>
                                                দুর্বল জায়গাগুলো হাইলাইট করে targeted চর্চার সুযোগ তৈরি হয়।
                                            </li>
                                        </ul>

                                    </AccordionContent>

                                </AccordionItem>

                            </Accordion>

                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Right Side Info Panel */}
            <div className="lg:col-span-2 space-y-6">
                {/* XP & Streak Tracker */}
                {
                    isLoggedIn && (
                        <StreakCount />
                    )
                }

                {/* Topic Progress */}
                {
                    isLoggedIn && (
                        <SubjectProgress />
                    )
                }

                <LeaderboardSummary />


                <RecentTest />



                {/* Recent Test Results */}

            </div>
        </div>
    );

}

export default AcademyDashboard;