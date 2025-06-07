import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";


export const SchoolBanner = () => {
    // const neonColors = {firstColor: "#91143e", secondColor: "#2c8787"};

    return (
        <>
            <div className="w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Academic Levels Section */}
                <Card className="rounded-3xl shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex flex-col justify-between gap-4">
                        <h2 className="text-xl font-bold text-indigo-600 text-center">
                            Class 6–12 Study Materials
                        </h2>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            {["Class 6–8", "Class 9–10", "Class 11–12"].map((label, i) => (
                                <Card
                                    key={i}
                                    className="bg-indigo-50 hover:bg-indigo-100 rounded-xl py-6 cursor-pointer shadow-sm hover:shadow-md transition text-indigo-700 font-semibold text-lg"
                                    onClick={() => redirect('/academy')}
                                >
                                    {label}
                                </Card>
                            ))}
                        </div>

                        <div className="text-center text-green-800 font-medium pt-2">
                            <Link href="/academy" className="hover:underline flex justify-center items-center gap-1">
                                Complete materials and solutions <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Exam Prep Section */}
                <Card className="rounded-3xl shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex flex-col justify-between gap-4">
                        <h2 className="text-xl font-bold text-indigo-600 text-center">
                            SSC & HSC Exam Practice
                        </h2>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            {[
                                { label: "SSC 25" },
                                { label: "HSC 25,26" },
                                { label: "MCQ & Quizzes" }
                            ].map(({ label }, i) => (
                                <Card
                                    key={i}
                                    className="bg-pink-50 hover:bg-pink-100 rounded-xl py-6 cursor-pointer shadow-sm hover:shadow-md transition font-semibold text-lg text-pink-700"
                                    onClick={() => redirect('/academy')}
                                >
                                    {label}
                                </Card>
                            ))}
                        </div>

                        <div className="text-center text-green-800 font-medium pt-2">
                            <Link href="#" className="hover:underline flex justify-center items-center gap-1">
                                Effective SSC & HSC Revision <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>

    )

}