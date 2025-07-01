'use client';

import { getAcademicSubject } from "@/app/_services/academy/academySubjectService";
import { loadAcademicModelTest } from "@/app/_services/qb/questionBankService";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { StreakCount } from "../../_components/streak-count";
import { SubjectProgress } from "../../_components/subject-progress";
import { RecentTest } from "../../_components/recent-test";
import { Clock, ListCheck } from "lucide-react";
import Link from "next/link";
import Loading from "@/app/(main)/courses/loading";
import { useSecure } from "@/context/SecureContext";

const QuestionBankSubject = () => {
    const params = useParams();
    const { isLoggedIn } = useSecure();
    const [isPending, startTransition] = useTransition();

    // const [subjectId, setSubjectId] = useState<string>();
    const [subject, setSubject] = useState<any>();
    const [modelTests, setModelTests] = useState([]);

    useEffect(() => {
        const _subjectId = Array.isArray(params.subjectId) ? params.subjectId[0] : params.subjectId;
        // setSubjectId(_subjectId);

        startTransition(async () => {
            if (_subjectId) {
                const _subject = await getAcademicSubject(_subjectId);
                setSubject(_subject);

                const _modelTests = await loadAcademicModelTest(1, 50, _subjectId);
                setModelTests(_modelTests.data);
            }

        })


    }, [params]);

    if (isPending) {
        return <Loading />
    }


    return (
        <>
            <div className="px-6 my-5">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-200 rounded-2xl p-6 shadow-sm border border-blue-100">
                    <h1 className="text-3xl font-extrabold text-blue-700">Question Bank - {subject?.title}</h1>

                    <p className="mt-2 text-blue-800 text-base">
                        Choose Board & review
                    </p>

                </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-6 gap-6 ">

                <div className="lg:col-span-4 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {modelTests.map((data: any, index: number) => (
                            <div key={index}>
                                {/* <Link href={`../mt?s=${subject._id}&i=${data.instituteId}`}> */}
                                <Link href={`../mt/${data._id}`}>
                                    <Card className="w-full min-h-[110px] p-6 text-sm font-semibold border border-b-4 rounded-xl hover:bg-gray-200 hover:text-gray-900 transition-all">
                                        <CardHeader className="p-0 mb-2">
                                            <h1 className="text-base text-gray-600">{subject.title}</h1>
                                            <CardTitle className="text-sm font-bold text-black">
                                                {data.title} - {data.year}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardFooter className="p-0 mt-2 flex items-center gap-4 text-xs">
                                            <span className="flex items-center gap-1">
                                                <ListCheck className="text-xs" />
                                                {data.mcqCount}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="text-xs" />
                                                {data.mcqCount} min
                                            </span>
                                        </CardFooter>

                                    </Card>
                                </Link>

                            </div>
                        ))}
                    </div>
                </div>


                <div className="lg:col-span-2 space-y-6">
                    {
                        isLoggedIn && (
                            <>
                                <StreakCount />
                            </>
                        )
                    }

                    <SubjectProgress />

                    <RecentTest />

                </div>

            </div>



        </>
    )

}


export default QuestionBankSubject;