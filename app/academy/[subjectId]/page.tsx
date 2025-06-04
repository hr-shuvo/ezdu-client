'use client';

import Loading from "@/app/(main)/courses/loading";
import { loadAcademicLesson } from "@/app/_services/academy/academyLessonService";
import { getAcademicSubject, loadAcademicSubject } from "@/app/_services/academy/academySubjectService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TreeNode } from "primereact/treenode";
import { Card, CardContent, CardTitle } from "@/components/ui/card";


const AcademySubjectPage = () => {
    const params = useParams();
    const [isPending, startTransition] = useTransition();

    const [subject, setSubject] = useState<any>();
    const [subjects, setSubjects] = useState<any>([]);
    const [lessons, setLessons] = useState<any>([]);

    const [expandedKeys, setExpandedKeys] = useState({});

    useEffect(() => {
        setExpandedKeys({});
        startTransition(async () => {
            const subjectId = Array.isArray(params.subjectId) ? params.subjectId[0] : params.subjectId;
            const _subject = await getAcademicSubject(subjectId);
            setSubject(_subject);
            const _subjects = await loadAcademicSubject('', 1, 100, _subject.classId);
            setSubjects(_subjects.data);

            const _lessons = await loadAcademicLesson(1, 1000, subjectId)
            setLessons(toPrimeReactTree(_lessons.data));

            console.log(_lessons.data);
        });

    }, [params.subjectId]);


    const toPrimeReactTree = (list: any[]): TreeNode[] => {
        const _expandedKeys: { [key: string]: boolean } = {};

        const tree = list.map((node: any) => {
            const hasChildren = node.children && node.children.length > 0;
            if (hasChildren) {
                _expandedKeys[node._id] = true;
            }

            return {
                key: node._id,
                name: node.title,
                data: {
                    title: node.title,
                    subTitle: node.subTitle,
                    description: node.description
                },
                children: node.children ? toPrimeReactTree(node.children) : []
            }
        });

        setExpandedKeys(_expandedKeys);
        return tree;
    };


    if (isPending) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <div className="px-6 my-5">
                <h1 className="text-3xl">Subject - {subject?.title}</h1>
            </div>

            <div className='flex flex-col md:flex-row gap-2 px-6'>

                <div className=' md:w-3/4 w-full'>
                    <div className='mb-2 flex gap-2'>
                        <Input placeholder="search" />
                        <Button variant={'outline'} className="w-5"><Search className="" /></Button>
                    </div>

                    <div>
                        <TreeTable
                            value={lessons}
                            tableStyle={{ minWidth: '' }}
                            expandedKeys={expandedKeys}
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
                                                <h1 className="text-3xl">{rowData.name}</h1>
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

                                                    <Button variant='primaryOutline' size={'xsm'}>MCQ</Button>
                                                    <Button variant='superOutline' size={'xsm'}>Model Test</Button>

                                                </div>
                                            )
                                        }


                                    </div>

                                )}
                            />
                            <Column field="subTitle" header="Subtitle" />
                        </TreeTable>
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

                                    <div className="flex flex-col gap-2 mb-2 hover:border-b-4" key={item._id}>

                                        <div className="flex item-center justify-between">
                                            <Link href={'#'} className="p-2">
                                                <h1 className='text-xl'>{item.title}</h1>
                                            </Link>

                                            <Link href={'#'}>
                                                <Badge className="h-5 rounded-full" variant={'secondary'}>mcq</Badge>
                                            </Link>

                                        </div>
                                    </div>
                                ))
                            }

                        </CardContent>

                    </Card>



                </div>


            </div>
        </>
    )
};

export default AcademySubjectPage;