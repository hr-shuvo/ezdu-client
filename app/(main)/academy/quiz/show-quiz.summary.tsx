'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSecure } from "@/context/SecureContext";
import { ArrowLeft, BookOpenText, Flame, Lightbulb, ListChecks } from "lucide-react";
import { useState } from "react";



type Props = {
    lessons: any[]
    onBack: (data: 'topic') => void;
    onStart: (type: "cq" | "mcq", duration: number) => void;
    onCancel: () => void;
};

export const ShowQuizSummary = ({ lessons, onBack, onStart, onCancel }: Props) => {
    const { isLoggedIn } = useSecure();
    const [quizType, setQuizType] = useState<'mcq' | 'cq'>('mcq');
    const [quizDuration, setQuizDuration] = useState<number>(15);
    const durationOptions = [15, 20, 30, 35, 40];



    return (

        <div className="lg:px-6 my-5">

            <div className="bg-gradient-to-r from-blue-50 to-indigo-200 rounded-2xl p-6 shadow-sm border border-blue-100">
                <div className="flex items-center gap-4 mb-4">
                    <Flame className="w-10 h-10 text-blue-600" />
                    <h1 className="text-3xl font-extrabold text-blue-700">Power Up Your Learning Streak!</h1>
                </div>
                <p className="text-base font-medium text-blue-700 flex items-center gap-4">
                    Review your lessons and crush it!
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                    <Button variant="primary">Explore All</Button>
                    <Button variant="secondary"> Quizzes</Button>
                    <Button variant="super">Top Notes</Button>
                </div>

            </div>



            <div className="relative py-6">

                <div >

                    <div className="flex flex-col sm:flex-row justify-between items-center  py-4  mb-4 border-b gap-4 sm:gap-0">

                        <div className="flex items-center gap-4 flex-shrink-0">
                            {/* Back Button */}
                            <Button variant="ghost" onClick={() => onBack('topic')} className="flex items-center gap-2 text-blue-500 hover:text-blue-800">
                                <ArrowLeft className="w-6 h-6" />
                                <span className="text-base font-medium">Back</span>
                            </Button>

                            {/* Title */}
                            <div className="flex items-center gap-3">
                                <ListChecks className="w-7 h-7 text-blue-500" />
                                <h3 className="text-xl font-extrabold tracking-tight text-blue-700">
                                    Your Selected Lessons
                                </h3>
                            </div>
                        </div>


                        {/* Clock & Select */}
                        <div className="flex items-center gap-2 justify-end w-full">
                            {/* Select List for Quiz Type */}
                            <div className="flex flex-col gap-1 w-full md:w-[120px]">
                                <label className="text-sm font-medium text-blue-800">🎯 Quiz Type</label>
                                <Select
                                    value={quizType}
                                    onValueChange={(val: 'mcq' | 'cq') => setQuizType(val)}
                                >
                                    <SelectTrigger className="rounded-xl border border-blue-300 text-blue-800 font-semibold shadow-sm focus:ring-blue-400">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mcq">MCQ</SelectItem>
                                        <SelectItem value="cq">CQ</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Duration Clock */}
                            <div className="flex flex-col gap-1 w-full md:w-40">
                                <label className="text-sm font-medium text-blue-800">⏱ Duration (minutes)</label>
                                <Select
                                    value={quizDuration.toString()}
                                    onValueChange={(val) => setQuizDuration(Number(val))}
                                >
                                    <SelectTrigger className="rounded-xl border border-blue-300 text-blue-800 font-semibold shadow-sm focus:ring-blue-400">
                                        <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {durationOptions.map((min) => (
                                            <SelectItem key={min} value={min.toString()}>
                                                {min} minutes
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                    </div>

                </div>


                <div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                        {lessons.length > 0 ? (
                            lessons.map((lesson) => (
                                <Card
                                    key={lesson._id}
                                    className="rounded-2xl shadow-md border border-blue-100 bg-white hover:shadow-lg transition"
                                >
                                    <CardContent className="p-5 flex flex-col gap-2">
                                        <div className="text-blue-900 font-semibold text-lg flex items-center gap-2">
                                            <BookOpenText className="w-5 h-5 text-blue-800" />
                                            <span>{lesson.title}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center col-span-full">No lessons selected.</p>
                        )}
                    </ul>
                </div>


                <div className="mt-8">
                    <div className="mt-8 w-full gap-2 flex flex-col md:flex-row">
                        <Button variant={'default'} size={'lg'} className="w-full md:w-1/2 font-bold" onClick={() => onCancel}>Cancel</Button>
                        <Button variant={'secondary'} size={'lg'} className="w-full md:w-1/2 font-bold" onClick={() => onStart(quizType, quizDuration)}>
                            {
                                isLoggedIn ? (
                                    <>
                                        <Lightbulb /> Start Quiz
                                    </>
                                ) : (
                                    <>
                                        Please login to <Lightbulb />  Start Quiz
                                    </>

                                )
                            }
                        </Button>
                    </div>

                </div>





            </div>



        </div>
    )
}