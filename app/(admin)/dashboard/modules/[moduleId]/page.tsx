import { getModule } from "@/app/_services/modules-services";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Table } from "lucide-react";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";


const ModuleDetailsPage = async ({ params }: any) => {

    const moduleId = (await params).moduleId;

    const moduleData = getModule(moduleId);


    const [
        data
    ] = await Promise.all([
        moduleData
    ]);




    return (
        <>

            <div className="w-full my-5 p-5 border">

                <div className="flex justify-between">
                    <h1 className="text-4xl">Module Details</h1>
                    <Button> <IoArrowBack /> <span>Back</span></Button>
                </div>

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
                                <Link href="./" className="text-blue-500 hover:underline">Modules</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Details</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>


                <div className="my-5">
                    <div className="my-5">
                        <h1 className="text-4xl font-bold">{data.title}</h1>
                        <h3>{data.subTitle}</h3>
                    </div>
                    <div className="flex justify-start text-xl gap-2">
                        <div>2348 learner</div>
                        <div className="flex justify-between gap-2"><Table /> {data.totalCourse} courses</div>

                    </div>

                </div>




                <div>

                </div>


            </div>


        </>
    );
};

export default ModuleDetailsPage;