'use client';

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { FilePlus2, MoveLeft, Send } from "lucide-react";
import { toast } from "sonner";

const formatRelativeDate = (dateStr: string) => {
    const dayjsDate = dayjs(dateStr);
    const today = dayjs();
    const diff = today.diff(dayjsDate, "day");

    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return `${diff} days ago`;
};

type Props = {
    quiz: any
};

export const AcademyQuizFinishPage = ({ quiz }: Props) => {
    const [xp, setXP] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [xpStats, setXPStats] = useState<{ date: string; xp: number }[]>([]);
    const [totalXP, setTotalXP] = useState(0);
    const [animate, setAnimate] = useState(false);


    const calculateXP = () => {
        
        if (!quiz || !quiz.questions || !Array.isArray(quiz.questions)) return 0;
        const correctAnswers = quiz.questions.filter(
            (q: any) => q.selectedOption?.correct
        ).length;
        return correctAnswers * 10;
    };

    const updateXPStats = async (earnedXP: number) => {
        const today = dayjs();

        try {
            const data = {
                last7Days: [
                    { date: today.format("YYYY-MM-DD"), xp: 90 },
                    { date: today.subtract(1, 'day').format("YYYY-MM-DD"), xp: 20 },
                    { date: today.subtract(2, 'day').format("YYYY-MM-DD"), xp: 70 },
                    // { date:today.subtract(4, 'day').format("YYYY-MM-DD"), xp: 60 },
                ],
                total: earnedXP,
            };
            setXPStats(data.last7Days);
            setTotalXP(data.total);
        } catch (err: any) {
            console.error(err?.response?.data?.msg || err.message);
        }
    };

    useEffect(() => {
        const earnedXP = calculateXP();
        setXP(earnedXP);
        updateXPStats(earnedXP);

        setTimeout(() => {
            setAnimate(true);
        }, 100);

    }, []);

    const handleFeedbackSubmit = async () => {
        if (!feedback) return;
        try {
            toast.message("Thanks for your feedback!");
            setFeedback("");
        } catch (err: any) {
            console.error(err?.response?.data?.msg || err.message);
        }
    };

    return (

        <div className="p-6 gap-6 bg-gradient-to-r from-white via-indigo-100 to-white min-h-screen">
            <div className="flex flex-col items-center">

                <div
                    className={`bg-white p-10 rounded-3xl shadow-xl max-w-4xl w-full text-center transform transition-all duration-700 ease-out 
    ${animate ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                >
                    <h1 className="text-5xl font-bold text-green-600 mb-4">🎉 Congratulations!</h1>
                    <p className="text-xl text-gray-700 mb-8">
                        You’ve successfully completed the quiz. You earned <b>{xp} XP</b>!
                    </p>
                    <Button variant={'primary'}>
                        <MoveLeft /> Back to Home
                    </Button>
                </div>


                <div className="mt-12 max-w-6xl w-full flex flex-col md:flex-row gap-10">
                    <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-semibold mb-6">📊 Your XP Progress</h2>
                        <ul className="space-y-3 text-sm">
                            {xpStats.map((stat) => (
                                <li key={stat.date} className="flex justify-between border-b pb-2">
                                    <span>{formatRelativeDate(stat.date)}</span>
                                    <span>{stat.xp} XP</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-green-700 font-semibold text-lg">Total XP: {totalXP}</p>
                    </div>

                    <div className="flex-1 bg-white p-6 rounded-xl shadow-md flex flex-col justify-between">
                        <h2 className="text-2xl font-semibold mb-6">⭐ Recommended Quiz</h2>
                        <p className="mb-6 text-gray-700">
                            Try another quiz from your favorite subject or lesson to keep your learning streak going!
                        </p>
                        <button
                            className="mt-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105"
                        >
                            Explore More Quizzes
                        </button>
                    </div>
                </div>

                <div className="mt-14 text-center p-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 shadow-lg animate-bounce max-w-xl w-full">
                    <h3 className="text-3xl font-extrabold text-white mb-2">🔥 Keep Your Streak Alive!</h3>
                    <p className="text-white text-lg">
                        Consistency is key! Complete daily quizzes and watch your XP and skills grow.
                    </p>
                </div>

                <div className="mt-10 bg-white p-6 rounded-xl shadow-md w-full max-w-2xl">
                    <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                        <FilePlus2 className="w-5 h-5" />
                        Feedback
                    </h2>
                    <textarea
                        className="w-full border rounded p-2 h-24 resize-none"
                        placeholder="How was your experience? Any suggestions?"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />

                    <Button variant={'primary'}
                        onClick={handleFeedbackSubmit}
                    >
                        <Send /> Submit Feedback
                    </Button>
                </div>
            </div>

        </div>




    );
};
