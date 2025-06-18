'use client';

import Loading from "@/app/(main)/courses/loading";
import { getAcademicModelTest } from "@/app/_services/qb/questionBankService";
import ADSense from "@/components/Ads/AdSense";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CheckCircle, Circle, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { StreakCount } from "../_components/streak-count";
import { SubjectProgress } from "../_components/subject-progress";
import { RecentTest } from "../_components/recent-test";

const AcademyModelTest = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [showLevelAndAnswer, setShowLevelAndAnswer] = useState(false);


    // const [subjectId, setSubjectId] = useState<string>('');
    // const [instituteId, setInstituteId] = useState<string>('');

    const [modelTest, setModelTest] = useState<any>([]);

    useEffect(() => {
        const _subjectId = searchParams.get('s');
        const _instituteId = searchParams.get('i');

        if (!_subjectId || !_instituteId) {
            router.push('./qb');
        }

        // setSubjectId(_subjectId!);
        // setInstituteId(_instituteId!);

        startTransition(async () => {
            const _modelTest = await getAcademicModelTest(_subjectId!, _instituteId!);
            setModelTest(_modelTest.data);
        })

    }, [searchParams, router]);

    // console.log('model test: ', modelTest);

    if (isPending) {
        return <Loading />
    }


    return (
        <>
            <div className="px-6 my-5">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-200 rounded-xl p-6 shadow-sm border border-blue-100">
                    <h1 className="text-3xl font-bold text-blue-800">Model test</h1>

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


                        <div className="flex items-center gap-2 whitespace-nowrap">
                            <Switch
                                id="show-toggle"
                                checked={showLevelAndAnswer}
                                onCheckedChange={setShowLevelAndAnswer}
                                className="scale-125"
                            />
                            <Label htmlFor="show-toggle" className="text-sm md:text-xl font-bold cursor-pointer">Show Level & Correct Answer</Label>
                        </div>
                    </div>


                    <div>
                        <Table className='w-full  [&>tbody>tr:nth-child(even)]:bg-gray-50 border'>

                            <TableBody>
                                {
                                    modelTest.length > 0 && (
                                        modelTest.map((item: any, index: number) => (
                                            <TableRow key={index} className="w-full">
                                                <TableCell className="w-12">
                                                    <span className="block">{index + 1}</span>
                                                </TableCell>
                                                <TableCell>
                                                    <Card>
                                                        <CardHeader className="border-b">
                                                            <CardTitle>
                                                                <h1 className='text-xl'>{item.question}</h1>
                                                            </CardTitle>
                                                        </CardHeader>

                                                        <CardContent>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                                                                {
                                                                    item.optionList.map((option: any, optIdx: number) => (
                                                                        <div key={optIdx} className="p-2 flex items-center gap-2">
                                                                            <span>{option.correct && showLevelAndAnswer ? (<CheckCircle className="text-green-500" />) : (<Circle />)}</span>
                                                                            <h1> {option.text}</h1>
                                                                        </div>
                                                                    ))

                                                                }
                                                            </div>

                                                        </CardContent>

                                                    </Card>
                                                </TableCell>

                                            </TableRow>

                                        ))
                                    )
                                }

                            </TableBody>

                        </Table>

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
};

export default AcademyModelTest;