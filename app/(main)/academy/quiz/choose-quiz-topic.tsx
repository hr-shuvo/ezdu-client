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
import { useSecure } from "@/context/SecureContext";

type Props = {
    onClickItem: (data: 'summary' | 'cancel', subjectId: string, lessons: []) => void;
};

const steps = [
    'Class', 'Subject', 'Lessons', 'Quiz',
];

export const ChooseQuizTopic = ({onClickItem}: Props) => {
    const [isPending, startTransition] = useTransition();
    const {user} = useSecure();

    const [classId, setClassId] = useState('');
    const [classes, setClasses] = useState<any>([]);
    const [subjectId, setSubjectId] = useState<any>('');
    const [subjects, setSubjects] = useState<any>([]);
    const [lessons, setLessons] = useState<any>([]);

    const [selectedLessons, setSelectedLessons] = useState<any>();
    const [selectedLessonIds, setSelectedLessonIds] = useState<string[]>([]);

    const handleToggleChange = (values: string[]) => {
        setSelectedLessonIds(values);
    }

    useEffect(() => {
        const _lessons = lessons.filter((lesson: any) => {
                return selectedLessonIds.includes(lesson._id);
            }
        );

        setSelectedLessons(_lessons);
    }, [selectedLessonIds, lessons]);

    useEffect(() => {
        startTransition(async () => {
            const _classes = await loadAcademicClass(1, 1000);
            setClasses(_classes.data);
        });
    }, []);

    useEffect(() => {
        setLessons([]);

        const _classId = user?.userType?.classId ?? classId;

        startTransition(async () => {
            const response = await loadAcademicSubject(null!, 1, 1000, _classId);
            setSubjects(response.data);
        })
    }, [classId]);

    useEffect(() => {
        if (subjectId && subjectId != "") {
            startTransition(async () => {
                const response = await loadAcademicLesson(1, 1000, subjectId, false);
                setLessons(response.data);
            })
        } else {
            setLessons([]);
        }

    }, [subjectId]);


    return (
        <>
            <div className="lg:px-6">
                <div
                    className="bg-gradient-to-r from-sky-50 to-indigo-200 rounded-2xl p-4 lg:p-6 shadow-sm border border-sky-100
                    dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 dark:shadow-md">

                    <h1 className="lg:text-3xl font-extrabold text-sky-700 dark:text-sky-300">Let’s Get Quizzing!</h1>

                    <h2 className="text-xs lg:text-base mt-2 text-sky-800dark:text-sky-300">
                        Pick your class and subject, then choose lessons to unlock your quiz path.
                    </h2>

                    {/* Duolingo-style Breadcrumb Steps */}
                    <div
                        className="mt-5 flex flex-wrap items-center gap-1 lg:gap-3 text-sm font-semibold text-sky-700 dark:text-sky-300">

                        {
                            steps.map((step, index) => (
                                <>
                                    {
                                        index > 0 && (
                                            <span className="text-sky-400">➜</span>
                                        )
                                    }

                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-sky-400 text-white flex items-center justify-center text-xs font-bold">{index+1}</span> {step}
                                    </span>
                                </>
                            ))
                        }

                    </div>
                </div>
            </div>


            <div className="lg:p-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-6">

                <div className="lg:col-span-4 space-y-2 mt-2">

                    <div className="flex flex-col sm:flex-row items-center gap-2">

                        {
                            !user?.userType?.classId && (
                                <>
                                    <div className='flex flex-row gap-2 w-full'>
                                        {/*<Label>Level</Label>*/}
                                        <Select onValueChange={(data) => {
                                            if (data && data !== 'all') {
                                                setClassId(data)
                                            } else {
                                                setClassId(null!);
                                            }
                                        }}>
                                            <SelectTrigger className={'w-full lg:min-w-[200px]'}>
                                                <SelectValue placeholder='Choose Class'/>
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value={'all'}>All Class</SelectItem>
                                                {classes.map((item: { _id: string, title: string }) => (
                                                    <SelectItem value={item._id} key={item._id}>{item.title}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            )
                        }

                        <div className='flex flex-row gap-2 w-full'>
                            {/*<Label>Level</Label>*/}
                            <Select onValueChange={(data) => {
                                if (data && data !== 'all') {
                                    setSubjectId(data)
                                } else {
                                    setSubjectId(null!)
                                }
                            }}>
                                <SelectTrigger className={'w-full lg:min-w-[200px]'}>
                                    <SelectValue placeholder='Choose Subject'/>
                                </SelectTrigger>

                                <SelectContent>
                                    {/*<SelectItem value={'all'}>All Subject</SelectItem>*/}
                                    {subjects.map((item: { _id: string, title: string }) => (
                                        <SelectItem value={item._id} key={item._id}>{item.title}</SelectItem>
                                    ))}
                                </SelectContent>

                            </Select>
                        </div>


                    </div>

                    <div>
                        {
                            subjectId && (
                                <>
                                    <div className={"font-bold min-w-[200px]"}>
                                        {
                                            selectedLessonIds.length > 0 ? (
                                                <>
                                                    <div>তুমি {selectedLessonIds.length} টি লেসন সিলেক্ট করেছো</div>
                                                </>
                                            ) : (
                                                <>
                                                    <div>তুমি কোনো লেসন সিলেক্ট করো নি</div>
                                                </>
                                            )
                                        }

                                    </div>
                                </>
                            )
                        }
                    </div>

                    <div className="min-h-[250px] flex items-center justify-center">

                        {
                            lessons.length > 0 ? (
                                <div>
                                    <ToggleGroup
                                        variant="primary"
                                        type="multiple"
                                        className="grid grid-cols-2 md:grid-cols-3 gap-4"
                                        onValueChange={handleToggleChange}
                                        value={selectedLessonIds}
                                        disabled={isPending}
                                    >
                                        {
                                            lessons.map((item: { _id: string, title: string }, index: number) => (
                                                <ToggleGroupItem
                                                    key={index}
                                                    value={item._id}
                                                    aria-label={`Toggle ${item._id}`}
                                                    className="w-full lg:min-h-[120px] p-6 text-sm lg:text-lg font-semibold border border-b-4 rounded-xl hover:bg-gray-200 hover:text-gray-900 data-[state=on]:bg-sky-400 data-[state=on]:text-white transition-all"

                                                >
                                                    <h3 className='font-bold'>{item.title}</h3>
                                                </ToggleGroupItem>

                                            ))
                                        }

                                    </ToggleGroup>
                                </div>
                            ) : (
                                <div
                                    className="flex items-center gap-6 p-10 bg-sky-50  dark:bg-gray-900 rounded-2xl shadow-md text-sky-700 dark:text-sky-300 text-2xl font-semibold max-w-xl mx-auto">
                                    <Info className="text-sky-600 dark:text-sky-300 w-12 h-12 flex-shrink-0"/>
                                    <span>Please choose a subject to continue</span>
                                </div>
                            )
                        }


                    </div>

                    <div className="mt-8 w-full gap-2 flex flex-col lg:flex-row">
                        <Button variant={'default'} size={'lg'} className="w-full lg:w-1/2 font-bold"
                                onClick={() => onClickItem('cancel', subjectId, [])}>Cancel</Button>
                        <Button
                            variant={'secondary'}
                            size={'lg'} className="w-full lg:w-1/2 font-bold"
                            onClick={() => onClickItem('summary', subjectId, selectedLessons)}
                            disabled={!lessons.length || !selectedLessonIds.length}
                        >Confirm</Button>
                    </div>


                </div>


                <div className="lg:col-span-2 space-y-4">
                    <StreakCount/>

                    <SubjectProgress/>

                    <RecentTest/>

                </div>
            </div>


        </>
    )

}

