'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useParams } from 'next/navigation';
import { BookOpen, Flag, Lightbulb, ListChecks, Star, Zap } from 'lucide-react';

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
    const router = useRouter();
    const params = useParams();

    // Handle category param that might be string or string[]
    let categoryParam = params.category;

    let category: string;
    if (Array.isArray(categoryParam)) {
        category = categoryParam[0] || ''; // take first element or fallback empty string
    } else {
        category = categoryParam || '';
    }

    const pathKey = category.toLowerCase();

    if (!(pathKey in learningPaths)) {
        return <p className="p-4 text-center">Learning Path not found.</p>;
    }

    const pathData = learningPaths[pathKey];

    const [userProgress, setUserProgress] = useState<{ xp: number; completedCourses: string[] } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setUserProgress(null);

        setTimeout(() => {
            setUserProgress(mockUserProgress[pathKey] || { xp: 0, completedCourses: [] });
            setLoading(false);
        }, 600);
    }, [pathKey]);

    function handleStartLearning() {
        alert(`Starting learning path: ${pathData.title}`);
    }
    function handleResumeLearning() {
        alert(`Resuming learning in: ${pathData.title}`);
    }
    function navigateToPath(path: string) {
        router.push(`/admission/${path}`);
    }

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

                        {/* Lessons / Topics + Actions */}
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-2">
                                <ListChecks className="text-pink-600" size={20} />
                                <CardTitle>Lessons & Topics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    {pathData.lessons?.map((lesson: any, i: number) => (
                                        <li key={i}>{lesson}</li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-3 pt-2">
                                    {userProgress?.completedCourses.length! > 0 && (
                                        <Button className="rounded-full bg-green-600 hover:bg-green-700 text-white px-5">
                                            Continue Learning
                                        </Button>
                                    )}
                                    <Button variant="secondary" className="rounded-full px-5">
                                        Practice
                                    </Button>
                                    <Button variant="secondary" className="rounded-full px-5">
                                        Take Quiz
                                    </Button>
                                    <Button variant="secondary" className="rounded-full px-5">
                                        Model Test
                                    </Button>
                                    <Button variant="secondary" className="rounded-full px-5">
                                        Previous Questions
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>

                <div className='lg:col-span-4 space-y-6'>
                    <div className="space-y-6">
                        {/* What to Expect */}
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-2">
                                <Flag className="text-green-600" size={20} />
                                <CardTitle>What to Expect</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">{pathData.whatToExpect}</p>
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