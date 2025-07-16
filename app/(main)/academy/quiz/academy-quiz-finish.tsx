'use client';

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { Button } from "@/components/ui/button";
import { FilePlus2, MoveLeft, Send } from "lucide-react";
import { toast } from "sonner";
import FireBorderBox from "@/components/custom-ui/fire-box";
import Link from "next/link";
import Confetti from "react-confetti";
import { Card } from "@/components/ui/card";

dayjs.extend(utc);

const formatRelativeDate = (dateStr: string) => {
    const dayjsDate = dayjs.utc(dateStr).local().startOf("day");
    const today = dayjs().startOf("day");
    const diff = today.diff(dayjsDate, "day");

    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return `${diff} days ago`;
};

type Props = {
    summary: any
};

export const AcademyQuizFinishPage = ({summary}: Props) => {
    const [feedback, setFeedback] = useState("");
    const [animate, setAnimate] = useState(false);

    console.log("summary: ", summary);

    useEffect(() => {

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
        <>
            <Confetti
                recycle={false}
                numberOfPieces={500}
                tweenDuration={15000}
            />

            <div className="p-6 gap-6">
                <div className="flex flex-col items-center">

                    <Card
                        className={`p-10 rounded-3xl shadow-xl max-w-4xl w-full text-center transform transition-all duration-700 ease-out 
    ${animate ? "opacity-100 scale-100" : "opacity-0 scale-90"} 
    bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                    >
                        <h1 className="text-5xl font-bold mb-4">
    <span
        className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-bounce">
      {summary?.progress?.streakCount} streak!
    </span>{" "}
                            🎉 Congratulations!
                        </h1>

                        <FireBorderBox>
                            <p className="text-xl text-gray-700 dark:text-gray-300">
                                You earned <b>{summary?.xp.toFixed(1) || 0} XP</b>!
                            </p>
                        </FireBorderBox>

                        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                            You’ve successfully completed the quiz.
                        </p>

                        <Link href={"/academy"}>
                            <Button variant={"primary"}>
                                <MoveLeft/> Back to Home
                            </Button>
                        </Link>
                    </Card>


                    <div className="mt-12 max-w-6xl w-full flex flex-col md:flex-row gap-10">
                        {/* XP Progress Card */}
                        <div
                            className="flex-1 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                                📊 Your XP Progress
                            </h2>
                            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                                {summary?.progress?.lastWeekXp.map((stat: any) => (
                                    <li key={stat.date}
                                        className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
                                        <span>{formatRelativeDate(stat.day)}</span>
                                        <span>{stat.xp.toFixed(1)} XP</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 text-green-700 dark:text-green-400 font-semibold text-lg">
                                Total XP: {summary?.progress.totalXp.toFixed(1)}
                            </p>
                        </div>

                        {/* Recommended Quiz Card */}
                        <div
                            className="flex-1 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md flex flex-col justify-between border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                                ⭐ Recommended Quiz
                            </h2>
                            <p className="mb-6 text-gray-700 dark:text-gray-300">
                                Try another quiz from your favorite subject or lesson to keep your learning streak
                                going!
                            </p>
                            <button
                                className="mt-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105"
                            >
                                Explore More Quizzes
                            </button>
                        </div>
                    </div>


                    <div
                        className="mt-14 text-center p-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 shadow-lg animate-bounce max-w-xl w-full">
                        <h3 className="text-3xl font-extrabold text-white mb-2">🔥 Keep Your Streak Alive!</h3>
                        <p className="text-white text-lg">
                            Consistency is key! Complete daily quizzes and watch your XP and skills grow.
                        </p>
                    </div>

                    <div
                        className="mt-10 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md w-full max-w-2xl border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <FilePlus2 className="w-5 h-5"/>
                            Feedback
                        </h2>

                        <textarea
                            className="w-full border border-gray-300 dark:border-gray-700 rounded p-3 h-24 resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="How was your experience? Any suggestions?"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />

                        <Button
                            variant="primary"
                            className="mt-4 flex items-center gap-2"
                            onClick={handleFeedbackSubmit}
                        >
                            <Send/> Submit Feedback
                        </Button>
                    </div>

                </div>

            </div>
        </>


    );
};
