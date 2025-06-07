import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

interface Props {
    isLoggedIn: boolean;
}

const topUsers = [
    { name: "Shuvo", points: 1520, avatar: "" },
    { name: "Ayesha", points: 1450, avatar: "" },
    { name: "Rahim", points: 1300, avatar: "" },
    { name: "Sadia", points: 1250, avatar: "" },
    { name: "Kamal", points: 1200, avatar: "" },
];

const quizzes = [
    { title: "Math Basics Quiz", questions: 10 },
    { title: "Science Facts", questions: 15 },
    { title: "History Highlights", questions: 8 },
];

export const LeaderboardBanner = ({ isLoggedIn }: Props) => {
    return (


        <div className="w-full  mx-auto my-8">

            {/* Always visible: Horizontal Leaderboard */}
            <section>
                <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center">Top Learners Leaderboard</h1>
                <div className="flex overflow-x-auto space-x-6 pb-4">
                    {topUsers.map((user, i) => (
                        <Card
                            key={i}
                            className="min-w-[175px] flex-shrink-0 rounded-3xl shadow-md hover:shadow-lg transition duration-300 cursor-default"
                        >
                            <CardContent className="flex flex-col items-center gap-2 p-6">
                                <span className="font-bold text-indigo-700 text-lg">{i + 1}</span>                                
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="rounded-full w-12 h-12" />
                                ) : (
                                    <FaUserCircle className="text-gray-400 w-12 h-12" />
                                )}
                                <span className="font-semibold text-indigo-600 text-center">{user.name}</span>
                                <span className="text-indigo-500 font-medium">{user.points} pts</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="text-center pt-5">
                    <Link
                        href="/leaderboard"
                        className="text-indigo-600 font-semibold hover:underline flex justify-center items-center gap-1"
                    >
                        View Full Leaderboard <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Other Features */}
            {isLoggedIn && (
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Daily Challenge */}
                    <Card className="rounded-3xl shadow-md hover:shadow-lg transition duration-300">
                        <CardContent className="p-6 flex flex-col gap-4">
                            <h2 className="text-xl font-bold text-green-600 text-center">Daily Challenge</h2>
                            <p className="text-center text-gray-700">
                                Complete today&apos;s challenge to earn extra points and badges!
                            </p>
                            <div className="text-center">
                                <button className="bg-green-600 text-white rounded-md px-6 py-2 font-semibold hover:bg-green-700 transition">
                                    Start Challenge
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Featured Quizzes */}
                    <Card className="rounded-3xl shadow-md hover:shadow-lg transition duration-300">
                        <CardContent className="p-6 flex flex-col gap-4">
                            <h2 className="text-xl font-bold text-purple-600 text-center">Featured Quizzes</h2>
                            <ul>
                                {quizzes.map((quiz, i) => (
                                    <li key={i} className="border-b border-gray-200 py-2 flex justify-between">
                                        <span>{quiz.title}</span>
                                        <span className="text-sm text-gray-500">{quiz.questions} questions</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </section>
            )}

            {/* Not logged in CTA */}
            {!isLoggedIn && (
                <div className="text-center mt-6 text-gray-700">
                    <p className="mb-2">Want more personalized features like Daily Challenges?</p>
                    <Link
                        href="/login"
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Login or Sign up to unlock all features!
                    </Link>
                </div>
            )}
        </div>



    );
}
