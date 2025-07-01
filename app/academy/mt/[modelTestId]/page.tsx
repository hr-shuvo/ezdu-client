'use client';

import { loadAcademyMcq } from "@/app/_services/academy/academyMcqService";
import { getAcademicModelTest } from "@/app/_services/qb/questionBankService";
import Loading from "@/app/auth/login/loading";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { StreakCount } from "../../_components/streak-count";
import { SubjectProgress } from "../../_components/subject-progress";
import { RecentTest } from "../../_components/recent-test";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ADSense from "@/components/Ads/AdSense";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Search } from "lucide-react";


const ModelTest = () => {
    const params = useParams();
    const [isPending, startTransition] = useTransition();
    const [showLevelAndAnswer, setShowLevelAndAnswer] = useState(false);
    const [modelTest, setModelTest] = useState<any>();
    const [mcqs, setMcqs] = useState<any[]>([]);

    useEffect(() => {
        const _modelTestId = Array.isArray(params.modelTestId) ? params.modelTestId[0] : params.modelTestId;
        // console.log(_modelTestId);

        if (_modelTestId) {
            startTransition(async () => {
                const _modelTest = await getAcademicModelTest(_modelTestId)
                // console.log(_modelTest);

                if (_modelTest) {
                    setModelTest(_modelTest);
                    const instituteIds = [modelTest?.instituteId];
                    const _mcqs = await loadAcademyMcq(1, 100, _modelTest.subjectId, null!, instituteIds, modelTest?.year);
                    // console.log(_mcqs.data);
                    setMcqs(_mcqs.data);
                }

            })

        }

    }, [params]);

    if (isPending) {
        return <Loading />
    }



    return (
        <>
            <div className="px-6 my-5">
                <div className="bg-gradient-to-r from-sky-50 to-indigo-200 rounded-xl p-6 shadow-sm border border-blue-100">
                    <h1 className="text-3xl font-bold text-sky-800 flex gap-2">
                        <span>{modelTest?.subject?.title}</span>
                        <span>|</span>
                        <span>{modelTest?.title}</span>
                    </h1>

                    <p className="mt-3 text-gray-700">
                        Ready to test your knowledge? Try the quiz or explore more materials below!
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <Button variant={'primary'}>
                            Take Quiz
                        </Button>
                        <Button variant={'secondary'}>
                            View Other Questions
                        </Button>
                        <Button variant={'super'}>
                            Download Notes
                        </Button>
                    </div>
                </div>
            </div>


            <div className='flex flex-col md:flex-row gap-2 px-6'>

                <div className=' md:w-3/4 w-full'>
                    <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">

                        <div className="flex items-center w-full gap-2">
                            <Input placeholder="Search" className="flex-1" />
                            <Button variant="outline" size="icon">
                                <Search className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* <div className="flex items-center gap-2 whitespace-nowrap">
                            <Switch
                                id="show-toggle"
                                checked={showLevelAndAnswer}
                                onCheckedChange={setShowLevelAndAnswer}
                                className="scale-125"
                            />
                            <Label htmlFor="show-toggle" className="text-sm md:text-xl font-bold cursor-pointer">Show Level & Correct Answer</Label>
                        </div> */}

                        <Button className="flex justify-start" onClick={() => setShowLevelAndAnswer}>
                            <div className="flex items-center gap-2 justify-start w-auto" >
                                <Switch
                                    id="show-toggle"
                                    checked={showLevelAndAnswer}
                                    onCheckedChange={setShowLevelAndAnswer}
                                    className="scale-100"
                                />
                                <Label htmlFor="show-toggle" className="text-sm md:text-xl font-bold cursor-pointer">Show Level & Correct Answer</Label>

                            </div>

                        </Button>
                    </div>


                    <div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {
                                mcqs.length > 0 && mcqs.map((item: any, index: number) => (

                                    <div key={index}>
                                        <Card>
                                            <CardHeader className="border-b ">
                                                <CardTitle>
                                                    <h1 className='text-sm'>{index+1}. {item.question}</h1>
                                                </CardTitle>
                                            </CardHeader>

                                            <CardContent>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                                                    {
                                                        item.optionList.map((option: any, optIdx: number) => (
                                                            <div key={optIdx} className="p-2 flex items-center gap-2">
                                                                <span>{option.correct && showLevelAndAnswer ? (<CheckCircle className="text-green-500" />) : (<Circle />)}</span>
                                                                <h1 className="text-sm"> {option.text}</h1>
                                                            </div>
                                                        ))

                                                    }
                                                </div>

                                            </CardContent>

                                        </Card>

                                    </div>


                                ))
                            }

                        </div>


                    </div>


                </div>


                {/* <Separator orientation='vertical' className="h-auto w-[1px]" /> */}

                <div className='md:w-1/4 w-full pb-10 space-y-6'>

                    <StreakCount />

                    <SubjectProgress />

                    <RecentTest />


                    <Card>
                        <ADSense />
                    </Card>

                </div>


            </div>
        </>
    )
}

export default ModelTest;