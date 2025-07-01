'use client';

import { upsertAcademyQuizXp, upsertQuiz } from "@/app/_services/academy/academy-quiz-service";
import { useEffect, useState, useTransition } from "react";
import { AcademyQuizFinishPage } from "./academy-quiz-finish";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Flag, MoveLeft, MoveRight } from "lucide-react";

type Quiz = {
    _id: string
    duration: number
    end: string,
    subjectId: string,
    questions: {
        lessonId: string;
        question: string;
        passage: string | null;
        optionList: { text: string; correct: boolean }[];
        selectedOption: { text: string; correct: boolean } | null;
    }[]
}

type Props = {
    quiz: Quiz;
}

let timer: NodeJS.Timeout | null = null;


export const AcademyQuiz = ({ quiz }: Props) => {
    const [isPending, startTransition] = useTransition();
    const [questions, setQuestions] = useState(quiz.questions)
    const [current, setCurrent] = useState(0)
    const [remainingTime, setRemainingTime] = useState(
        Math.max(0, Math.floor((new Date(quiz.end).getTime() - Date.now()) / 1000))
    )
    const [finished, setFinished] = useState(false);
    const [xpSummary, setXpSummary] = useState();

    useEffect(() => {
        const endTime = new Date(quiz.end).getTime();

        timer = setInterval(() => {
            const secs = Math.floor((endTime - Date.now()) / 1000);
            setRemainingTime(Math.max(0, secs));

            if (secs <= 0 && !finished) {
                handleTimerFinish(timer);
            } else {
                setRemainingTime(Math.max(0, secs));
            }
        }, 1000);

        return () => clearInterval(timer!);
    }, [quiz.end])


    const handleTimerFinish = async (
        timer: NodeJS.Timeout | null
    ) => {
        clearInterval(timer!);
        setFinished(true);
        setRemainingTime(0);

        startTransition(async () => {
            console.log(quiz._id);
            const _progress = await upsertAcademyQuizXp(quiz._id);
            quiz.end = new Date().toISOString();

            await upsertQuiz(quiz);
            setXpSummary(_progress.data);
            // console.log('progress: ', _progress.data);
        });
    };

    const handleOptionClick = async (selected: { text: string; correct: boolean }) => {
        const updatedQuestions = [...questions]
        updatedQuestions[current].selectedOption = selected
        setQuestions(updatedQuestions)

        try {
            quiz.questions = updatedQuestions;
            // const updatedQuiz = await upsertQuiz(quiz);
            await upsertQuiz(quiz);
            // console.log('after update: ', updatedQuiz.data);
        } catch (err) {
            console.error("Failed to update answer", err)
        }
    }

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60)
        const s = secs % 60
        return `${m}:${s.toString().padStart(2, "0")}`
    }

    if (finished && !isPending) {
        return (
            <AcademyQuizFinishPage summary={xpSummary} />
        )
    }

    const q = questions[current] ??
    {
        optionList: []
    };

    return (
        <>
            <div className="p-6 gap-6">

                <div className="relative max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6 space-y-6 text-gray-800">
                    {/* Countdown in top-right */}
                    <div className="absolute top-4 right-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold shadow">
                        ⏱ {formatTime(remainingTime)}
                    </div>

                    {q.passage && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm rounded">
                            <strong>Passage:</strong> {q.passage}
                        </div>
                    )}

                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">
                            Question {current + 1}/{questions.length}
                        </h2>
                    </div>

                    <div>
                        <p className="text-lg font-medium">{q.question}</p>
                    </div>

                    <div className="space-y-3">
                        {q.optionList.map((option, idx) => {
                            const isSelected =
                                q.selectedOption?.text === option.text &&
                                q.selectedOption?.correct === option.correct

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionClick(option)}
                                    className={`w-full text-left px-4 py-2 rounded-xl border transition-all duration-200
                ${isSelected
                                            ? "bg-green-100 border-green-500"
                                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                                        }`}
                                >
                                    {option.text}
                                </button>
                            )
                        })}
                    </div>

                    <div className="flex justify-between mt-6">

                        <Button variant='default'
                            disabled={current === 0}
                            onClick={() => setCurrent((prev) => prev - 1)}><MoveLeft /> Back</Button>

                        <Button variant='primary'
                            onClick={() => {
                                if (current < questions.length - 1) {
                                    setCurrent((prev) => prev + 1)
                                } else {
                                    handleTimerFinish(null);

                                    toast.message("Quiz completed!");
                                }
                            }}
                        >
                            {current < questions.length - 1 ? (
                                <span className="flex items-center gap-2">
                                    Next <MoveRight className="w-4 h-4" />
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Finish <Flag className="w-4 h-4" />
                                </span>
                            )}

                        </Button>
                    </div>
                </div>
            </div>

        </>
    )
}