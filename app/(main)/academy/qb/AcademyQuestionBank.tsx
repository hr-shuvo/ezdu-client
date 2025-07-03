'use client';

import { loadAcademicSubject } from "@/app/_services/academy/academySubjectService";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Lightbulb, MoveRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { StreakCount } from "../_components/streak-count";
import { SubjectProgress } from "../_components/subject-progress";
import { RecentTest } from "../_components/recent-test";
import { useSecure } from "@/context/SecureContext";

const AcademyQuestionBank = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const { isLoggedIn } = useSecure();

    const [subjectId, setSubjectId] = useState<any>('');
    const [subjects, setSubjects] = useState<any>([]);

    useEffect(() => {
        const _subjectId = searchParams.get("s");
        if (_subjectId) {
            setSubjectId(_subjectId);
        }
        startTransition(async () => {
            const _subjects = await loadAcademicSubject('', 1, 10);
            setSubjects(_subjects.data);
        })
    }, [])

    useEffect(() => {
        if (!subjectId) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("s", subjectId); // s = subjectId

        router.replace(`?${params.toString()}`);
    }, [subjectId])



    return (
        <>
            <div className="px-6 my-5">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-200 rounded-2xl p-6 shadow-sm border border-blue-100">
                    {/* Title & Description */}
                    <h1 className="text-3xl font-extrabold text-blue-700">Question Bank</h1>

                    <p className="mt-2 text-blue-800 text-base">
                        Choose Subject to Practice – SSC, HSC, Class 6–10
                    </p>

                    {/* Duolingo-style Breadcrumb Steps */}
                    <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-blue-700">
                        <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs font-bold">1</span>
                            Choose Subject
                        </span>
                        <span className="text-blue-400">➜</span>

                        <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs font-bold">2</span>
                            Select Board
                        </span>
                        <span className="text-blue-400">➜</span>


                        <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs font-bold">4</span>
                            Review Questions
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-6 gap-6">

                <div className="lg:col-span-4 space-y-6">

                    <div className="flex gap-2 w-full">
                        <Link href={`./quiz/${subjectId}`} className="w-1/2">
                            <Button variant="secondary" size="lg" className="w-full font-bold">
                                Quiz <Lightbulb />
                            </Button>
                        </Link>

                        <Link href={`./qb/${subjectId}`} className="w-1/2">
                            <Button variant="primary" size="lg" className="w-full font-bold">
                                QB - Continue <MoveRight />
                            </Button>
                        </Link>
                    </div>


                    <div className="flex items-center justify-center">

                        <div>
                            <ToggleGroup
                                variant="primary"
                                type="single"
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                                onValueChange={(val) => setSubjectId(val)}
                                value={subjectId}
                                disabled={isPending}
                            >
                                {
                                    subjects.map((item: { _id: string, title: string }, index: number) => (
                                        <ToggleGroupItem
                                            key={index}
                                            value={item._id}
                                            aria-label={`Toggle ${item._id}`}
                                            className="w-full min-h-[110px] p-6 text-lg font-semibold border border-b-4 rounded-xl hover:bg-gray-200 hover:text-gray-900 data-[state=on]:bg-blue-400 data-[state=on]:text-white transition-all"

                                        >
                                            <h1 className='font-bold'>{item.title}</h1>
                                        </ToggleGroupItem>

                                    ))
                                }

                            </ToggleGroup>
                        </div>


                    </div>

                </div>


                <div className="lg:col-span-2 space-y-6">
                    {isLoggedIn && (
                        <>
                            <StreakCount />
                        </>
                    )}

                    <SubjectProgress />

                    <RecentTest />

                </div>


            </div>








        </>
    )
};

export default AcademyQuestionBank;