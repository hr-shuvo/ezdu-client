import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";


export const SchoolBanner = () => {
    // const neonColors = {firstColor: "#91143e", secondColor: "#2c8787"};

    return (
        <>
            <div className="w-full mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Academic Levels Section */}
                <Card
                    className="rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 dark:bg-[hsl(210,15%,15%)] dark:shadow-zinc-700">
                    <CardContent className="p-6 flex flex-col justify-between gap-4">
                        <h2 className="text-xl font-bold  text-sky-600 text-center dark:text-sky-200 ">
                            Academic Study Materials
                        </h2>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            {["Class 6–8", "Class 9–10", "Class 11–12"].map((label, i) => (
                                <Card
                                    key={i}
                                    className="text-sky-900 bg-gradient-to-br from-white to-[hsl(210,45%,95%)] dark:from-gray-700 dark:to-gray-800 rounded-xl py-6
                                    cursor-pointer shadow-sm hover:shadow-md transition font-semibold text-lg
                                    dark:text-sky-300  dark:shadow-zinc-700"
                                    onClick={() => redirect('/academy')}
                                >
                                    {label}
                                </Card>
                            ))}
                        </div>

                        <div className="text-center text-green-800 font-medium pt-2 dark:text-sky-100">
                            <Link href="/academy" className="hover:underline flex justify-center items-center gap-1">
                                Complete materials and solutions <ArrowRight className="w-4 h-4"/>
                            </Link>
                        </div>
                    </CardContent>
                </Card>


                {/* Exam Prep Section */}
                <Card
                    className="rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 dark:bg-[hsl(210,15%,15%)] dark:shadow-zinc-700">
                    <CardContent className="p-6 flex flex-col justify-between gap-4">
                        <h2 className="text-xl font-bold text-sky-600 text-center dark:text-sky-200">
                            Your Exam Preparation
                        </h2>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            {[
                                {label: "SSC 25"},
                                {label: "HSC 25,26"},
                                {label: "Admission"}
                            ].map(({label}, i) => (
                                <Card
                                    key={i}
                                    className="text-sky-900 bg-gradient-to-br from-white to-[hsl(210,45%,95%)] dark:from-gray-700 dark:to-gray-800 rounded-xl py-6
                                    cursor-pointer shadow-sm hover:shadow-md transition font-semibold text-lg
                                    dark:text-sky-300  dark:shadow-zinc-700"
                                    onClick={() => redirect('/academy')}
                                >
                                    {label}
                                </Card>
                            ))}
                        </div>

                        <div className="text-center text-green-800 font-medium pt-2 dark:text-sky-100">
                            <Link href="#" className="hover:underline flex justify-center items-center gap-1">
                                Effective SSC & HSC Revision <ArrowRight className="w-4 h-4"/>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </>

    )

}