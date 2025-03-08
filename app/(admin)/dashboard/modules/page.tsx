import {loadModules} from "@/app/_services/modules-services";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Button} from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {Eye, Pencil, PlusCircle, Trash} from "lucide-react";
import Link from "next/link";

const DashboardModulesPage = async () => {

    const moduleData = loadModules();

    const [
        modules
    ] = await Promise.all([
        moduleData
    ])

    // console.log(modules);


    return (
        <>

            <div className="w-full my-5 p-5 border">

                <div className="my-5">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <Link href="/" className="text-blue-500 hover:underline">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <Link href="/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
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
                                <PlusCircle/><span> Add</span>
                            </Button>
                        </Link>

                    </div>
                </div>

                <div className="w-full ">
                    <Table className="">


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
                                modules.map((module) => (
                                    <TableRow key={module._id}>
                                        <TableCell>{module.title}</TableCell>
                                        <TableCell>{module.subTitle}</TableCell>
                                        <TableCell>{module.totalCourse}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-center gap-1">
                                                <Link href={`./modules/${module._id}`}><Button variant='default'
                                                                                               size='sm'><Eye/></Button></Link>

                                                <Link href={`./modules/form/${module._id}`}><Button variant='default'
                                                                         size='sm'><span><Pencil/></span></Button></Link>
                                                <Link href={'#'}><Button variant='destructiveOutline'
                                                                         size='sm'><span><Trash/></span></Button></Link>


                                            </div>
                                        </TableCell>

                                    </TableRow>

                                ))
                            }
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>

                            </TableRow>
                        </TableFooter>

                    </Table>
                </div>


            </div>


        </>
    )
};

export default DashboardModulesPage;