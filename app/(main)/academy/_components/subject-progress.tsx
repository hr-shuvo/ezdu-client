'use client';

import { Card, CardContent } from "@/components/ui/card";


export const SubjectProgress = () => {

    const subjects = [
        { title: "গণিত", percentage: 70, color: "bg-blue-500", bgColor: "" },
        { title: "বাংলা", percentage: 40, color: "bg-pink-500", bgColor: "" },
        { title: "বিজ্ঞান", percentage: 10, color: "bg-yellow-500", bgColor: "" },
    ]

    return (
        <>
            <Card className="shadow-lg">
                <CardContent className="p-5">
                    <h2 className="text-xl font-bold mb-2">📘 বিষয়ভিত্তিক অগ্রগতি</h2>
                    <div className="space-y-2">
                        {
                            subjects.map((item, index) => (
                                <div key={index}>
                                    <p className="font-medium">{item.title} - {item.percentage}%</p>
                                    <div className="h-2 bg-gray-200 rounded-full">
                                        <div className={`h-2 ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </CardContent>
            </Card>

        </>
    )

}

