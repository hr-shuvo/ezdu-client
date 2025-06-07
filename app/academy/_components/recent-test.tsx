'use client';

import { Card, CardContent } from "@/components/ui/card";

type Props = {
}

export const RecentTest = ({ }: Props) => {

    const recentTests = [
        { subject: "গণিত", score: "8/10", date: "আজ" },
        { subject: "বিজ্ঞান", score: "6/10", date: "গতকাল" },
        { subject: "বাংলা", score: "9/10", date: "২ দিন আগে" },
    ];

    return (
        <>
            <Card className="shadow-lg">
                <CardContent className="p-5">
                    <h2 className="text-xl font-bold mb-4">📊 সাম্প্রতিক টেস্ট</h2>
                    {recentTests.map((test, idx) => (
                        <div key={idx} className="mb-4">
                            <p className="text-base font-medium">{test.subject}</p>
                            <p className="text-sm text-muted-foreground">
                                স্কোর: {test.score} ({test.date})
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </>
    )

}

