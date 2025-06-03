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
import { TreeNode } from "primereact/treenode";


const AcademySubjectPage = () => {
    const params = useParams();
    const [isPending, startTransition] = useTransition();

    const [subject, setSubject] = useState<any>();
    const [lessons, setLessons] = useState<any>([]);

    const [expandedKeys, setExpandedKeys] = useState({});

    useEffect(() => {
        setExpandedKeys({});
        startTransition(async () => {
            const subjectId = Array.isArray(params.subjectId) ? params.subjectId[0] : params.subjectId;
            const _subject = await getAcademicSubject(subjectId);
            setSubject(_subject);

            const _lessons = await loadAcademicLesson(1, 1000, subjectId)
            setLessons(toPrimeReactTree(_lessons.data));

            console.log(_lessons.data);
        });

    }, [params.subjectId]);


    const toPrimeReactTree = (list: any[]): TreeNode[] => {
        const _expandedKeys: { [key: string]: boolean } = {};


        const tree = list.map((node: any) => {

            const hasChildren = node.children && node.children.length > 0;

            if(hasChildren){
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

                <div className='md:w-1/5 w-full p-4 pb-10'>
                </div>


            </div>
        </>
    )
};

export default AcademySubjectPage;