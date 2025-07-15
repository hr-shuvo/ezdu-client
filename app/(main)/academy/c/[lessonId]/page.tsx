'use client';

import Loading from "@/app/(voclift)/learn/loading";
import { getAcademicLesson, loadAcademicLessonContent } from "@/app/_services/academy/academyLessonContentService";
import { loadAcademicLesson } from "@/app/_services/academy/academyLessonService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { RenderMath } from "@/components/common/render-math";

const AcademyContentDetailsPage = () => {
    const params = useParams();
    const [isPending, startTransition] = useTransition();

    const [lesson, setLesson] = useState<any>();
    const [lessons, setLessons] = useState<any[]>([]);
    const [contents, setContents] = useState<any[]>([]);

    useEffect(() => {
        const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;

        startTransition(async () => {
            const _lesson = await getAcademicLesson(lessonId);
            setLesson(_lesson)
            const _lessons = await loadAcademicLesson(1, 1000, _lesson.subjectId, false);
            const _contents = await loadAcademicLessonContent(1, 1000, lessonId);
            setLessons(_lessons.data);
            setContents(_contents.data);
        });

    }, [])



    if (isPending) {
        return <Loading />
    }

    return (
        <>

            <div className="px-6 my-5">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-200 rounded-xl p-6 shadow-sm border border-blue-100
                dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 dark:shadow-md">
                    <h1 className="text-3xl font-bold text-sky-800 dark:text-sky-400">{lesson?.title}</h1>

                    <p className="mt-3 text-gray-700 dark:text-sky-300">
                        Ready to test your knowledge? Try the quiz or explore more materials below!
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <Button variant={'primary'}>
                            Take Quiz
                        </Button>
                        <Button variant={'secondary'}>
                            View More MCQs
                        </Button>
                        <Button variant={'super'}>
                            Download Notes
                        </Button>
                    </div>
                </div>
            </div>

            <div className="lg:px-6">


                <div className="flex flex-col md:flex-row gap-2">

                    <div className="md:w-1/5 w-full">
                        <div className="mt-2">
                            <Card>
                                <CardTitle><div className="m-3 text-center">
                                    <h1 className="text-2xl font-bold border-b">More</h1>
                                </div>

                                </CardTitle>
                                <CardContent>
                                    {lessons.length > 0 &&
                                        lessons.map((item: { _id: string, title: string }, index: number) => (

                                            <div className="flex flex-col gap-2 mb-2 hover:border-b-4" key={index}>

                                                <div className="flex item-center justify-between">
                                                    <Link href={`./${item._id}`} className="p-2">
                                                        <h1 className='text-xl'>{item.title}</h1>
                                                    </Link>

                                                </div>
                                            </div>
                                        ))
                                    }

                                </CardContent>

                            </Card>

                        </div>

                    </div>

                    <div className="md:w-3/5 w-full">
                        {
                            contents.map((data: any, index: number) => (

                                <div className="mt-2" key={index}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                <h1>{data.title}</h1>
                                            </CardTitle>
                                            <CardDescription>
                                                <h1>{data.subTitle}</h1>
                                            </CardDescription>
                                        </CardHeader>



                                        <CardContent>
                                            <CardDescription>
                                                <RenderMath html={data.description}/>
                                            </CardDescription>
                                        </CardContent>

                                        {
                                            data.content && (
                                                <CardContent>
                                                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                                                </CardContent>

                                            )
                                        }



                                        {/* <CardContent>
                                            <div className="flex flex-col w-full">
                                                {
                                                    data.text1 && (
                                                        <div>
                                                            {data.text1}
                                                        </div>)

                                                }
                                                {
                                                    data.text2 && (
                                                        <div>
                                                            {data.text2}
                                                        </div>)

                                                }
                                            </div>
                                        </CardContent> */}

                                        <CardFooter>
                                            <Link href={`./mcq?l=${lesson._id}&s=${lesson.subjectId}`}><Button variant='primaryOutline' size={'xsm'}>MCQ</Button></Link>
                                            <Link href={`#`}><Button variant='superOutline' size={'xsm'}>Board Question</Button></Link>
                                        </CardFooter>
                                    </Card>
                                </div>
                            ))
                        }


                    </div>

                    <div className="md:w-1/5 w-full">
                        <div className="mt-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <div className="text-center">
                                            Practice Book
                                        </div>
                                    </CardTitle>
                                    <CardDescription>
                                        <p>practice MCQ & questions</p>
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                </CardContent>
                                <CardFooter>
                                    <Link href={`./mcq?l=${lesson?._id}&s=${lesson?.subjectId}`}  className="w-full">
                                        <Button variant={'primary'}  className="w-full">Solve</Button>
                                    </Link>
                                </CardFooter>

                            </Card>
                        </div>

                        <div className="mt-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <div className="text-center">
                                            Practice More
                                        </div>
                                    </CardTitle>
                                    <CardDescription>
                                        <p>more related MCQ & questions</p>
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>

                                </CardContent>

                                <CardFooter>
                                    <Button variant={'secondary'} className="w-full">Go.</Button>
                                </CardFooter>

                            </Card>
                        </div>

                    </div>

                </div>
            </div>


        </>
    );
};

export default AcademyContentDetailsPage;