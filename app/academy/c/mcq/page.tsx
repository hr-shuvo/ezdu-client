'use client';

import Loading from "@/app/(main)/learn/loading";
import { loadAcademyMcq } from "@/app/_services/academy/academyMcqService";
import { getAcademicSubject, loadAcademicSubject } from "@/app/_services/academy/academySubjectService";
import ADSense from "@/components/Ads/AdSense";
import CustomPagination from "@/components/common/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CheckCircle, Circle, Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";


const ContentMcqPage = () => {
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [showLevelAndAnswer, setShowLevelAndAnswer] = useState(false);


    const [subject, setSubject] = useState<any>();
    const [subjects, setSubjects] = useState<any>([]);
    const [mcqList, setMcqList] = useState<any[]>([]);

    const subjectId = searchParams.get('s');
    const lessonId = searchParams.get('l');

    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        startTransition(async () => {
            const _subject = await getAcademicSubject(subjectId);
            setSubject(_subject);
            const _subjects = await loadAcademicSubject('', 1, 100, _subject.classId);
            setSubjects(_subjects.data);
            const _mcqList = await loadAcademyMcq(1, 100, subjectId!, lessonId!);
            setMcqList(_mcqList.data);
            setTotalCount(_mcqList.totalCount);
            setTotalPage(_mcqList.totalPage);
            setCurrentPage(_mcqList.currentPage);

        });

    }, []);

    if(isPending){
        return <Loading/>
    }


    return (
        <>


            <div className="px-6 my-5">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-200 rounded-xl p-6 shadow-sm border border-blue-100">
                    <h1 className="text-3xl font-bold text-blue-800">{subject?.title}</h1>

                    <p className="mt-3 text-gray-700">
                        Ready to test your knowledge? Try the quiz or explore more materials below!
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <Button variant={'primary'}>
                            Take Quiz
                        </Button>
                        <Button variant={'secondary'}>
                            View More MCQs
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


                    {/* bg-gradient-to-r from-white via-indigo-100 to-blue-100 */}
                    <div>
                        <Table className='w-full  [&>tbody>tr:nth-child(even)]:bg-gray-50 border'>

                            <TableBody>
                                {
                                    mcqList.length > 0 && (
                                        mcqList.map((item: any, index: number) => (
                                            <TableRow key={index} className="w-full">
                                                <TableCell className="w-12">
                                                    <span className="block">{(currentPage - 1) * pageSize + index + 1}</span>
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

                                                        <CardFooter>

                                                        </CardFooter>
                                                    </Card>
                                                </TableCell>

                                            </TableRow>

                                        ))
                                    )
                                }

                            </TableBody>

                        </Table>

                    </div>

                    <div className="flex items-center justify-between space-x-2 py-4">
                        <div className="flex items-center text-sm text-muted-foreground gap-2">
                            <div>{totalCount} items found</div>
                            <div>
                                <Select value={pageSize.toString()}
                                    onValueChange={(value) => setPageSize(Number(value))}>
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-x-2">
                            <CustomPagination
                                totalPage={totalPage}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </div>

                </div>


                <Separator orientation='vertical' className="h-auto w-[1px]" />

                <div className='md:w-1/4 w-full pb-10'>
                    <Card>
                        <CardTitle><div className="m-3 text-center">
                            <h1 className="text-2xl font-bold">{subject?.academyClass?.title}</h1>
                        </div>

                        </CardTitle>
                        <CardContent>
                            {subjects.length > 0 &&
                                subjects.map((item: { _id: string, title: string }, index: number) => (

                                    <div className="flex flex-col gap-2 mb-2 hover:border-b-4" key={index}>

                                        <div className="flex item-center justify-between">
                                            <Link href={'#'} className="p-2">
                                                <h1 className='text-xl'>{item.title}</h1>
                                            </Link>

                                            <Link href={`#`}>
                                                <Badge className="h-5 rounded-full" variant={'secondary'}>mcq</Badge>
                                            </Link>

                                        </div>
                                    </div>
                                ))
                            }

                        </CardContent>

                    </Card>

                    <Card>
                        <ADSense />
                    </Card>

                </div>


            </div>
        </>
    )
};

export default ContentMcqPage;