'use client';

import { Button } from "@/components/ui/button";
import { BookOpenCheck, Flame } from "lucide-react";

type Props = {
    lessons: []

}

export const ShowQuizSummary = ({ lessons }: Props) => {
    return (

        <div className="px-6 my-5">

            <div className="bg-gradient-to-r from-blue-50 to-indigo-200 rounded-2xl p-6 shadow-sm border border-blue-100">
                <div className="flex items-center gap-4 mb-4">
                    <Flame className="w-10 h-10 text-blue-600" />
                    <h1 className="text-3xl font-extrabold text-blue-700">Power Up Your Learning Streak!</h1>
                </div>
                <p className="text-base font-medium text-blue-700 flex items-center gap-4">
                    Review your lessons and crush it!
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                        <Button variant="primary">Explore All Chapters</Button>
                        <Button variant="secondary">Recommended Quizzes</Button>
                        <Button variant="super">Top Rated Notes</Button>
                    </div>

            </div>



            <div>
                {
                    lessons.map((lesson: any, index: number) => (
                        <div key={index}>
                            <div>{lesson.title}</div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}