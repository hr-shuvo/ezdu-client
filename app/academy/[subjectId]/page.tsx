'use client';

import Loading from "@/app/(main)/courses/loading";
import { loadAcademicLesson } from "@/app/_services/academy/academyLessonService";
import { getAcademicSubject } from "@/app/_services/academy/academySubjectService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const AcademySubjectPage = () => {
    const params = useParams();
    const [isPending, startTransition] = useTransition();

    const [subject, setSubject] = useState<any>();
    const [lessons, setLessons] = useState<any>([]);

    useEffect(() => {
        startTransition(async () => {
            const subjectId = Array.isArray(params.subjectId) ? params.subjectId[0] : params.subjectId;
            const _subject = await getAcademicSubject(subjectId);
            setSubject(_subject);

            const _lessons = await loadAcademicLesson(1, 1000, subjectId)
            setLessons(_lessons.data);

            console.log(_lessons.data);
        });


    }, [params.subjectId]);

    if (isPending) {
        return (
            <Loading />
        )
    }


    return (
        <>
            <div>
                Academy suject - {lessons?.length}
            </div>

            <div className='flex flex-col md:flex-row gap-2 px-6'>

                <div className=' md:w-4/5 w-full p-4'>
                    <div className='mb-2 flex gap-2'>
                        <Input placeholder="search" />
                        <Button variant={'outline'} className="w-5"><Search className="" /></Button>
                    </div>

                    <div>
                        <Table className='w-full  [&>tbody>tr:nth-child(even)]:bg-gray-50'>
                            <TableBody>
                                {
                                    lessons.length > 0 && (
                                        lessons.map((item: any, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <div>
                                                        <div>
                                                            <h1 className='text-3xl font-bold'>{item.title}</h1>

                                                        </div>

                                                        <div className='flex justify-around gap-3 mt-5'>

                                                            <Button variant='primaryOutline' size={'xsm'}>tag</Button>

                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    {item.hasSubjectPaper ? (
                                                        <Button variant='primaryOutline' size={'xsm'}>True</Button>

                                                    ) : (
                                                        <Button variant='primaryOutline' size={'xsm'}>False</Button>

                                                    )}

                                                </TableCell>

                                            </TableRow>
                                        ))
                                    )
                                }

                            </TableBody>
                        </Table>
                    </div>


                </div>


                <Separator orientation='vertical' className="h-auto w-[1px]" />

                <div className='md:w-1/5 w-full p-4 pb-10'>
                </div>


            </div>
        </>
    )
};

export default AcademySubjectPage;