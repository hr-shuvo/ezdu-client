'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { BookCopy, BookOpen, CheckCircle, Clock, Flag, Lightbulb, ListChecks, Star } from 'lucide-react';
import Link from 'next/link';

type LearningPath = {
    title: string;
    description: string;
    courses: string[];
    tips: string[];
    lessons: string[],
    whatToExpect: string;
};





const learningPaths: Record<string, LearningPath> = {
    medical: {
        title: 'Medical Admission Learning Path',
        description:
            'Prepare for medical admission exams covering biology, chemistry, anatomy, and more. Build a strong foundation to excel.',
        courses: ['Anatomy Fundamentals', 'Physiology Basics', 'Biochemistry Overview', 'Pathology Essentials', 'Pharmacology Intro'],
        tips: [
            'Study consistently for 1-2 hours daily.',
            'Practice past papers and quizzes.',
            'Focus on understanding concepts.',
            'Join study groups for support.',
            'Use active recall and spaced repetition.',
        ],
        lessons: [
            'Cell Structure & Function',
            'Human Digestive System',
            'Cardiovascular System',
            'Organic Chemistry Basics',
            'Drug Action Mechanisms',
        ],

        whatToExpect:
            'Medical admission tests include MCQs on biology, chemistry, and general science. Time management and accuracy are key.',
    },
    university: {
        title: 'University Admission Learning Path',
        description:
            'Get ready for university entrance exams in English, General Knowledge, and critical thinking skills.',
        courses: ['English Grammar', 'Comprehension', 'General Knowledge', 'Logical Reasoning'],
        tips: [
            'Read daily newspapers and articles.',
            'Practice comprehension passages.',
            'Expand your vocabulary.',
            'Solve previous year question papers.',
        ],
        lessons: [
            'Tense & Sentence Structure',
            'Reading Comprehension Practice',
            'World History & GK',
            'Logical Puzzle Solving',
        ],
        whatToExpect:
            'Expect English language proficiency tests, GK questions, and reasoning sections in university exams.',
    },
    engineering: {
        title: 'Engineering Admission Learning Path',
        description:
            'Prepare for engineering entrance exams focusing on mathematics, physics, and problem-solving skills.',
        courses: ['Mathematics Foundations', 'Physics Principles', 'Chemistry Basics', 'Problem Solving'],
        tips: [
            'Strengthen your fundamentals in math and science.',
            'Solve numerical problems regularly.',
            'Use diagrams to visualize problems.',
            'Attempt mock tests under timed conditions.',
        ],
        lessons: [
            'Algebra & Trigonometry',
            'Newton’s Laws of Motion',
            'Thermodynamics Basics',
            'Organic vs Inorganic Chemistry',
            'Math Word Problems',
        ],
        whatToExpect:
            'Engineering exams test your analytical skills and conceptual understanding of STEM subjects.',
    },
};

const mockUserProgress: Record<
    string,
    { xp: number; completedCourses: string[] }
> = {
    medical: { xp: 2300, completedCourses: ['Anatomy Fundamentals', 'Physiology Basics'] },
    university: { xp: 1250, completedCourses: ['English Grammar'] },
    engineering: { xp: 900, completedCourses: [] },
};

const LearningPathHome = () => {
    const params = useParams();
    
    const [userProgress, setUserProgress] = useState<{ xp: number; completedCourses: string[] } | null>(null);
    const [loading, setLoading] = useState(true);

    // Handle category param that might be string or string[]
    const categoryParam = params.category;

    let category: string;
    if (Array.isArray(categoryParam)) {
        category = categoryParam[0] || ''; // take first element or fallback empty string
    } else {
        category = categoryParam || '';
    }

    const pathKey = category.toLowerCase();
    
    useEffect(() => {
        setLoading(true);
        setUserProgress(null);

        setTimeout(() => {
            setUserProgress(mockUserProgress[pathKey] || { xp: 0, completedCourses: [] });
            setLoading(false);
        }, 600);
    }, [pathKey]);


    if (!(pathKey in learningPaths)) {
        return <p className="p-4 text-center">Learning Path not found.</p>;
    }

    const pathData = learningPaths[pathKey];



    

    return (

        <>
            <div className='px-6'>
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold text-green-600">{pathData.title}</h1>
                    <p className="text-muted-foreground text-base">{pathData.description}</p>
                </div>

            </div>

            <div className='p-6 grid grid-cols-1 lg:grid-cols-6 gap-6'>

                <div className='lg:col-span-2 space-y-6'>
                    <div className="space-y-6">
                        {/* Courses */}
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-2">
                                <BookOpen className="text-blue-600" size={20} />
                                <CardTitle>Courses</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {pathData.courses.map((course) => (
                                        <li
                                            key={course}
                                            className="bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition"
                                        >
                                            {course}
                                        </li>
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
                                    {pathData.tips.map((tip, i) => (
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

                <div className='lg:col-span-4 space-y-6'>
                    <div className="space-y-6">
                        {/* What to Expect */}

                        <div>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <Flag className="text-green-600" size={20} />
                                    <CardTitle>What to Expect</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">{pathData.whatToExpect}</p>
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
                                {/* Lessons List */}
                                <div>
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-muted-foreground">Lessons Progress</h4>

                                        <div className="flex flex-col space-y-2">
                                            {pathData.lessons?.map((lesson: any, i: number) => {
                                                //   const isCompleted = userProgress?.completedLessons?.includes(lesson);
                                                const isCompleted = i < 3;

                                                return (
                                                    <div
                                                        key={i}
                                                        className={`flex items-center justify-between px-4 py-2 rounded-lg border transition-all
            ${isCompleted ? "bg-green-50 border-green-300" : "bg-muted border-gray-200"}
          `}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`rounded-full p-1.5 ${isCompleted ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}>
                                                                {isCompleted ? <CheckCircle size={18} /> : <Clock size={18} />}
                                                            </div>
                                                            <span className={`text-sm ${isCompleted ? "text-green-800 font-medium" : "text-muted-foreground"}`}>
                                                                {lesson}
                                                            </span>
                                                        </div>
                                                        {isCompleted && (
                                                            <span className="text-xs text-green-700 font-semibold">Completed</span>
                                                        )}
                                                    </div>
                                                );
                                            })}
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
                                {loading ? (
                                    <p className="text-muted-foreground">Loading progress...</p>
                                ) : (
                                    <>
                                        <p className="text-sm">
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
                                        )}
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                </div>

            </div>




        </>





    );
}


export default LearningPathHome;