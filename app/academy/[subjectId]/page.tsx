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

import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { classNames } from "primereact/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";


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
            setLessons(toPrimeReactTree(_lessons.data));

            console.log(_lessons.data);
        });

    }, [params.subjectId]);


    const toPrimeReactTree = (list: any) => {
        return list.map((node: any) => ({
            key: node._id,
            name: node.title,
            data: {
                title: node.title,
                subTitle: node.subTitle,
                description: node.description
            },
            children: node.children ? toPrimeReactTree(node.children) : []
        }));
    };




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
                        <TreeTable
                            value={lessons}
                            tableStyle={{ minWidth: '' }}
                            rowClassName={() => ({ 'h-24 hover:shadow-lg hover:bg-gray-100 border-b border-gray-300': true })}
                        >
                            <Column expander
                                style={{ width: '3rem', minWidth: '3rem', textAlign: 'center' }}
                            />
                            <Column
                                field="title"
                                header="Title"
                                className=""
                                body={(rowData) => (
                                    <div>
                                        <div>
                                            <Link href={'#'}>
                                                <h1 className="font-bold text-3xl">{rowData.name}</h1>
                                                {
                                                    rowData.children?.length > 0 && (
                                                        <Badge className="">{rowData.children?.length} items</Badge>
                                                    )
                                                }
                                            </Link>
                                        </div>

                                        {
                                            !rowData.children?.length && (
                                                <div className='flex justify-around gap-3 mt-5'>

                                                    <Button variant='primaryOutline' size={'xsm'}>tag</Button>

                                                </div>
                                            )
                                        }


                                    </div>

                                )}
                            />
                            <Column field="subTitle" header="Subtitle" />
                        </TreeTable>
                    </div>




                    <div className="mt-5">
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