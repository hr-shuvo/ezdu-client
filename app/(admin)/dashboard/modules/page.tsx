'use client';

import { loadModules } from "@/app/_services/modules-services";
import { PaginatedList } from "@/app/utils/pagination";
import CustomPagination from "@/components/common/pagination";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DashboardModulesPage = () => {

    // const { data: modules, totalCount, totalPage, currentPage }: PaginatedList = await loadModules();
    // const [_, setCurrentPage] = useState(currentPage);
    // console.log(totalPage, currentPage);

    const [modules, setModules] = useState([]);
    const [totalCount, setTotalCount] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);


    useEffect(() => {
        const loadData = async () => {
            try {
                const response: PaginatedList = await loadModules(currentPage, pageSize);
                setModules(response.data);
                setTotalCount(response.totalCount);
                setTotalPage(response.totalPage);
                setCurrentPage(response.currentPage);
            }
            catch {
                toast.error('error')
            }
        }

        loadData();
    }, [currentPage, pageSize]);




    return (
        <>

            <div className="w-full  p-5 border">

                <div className="my-5">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <Link href="/" className="text-blue-500 hover:underline">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link href="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Modules</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>


                <div className="flex justify-between">
                    <div>
                        <h1 className="text-lg">Module List</h1>
                    </div>
                    <div>
                        <Link href="./modules/form">
                            <Button size='sm'>
                                <PlusCircle /><span> Add</span>
                            </Button>
                        </Link>

                    </div>
                </div>

                <div className="w-full">
                    <div className="flex items-center py-4">
                        <Input placeholder="Search" className="max-w-sm" />


                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Subtitle</TableHead>
                                    <TableHead>Total course</TableHead>
                                    <TableHead>Actiion</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {
                                    modules.length ?
                                        (modules.map((module: any) => (
                                            <TableRow key={module._id}>
                                                <TableCell>{module.title}</TableCell>
                                                <TableCell>{module.subTitle}</TableCell>
                                                <TableCell>{module.totalCourse}</TableCell>
                                                <TableCell>
                                                    <div className="flex justify-center gap-1">
                                                        <Link href={`./modules/${module._id}`}><Button variant='default'
                                                            size='sm'><Eye /></Button></Link>

                                                        <Link href={`./modules/form/${module._id}`}><Button variant='default'
                                                            size='sm'><span><Pencil /></span></Button></Link>
                                                        <Link href={'#'}><Button variant='destructiveOutline'
                                                            size='sm'><span><Trash /></span></Button></Link>


                                                    </div>
                                                </TableCell>

                                            </TableRow>

                                        ))) :
                                        (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={4}
                                                    className="h-24 text-center"
                                                >
                                                    No results.
                                                </TableCell>
                                            </TableRow>
                                        )
                                }
                            </TableBody>


                        </Table>

                    </div>



                    <div className="flex items-center justify-between space-x-2 py-4">
                        <div className="flex items-center text-sm text-muted-foreground gap-2">
                            <div>{totalCount} items found</div>
                            <div>
                                <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
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


        </>
    )
};

export default DashboardModulesPage;