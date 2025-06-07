'use client';

import { useEffect, useState, useTransition } from "react";
import { RecentTest } from "../_components/recent-test";
import { StreakCount } from "../_components/streak-count";
import { SubjectProgress } from "../_components/subject-progress";
import { loadAcademicClass } from "@/app/_services/academy/academyService";
import { loadAcademicSubject } from "@/app/_services/academy/academySubjectService";
import { loadAcademicLesson } from "@/app/_services/academy/academyLessonService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";


const AcademyQuizPage = () => {
    const [isPending, startTransition] = useTransition();


    const [classId, setClassId] = useState('');
    const [classes, setClasses] = useState<any>([]);
    const [subjectId, setSubjectId] = useState<any>('');
    const [subjects, setSubjects] = useState<any>([]);
    const [lessons, setLessons] = useState<any>([]);

    const [selectedLessons, setSelectedLessons] = useState<string[]>([]);

    const handleToggleChange = (values: string[]) => {
        setSelectedLessons(values);
    }

    useEffect(() => {
    }, [selectedLessons]);

    useEffect(() => {
        startTransition(async () => {
            const _classes = await loadAcademicClass(1, 1000);
            setClasses(_classes.data);
        });
    }, []);

    useEffect(() => {
        setLessons([]);

        startTransition(async () => {
            const response = await loadAcademicSubject(null!, 1, 1000, classId);
            setSubjects(response.data);
        })
    }, [classId]);


    useEffect(() => {
        if (subjectId && subjectId != "") {
            startTransition(async () => {
                const response = await loadAcademicLesson(1, 1000, subjectId);
                setLessons(response.data);
            })
        } else {
            setLessons([]);
        }

    }, [subjectId]);


    function startQuiz(): void {
        console.log('start quiz with: ', selectedLessons)
    }

    return (
        <>
            <div className="px-6 my-5">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-200 rounded-2xl p-6 shadow-sm border border-blue-100">
                    {/* Title & Description */}
                    <h1 className="text-3xl font-extrabold text-blue-700">Let’s Get Quizzing!</h1>

                    <p className="mt-2 text-blue-800 text-base">
                        Pick your class and subject, then choose lessons to unlock your quiz path.
                    </p>

                    {/* Duolingo-style Breadcrumb Steps */}
                    <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-blue-700">
                        <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs font-bold">1</span>
                            Class
                        </span>
                        <span className="text-blue-400">➜</span>

                        <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs font-bold">2</span>
                            Subject
                        </span>
                        <span className="text-blue-400">➜</span>

                        <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs font-bold">3</span>
                            Lessons
                        </span>
                        <span className="text-blue-400">➜</span>

                        <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs font-bold">4</span>
                            Quiz
                        </span>
                    </div>
                </div>
            </div>


            <div className="p-6 grid grid-cols-1 lg:grid-cols-6 gap-6 bg-gradient-to-r from-white via-indigo-100 to-white min-h-screen">

                <div className="lg:col-span-4 space-y-6">

                    <div className="flex items-center py-4 gap-5">
                        <div className='flex flex-row gap-2'>
                            {/*<Label>Level</Label>*/}
                            <Select onValueChange={(data) => {
                                if (data && data !== 'all') {
                                    setClassId(data)
                                } else {
                                    setClassId(null!);
                                }
                            }}>
                                <SelectTrigger className={'w-full min-w-[200px]'}>
                                    <SelectValue placeholder='Choose Class' />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value={'all'}>All Class</SelectItem>
                                    {classes.map((item: { _id: string, title: string }) => (
                                        <SelectItem value={item._id} key={item._id}>{item.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='flex flex-row gap-2'>
                            {/*<Label>Level</Label>*/}
                            <Select onValueChange={(data) => {
                                if (data && data !== 'all') {
                                    setSubjectId(data)
                                } else {
                                    setSubjectId(null!)
                                }
                            }}>
                                <SelectTrigger className={'w-full min-w-[200px]'}>
                                    <SelectValue placeholder='Choose Subject' />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value={'all'}>All Subject</SelectItem>
                                    {subjects.map((item: { _id: string, title: string }) => (
                                        <SelectItem value={item._id} key={item._id}>{item.title}</SelectItem>
                                    ))}
                                </SelectContent>

                            </Select>
                        </div>

                    </div>

                    <div className="min-h-[250px] flex items-center justify-center">

                        {
                            lessons.length > 0 ? (
                                <div>
                                    <ToggleGroup
                                        variant="primary"
                                        type="multiple"
                                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                        onValueChange={handleToggleChange}
                                        value={selectedLessons}
                                        disabled={isPending}
                                    >
                                        {
                                            lessons.map((item: { _id: string, title: string }, index: number) => (
                                                <ToggleGroupItem
                                                    key={index}
                                                    value={item._id}
                                                    aria-label={`Toggle ${item._id}`}
                                                    className="w-full min-h-[120px] p-6 text-lg font-semibold border border-b-4 rounded-xl hover:bg-gray-200 hover:text-gray-900 data-[state=on]:bg-blue-400 data-[state=on]:text-white transition-all"

                                                >
                                                    <h1 className='font-bold'>{item.title}</h1>
                                                </ToggleGroupItem>

                                            ))
                                        }

                                    </ToggleGroup>
                                </div>
                            ) : (
                                <div className="flex items-center gap-6 p-10 bg-blue-50 rounded-2xl shadow-md text-blue-700 text-2xl font-semibold max-w-xl mx-auto">
                                    <Info className="text-blue-600 w-12 h-12 flex-shrink-0" />
                                    <span>Please choose a subject to continue</span>
                                </div>
                            )
                        }


                    </div>

                    <div className="mt-8">
                        <Button variant={'primary'} size={'lg'} className="w-full font-bold" onClick={startQuiz}>Start Quiz</Button>
                    </div>


                </div>


                <div className="lg:col-span-2 space-y-6">
                    <StreakCount count={4} xp={2318} />

                    <SubjectProgress />

                    <RecentTest />

                </div>
            </div>


        </>
    )





};

export default AcademyQuizPage;