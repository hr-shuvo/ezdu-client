'use client'

import { useState, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookCopy, BookOpen, CheckCircle, Clock, Flag, Lightbulb, ListChecks, Star } from 'lucide-react';
import Link from 'next/link';
import Loading from '@/app/(voclift)/learn/loading';
import { loadAcademicLesson } from '@/app/_services/academy/academyLessonService';
import { useSecure } from '@/context/SecureContext';
import { toast } from 'sonner';


// const mockUserProgress: Record<
//     string,
//     { xp: number; completedCourses: string[] }
// > = {
//     medical: { xp: 2300, completedCourses: ['Anatomy Fundamentals', 'Physiology Basics'] },
//     university: { xp: 1250, completedCourses: ['English Grammar'] },
//     engineering: { xp: 900, completedCourses: [] },
// };

type Props = {
    learningPath: any
}

const LearningPath = ({ learningPath }: Props) => {
    const { isLoggedIn } = useSecure();
    // const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [subjectId, setSubjectId] = useState(searchParams.get('subject'));
    const [lessons, setLessons] = useState<any[]>([]);
    // const [userProgress, setUserProgress] = useState<{ xp: number; completedCourses: string[] } | null>(null);

    useEffect(() => {
        // const _unitId = searchParams.get('unit');
        // setUnitId(_unitId);

        const _subjectId = searchParams.get('subject');
        if (!_subjectId && Array.isArray(learningPath.subjects) && learningPath.subjects.length) {

            const _tempSubjectId = learningPath.subjects[0].subjectId;
            setSubjectId(_tempSubjectId);
        }
    }, [searchParams]);

    useEffect(() => {
        if (subjectId) {
            startTransition(async () => {
                const _lessons = await loadAcademicLesson(1, 100, subjectId, false);
                setLessons(_lessons.data);
                // console.log(_lessons.data);
            })
        }
        else {
            setLessons([]);
        }
    }, [subjectId])


    // if (!(pathKey in learningPaths)) {
    //     return <p className="p-4 text-center">Learning Path not found.</p>;
    // }

    // const pathData = learningPaths[pathKey];

    const handleChooseSubject = (subjectId: string) => {
        setSubjectId(subjectId);
        console.log(subjectId);

        const params = new URLSearchParams(searchParams.toString());
        params.set("subject", subjectId);
        console.log(params);

        router.push(`?${params.toString()}`);
    }

    const handleMarkAsCompleteLesson = (lesson: any) => {
        if (!isLoggedIn) {
            toast.warning("Please login for this action");
            return;
        }
        console.log(`Marking lesson "${lesson.title}" as complete`)
    }

    if (isPending) {
        return <Loading />
    }


    return (
        <>

            <div className='px-6'>
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold text-green-600">{learningPath?.pathTitle}</h1>
                    <p className="text-muted-foreground text-base">{learningPath?.pathDescription}</p>
                </div>

            </div>

            <div className='p-6 grid grid-cols-1 md:grid-cols-6 gap-6'>

                <div className='md:col-span-2 space-y-6'>
                    <div className="space-y-6">
                        {/* Courses */}
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-2">
                                <BookOpen className="text-blue-600" size={20} />
                                <CardTitle>Courses</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {learningPath && learningPath?.subjects?.map((subject: { subjectId: string, title: string }, index: any) => (
                                        <Button
                                            key={index}
                                            className="w-full text-sm text-gray-700 "
                                            onClick={() => handleChooseSubject(subject.subjectId)}
                                        >
                                            {subject.title}
                                        </Button>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Study Tips */}
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-2">
                                <Lightbulb className="text-yellow-500" size={20} />
                                <CardTitle>Study Tips</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    {["tips 1", "tips 2"].map((tip: any, i: number) => (
                                        <li key={i}>{tip}</li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter>
                                <Button className='w-full'>Full Guide</Button>

                            </CardFooter>
                        </Card>


                    </div>

                </div>

                <div className='md:col-span-4 space-y-6'>
                    <div className="space-y-6">
                        {/* What to Expect */}

                        <div>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <Flag className="text-green-600" size={20} />
                                    <CardTitle>What to Expect</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">{"pathData.whatToExpect"}</p>
                                </CardContent>

                                <CardFooter>
                                    <div className="flex gap-2 w-full">
                                        <Link href={''} className="w-1/2">
                                            <Button variant="default" className="w-full font-bold h-14 text-lg">
                                                Practice <Lightbulb className='text-2xl' />
                                            </Button>
                                        </Link>

                                        <Link href={''} className="w-1/2">
                                            <Button variant="default" size="lg" className="w-full font-bold h-14 text-lg">
                                                Question Bank <BookCopy className='text-4xl' />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardFooter>
                            </Card>


                        </div>

                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">Continue Learning</h2>
                            <Card>
                                <CardContent className="p-4 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">Biology - Chapter 3 Quiz</p>
                                        <p className="text-sm text-muted-foreground">Continue where you left off</p>
                                    </div>
                                    <Button variant="primary" size="sm">Resume</Button>
                                </CardContent>
                            </Card>
                        </div>


                        {/* Lessons / Topics + Actions */}
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-2 pb-0">
                                <ListChecks className="text-pink-600" size={20} />
                                <CardTitle className="text-lg">Lessons & Topics</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div>
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-muted-foreground">Lessons Progress</h4>

                                        <div className="flex flex-col space-y-2">
                                            {
                                                lessons?.map((lesson: any, i: number) => {
                                                    //   const isCompleted = userProgress?.completedLessons?.includes(lesson);
                                                    const isCompleted = i < 3 && isLoggedIn;

                                                    return (
                                                        <div
                                                            key={i}
                                                            className={`flex items-center justify-between px-4 py-2 rounded-lg border transition-all 
                                                                ${isCompleted ? "bg-green-50 border-green-300" : "bg-muted border-gray-200"}  `} >
                                                            <Link href={`/academy/c/${lesson._id}`} className="flex items-center gap-3">
                                                                <div className={`rounded-full p-1.5 ${isCompleted ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}>
                                                                    {isCompleted ? <CheckCircle size={18} /> : <Clock size={18} />}
                                                                </div>
                                                                <span className={`text-sm ${isCompleted ? "text-green-800 font-medium" : "text-muted-foreground"}`}>
                                                                    {lesson.title}
                                                                </span>
                                                            </Link>
                                                            {isCompleted ? (
                                                                <span className="text-xs text-green-700 font-semibold">Completed</span>
                                                            ) : (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="text-xs h-8 px-3 border border-gray-300 rounded-md text-muted-foreground hover:bg-gray-100 hover:border-gray-400 transition-colors"
                                                                    onClick={() => handleMarkAsCompleteLesson(lesson)}
                                                                >
                                                                    Mark as Complete
                                                                </Button>
                                                            )}
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>

                                </div>

                            </CardContent>
                        </Card>


                        {/* Progress */}
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-2">
                                <Star className="text-purple-600" size={20} />
                                <CardTitle>Your Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isPending ? (
                                    <p className="text-muted-foreground">Loading progress...</p>
                                ) : (
                                    <>
                                        {/* <p className="text-sm">
                                            <strong>XP Earned:</strong> {userProgress?.xp || 0}
                                        </p>
                                        <p className="text-sm font-medium mt-2">Completed Courses:</p>
                                        {userProgress && userProgress.completedCourses.length ? (
                                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                                {userProgress.completedCourses.map((c) => (
                                                    <li key={c}>{c}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No courses completed yet.</p>
                                        )} */}
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                </div>

            </div>


        </>
    )
}

export default LearningPath;