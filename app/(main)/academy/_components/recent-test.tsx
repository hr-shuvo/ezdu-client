'use client';

import Loading from "@/app/(voclift)/courses/loading";
import { LoadRecentQuiz } from "@/app/_services/academy/academy-quiz-service";
import { Card, CardContent } from "@/components/ui/card";
import { useSecure } from "@/context/SecureContext";
import { formatRelativeDate } from "@/lib/date-time";
import { useEffect, useState, useTransition } from "react";



export const RecentTest = () => {
    const { isLoggedIn } = useSecure();
    const [isPending, startTransition] = useTransition();
    const [recentQuiz, setRecentQuiz] = useState([]);

    // const recentTests = [
    //     { subject: "গণিত", score: "8/10", date: "আজ" },
    //     { subject: "বিজ্ঞান", score: "6/10", date: "গতকাল" },
    //     { subject: "বাংলা", score: "9/10", date: "২ দিন আগে" },
    // ];

    useEffect(() => {
        if (isLoggedIn) {
            startTransition(async () => {
                const _quizResponse = await LoadRecentQuiz();
                console.log(_quizResponse.data);
                setRecentQuiz(_quizResponse.data)
            })
        }
    }, [isLoggedIn])

    if(isPending){
        return <Loading/>
    }

    return (
        <>
            <Card className="shadow-lg">
                <CardContent className="p-5">
                    <h2 className="text-xl font-bold mb-4">📊 সাম্প্রতিক টেস্ট</h2>
                    {recentQuiz.map((test: any, idx) => (
                        <div key={idx} className="mb-4">
                            <p className="text-base font-medium">{test?.subject?.title}</p>
                            <p className="text-sm text-muted-foreground">
                                স্কোর: {test.xp} ({formatRelativeDate(test.start)})
                            </p>
                        </div>
                    ))}
                </CardContent> 
            </Card>
        </>
    )

}

