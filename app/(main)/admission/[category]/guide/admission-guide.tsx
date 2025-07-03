'use client'

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ClipboardList, Clock, ListChecks } from "lucide-react";

const coreBooks = [
    {
        subject: 'Biology',
        textbooks: ['NCTB Biology Class 11 & 12 (Part 1 & 2)'],
        tips: [
            'Read every line carefully — most questions come from direct lines',
            'Understand all diagrams and examples',
            'Practice MCQs after each topic',
        ],
    },
    {
        subject: 'Chemistry',
        textbooks: ['NCTB Chemistry Class 11 & 12'],
        tips: [
            'Memorize equations and exceptions',
            'Focus on organic chemistry basics and reactions',
            'Revise periodic table frequently',
        ],
    },
    {
        subject: 'Physics',
        textbooks: ['NCTB Physics Class 11 & 12'],
        tips: [
            'Understand formulas and unit conversions',
            'Practice numerical problems regularly',
            'Focus on optics, motion, and current chapters',
        ],
    },
    {
        subject: 'English',
        textbooks: ['HSC English Grammar Books'],
        tips: [
            'Practice synonyms, antonyms, fill in the blanks',
            'Focus on sentence correction and prepositions',
            'Use flashcards for vocabulary',
        ],
    },
    {
        subject: 'General Knowledge',
        textbooks: ['Basic Bangladesh affairs and science knowledge'],
        tips: [
            'Read recent Nobel Prize winners and science news',
            'Revise key facts about Bangladesh and its constitution',
        ],
    },
];

const extraBooks = [
    'Prof’s MCQ Series',
    'Renesa MCQ Guides',
    'SAFWA MCQ Books',
    '10-Year Medical Question Bank',
    'Unmesh Model Test Series',
];


const dailyPlan = [
    { time: '7am–9am', task: 'Biology theory (1 chapter)' },
    { time: '9am–10am', task: 'Biology MCQs practice' },
    { time: '10am–11am', task: 'Chemistry reading & summary' },
    { time: '11am–12pm', task: 'Physics MCQs & formulas' },
    { time: '2pm–3pm', task: 'English grammar and vocab' },
    { time: '3pm–4pm', task: 'Model test or mock exam' },
    { time: '5pm–6pm', task: 'Review mistakes & note revision' },
    { time: '8pm–9pm', task: 'Flashcards or GK quick test' },
];



const marksSubjects = [
    { subject: "Physics", questions: 30, marks: 30 },
    { subject: "Chemistry", questions: 30, marks: 30 },
    { subject: "Biology", questions: 40, marks: 40 },
    { subject: "English", questions: 10, marks: 10 },
];


const AdmissionGuide = () => {

    return (
        <>
            <div>
                <div className="grid md:grid-cols-2 gap-6">

                    <div>
                        <Card>
                            <CardHeader className="flex items-center gap-2 text-purple-700">
                                <ClipboardList size={20} />
                                <CardTitle>Marks Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <table className="w-full text-sm text-purple-700">
                                    <thead>
                                        <tr className="border-b border-purple-300">
                                            <th className="text-left p-2">Subject</th>
                                            <th className="text-right p-2">MCQs</th>
                                            <th className="text-right p-2">Marks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {marksSubjects.map((s, i) => (
                                            <tr key={i} className="border-b border-purple-200">
                                                <td className="p-2">{s.subject}</td>
                                                <td className="p-2 text-right">{s.questions}</td>
                                                <td className="p-2 text-right">{s.marks}</td>
                                            </tr>
                                        ))}
                                        <tr className="font-semibold border-t border-purple-400">
                                            <td className="p-2">Total</td>
                                            <td className="p-2 text-right">{marksSubjects.reduce((a, c) => a + c.questions, 0)}</td>
                                            <td className="p-2 text-right">{marksSubjects.reduce((a, c) => a + c.marks, 0)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>

                    </div>

                    <div>
                        <Card>
                            <CardHeader className="flex items-center gap-2 text-purple-700">
                                <Clock size={20} />
                                <CardTitle>Suggested Daily Routine</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-purple-700">
                                    {dailyPlan.map((plan, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between p-3 rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-100 transition"
                                        >
                                            <span className="font-semibold">{plan.time}</span>
                                            <span>{plan.task}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    <div  className="md:col-span-2">

                        <Card>
                            <CardHeader className="flex items-center gap-2 text-green-700">
                                <BookOpen size={20} />
                                <CardTitle>Core Subject Guide</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-3">
                                    {coreBooks.map((subject, i) => (
                                    <div key={i}>
                                        <h5 className="font-semibold text-green-800 mb-1">{subject.subject}</h5>
                                        <ul className="list-disc list-inside text-green-700 mb-1 text-sm">
                                            {subject.textbooks.map((book, j) => (
                                                <li key={j}>{book}</li>
                                            ))}
                                        </ul>
                                        <ul className="list-disc list-inside text-green-600 ml-5 text-sm">
                                            {subject.tips.map((tip, j) => (
                                                <li key={j}>{tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}

                                </div>
                                
                            </CardContent>
                        </Card>

                    </div>



                </div>
            </div>



            <div className="max-w-5xl mx-auto p-6 space-y-8">
                {/* Core Subjects - full width */}


                {/* Extra Books - full width */}
                <Card>
                    <CardHeader className="flex items-center gap-2 text-yellow-700">
                        <ListChecks size={20} />
                        <CardTitle>Extra Practice Books</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {extraBooks.map((book, i) => (
                                <Badge
                                    key={i}
                                    variant="secondary"
                                    className="rounded-full bg-yellow-600 text-white px-4 py-1 text-xs font-medium"
                                >
                                    {book}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Marks Distribution & Daily Routine side-by-side */}

            </div>

        </>
    )
}

export default AdmissionGuide;

