'use client';

import { useEffect, useState, useTransition } from "react";
import { loadAcademicClass } from "@/app/_services/academy/academyService";
import { loadAcademicSubject } from "@/app/_services/academy/academySubjectService";
import { useSecure } from "@/context/SecureContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { loadAcademicLesson } from "@/app/_services/academy/academyLessonService";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
    onClickItem: (data: 'start', subjectId: string, selectedLessonIds: string[]) => void;
};

const ChooseTopic = ({onClickItem}:Props) => {
    const {user} = useSecure();
    const [isPending, startTransition] = useTransition();
    const [classId, setClassId] = useState('');
    const [classes, setClasses] = useState<any>([]);
    const [subjectId, setSubjectId] = useState<any>('');
    const [subjects, setSubjects] = useState<any>([]);
    const [lessons, setLessons] = useState<any>([]);

    // const [selectedLessons, setSelectedLessons] = useState<any>();
    const [selectedLessonIds, setSelectedLessonIds] = useState<string[]>([]);

    const handleToggleChange = (values: string[]) => {
        setSelectedLessonIds(values);
    }

    // useEffect(() => {
    //     const _lessons = lessons.filter((lesson: any) => {
    //             return selectedLessonIds.includes(lesson._id);
    //         }
    //     );
    //
    //     setSelectedLessons(_lessons);
    // }, [selectedLessonIds, lessons]);

    useEffect(() => {
        startTransition(async () => {
            const _classes = await loadAcademicClass(1, 1000);
            setClasses(_classes.data);
        });
    }, []);

    useEffect(() => {

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
        <div className='grid grid-cols-1 lg:grid-cols-6 gap-4 p-4'>


            <div className='lg:col-span-4 space-y-2'>
                <div
                    className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600 shadow-sm">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-gray-600 text-blue-600 dark:text-blue-300 rounded-full">
                            <Info className="w-5 h-5"/>
                        </div>
                        <div>
                            <p className="text-sm text-gray-800 dark:text-gray-100 font-medium">
                                তুমি যেসব বিষয় এবং পাঠ ইতিমধ্যে পড়েছো, প্রশ্নগুলো সেগুলোর ভিত্তিতেই তৈরি হবে। তাই
                                ভালোভাবে রিভিউ করে নাও!
                            </p>
                        </div>
                    </div>
                </div>


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
                                        <SelectTrigger className={'w-full lg:min-w-[200px] dark:text-gray-200'}>
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
                            <SelectTrigger className={'w-full lg:min-w-[200px] dark:text-gray-200'}>
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
                                                className="w-full lg:min-h-[120px] p-6 text-sm lg:text-lg font-semibold border border-b-4 rounded-xl
  bg-white text-gray-800
  dark:bg-gray-700 dark:text-gray-200
  hover:bg-gray-100 hover:text-gray-900
  dark:hover:bg-gray-600 dark:hover:text-white
  data-[state=on]:bg-sky-500 data-[state=on]:text-white
  dark:data-[state=on]:bg-sky-500 dark:data-[state=on]:text-white
  transition-all"
                                            >
                                                <h3 className='font-bold'>{item.title}</h3>
                                            </ToggleGroupItem>

                                        ))
                                    }

                                </ToggleGroup>
                            </div>
                        ) : (
                            <div
                                className="flex items-center gap-6 p-10  rounded-2xl shadow-md text-blue-700 text-2xl font-semibold max-w-xl mx-auto">
                                <Info className="text-blue-600 w-12 h-12 flex-shrink-0"/>
                                <span>Please choose a subject to continue</span>
                            </div>
                        )
                    }


                </div>

                <div className="mt-8 w-full gap-2 flex flex-col lg:flex-row">

                    <Button variant={'default'} size={'lg'} className="w-full " asChild>
                        <Link href='/academy' className='lg:w-1/2 font-bold'>
                            Back to Academy
                        </Link>
                    </Button>


                    <Button
                        variant={'secondary'}
                        size={'lg'} className="w-full lg:w-1/2 font-bold"
                        onClick={() => onClickItem('start', subjectId, selectedLessonIds)}
                        disabled={!lessons.length || !selectedLessonIds.length}
                    >Confirm</Button>
                </div>


            </div>

            <div className='lg:col-span-2 space-y-2'>
                right side content

            </div>


        </div>
    )
}
export default ChooseTopic;