"use client";

import { Particle } from "@/components/custom-ui/particle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState, useTransition } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { loadAcademicClass } from "../_services/academy/academyService";
import { loadAcademicSubject } from "../_services/academy/academySubjectService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomPagination from "@/components/common/pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ADSense from "@/components/Ads/AdSense";
import Link from "next/link";

const AcademyPage = () => {
    const [isPending, startTransition] = useTransition();

    const [selectedItems, setSelectedItems] = useState<string[]>([])
    // const [selectedItem, setSelectedItem] = useState<string>()

    const [classes, setClasses] = useState<any>([]);
    const [subjects, setSubjects] = useState<any>([]);

    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleToggleChange = (values: string[]) => {
        setSelectedItems(values)
    }

    useEffect(() => {
        startTransition(async () => {
            const _classes = await loadAcademicClass(1, 1000);
            setClasses(_classes.data);
        });
    }, []);

    useEffect(() => {
        startTransition(async () => {
            const response = await loadAcademicSubject("", currentPage, pageSize, undefined, selectedItems);
            setSubjects(response.data);
            setTotalCount(response.totalCount);
            setTotalPage(response.totalPage);
            setCurrentPage(response.currentPage);
        });
    }, [currentPage, pageSize, selectedItems]);




    return (
        <>
            <div>
                <Particle title={'Subjects'} />
            </div>


            <div className='flex flex-col md:flex-row gap-2 px-6'>
                <div className='md:w-1/4 w-full p-4 pb-10'>

                    <div className='py-2 text-green-900 text-xl'>
                        Select Class
                    </div>

                    <div>
                        <ToggleGroup
                            variant="primary"
                            type="multiple"
                            className='flex flex-col'
                            onValueChange={handleToggleChange}
                            value={selectedItems}
                            disabled={isPending}
                        >
                            {
                                classes.map((item: { _id: string, title: string }, index: number) => (
                                    <ToggleGroupItem
                                        key={index}
                                        value={item._id}
                                        aria-label={`Toggle ${item._id}`}
                                        className='w-full'
                                    >
                                        <h1 className='font-bold'>{item.title}</h1>
                                    </ToggleGroupItem>

                                ))
                            }

                        </ToggleGroup>
                    </div>


                </div>

                <Separator orientation='vertical' className="h-auto w-[1px]" />

                <div className=' md:w-3/4 w-full p-4'>
                    <div className='mb-2 flex gap-2'>
                        <Input placeholder="search" />
                        <Button variant={'outline'} className="w-5"><Search className="" /></Button>
                    </div>

                    <div>
                        <Table className='w-full  [&>tbody>tr:nth-child(even)]:bg-gray-50'>

                            <TableBody>
                                {
                                    subjects.length > 0 && (
                                        subjects.map((item: any, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <div>
                                                        <div>
                                                            <h1 className='text-3xl font-bold'>{item.title}</h1>

                                                        </div>

                                                        <div className='flex justify-around gap-3 mt-5'>

                                                            <Button variant='primaryOutline' size={'xsm'}>tag</Button>
                                                            <Button variant='secondaryOutline' size={'xsm'}>MCQ</Button>
                                                            <Button variant='superOutline' size={'xsm'}>Written</Button>
                                                            <Button variant='secondaryOutline' size={'xsm'}>Board Question</Button>
                                                            <Button variant='primaryOutline' size={'xsm'}>Model Test</Button>
                                                            <Button variant='superOutline' size={'xsm'}>Quiz</Button>

                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div>
                                                        <Link href={`./academy/${item._id}`}>
                                                            <InteractiveHoverButton>Read</InteractiveHoverButton>
                                                        </Link>
                                                    </div>

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
            </div>




            <div className="mt-5 w-full">
                <ADSense />
            </div>
        </>
    )
};

export default AcademyPage;


