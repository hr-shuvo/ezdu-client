'use client';

import { getCourse } from "@/app/_services/course-services";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Loading from "../../modules/loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { Pencil } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const CourseDetailsPage = () => {
    const params = useParams();
    const [course, setCourse] = useState<any>();


    const [isPending, startTransition] = useTransition();


    useEffect(() => {
        startTransition(async () => {
            const courseId = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId;

            const course = await getCourse(courseId);
            setCourse(course);

        })
    }, [params.courseId]);


    if (isPending) {
        return <Loading />
    }


    return (
        <>
            <div className="w-full flex-col">
                <div className="w-full my-5 p-5 border">

                    <div className="flex justify-between">
                        <h1 className="text-4xl">Course Details</h1>
                        <div className="gap-2 flex">
                            <Link href={`../modules/${course?.moduleId}`}>
                                <Button size='sm'> <IoArrowBack /> <span>Back</span></Button>
                            </Link>
                            <Link href={`./form/${course?._id}`}>
                                <Button variant='sidebarOutline' size='sm'> <Pencil /> <span>Edit</span></Button>
                            </Link>
                        </div>
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
                                    <Link href="./" className="text-blue-500 hover:underline">Courses</Link>
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
                            <h1 className="text-4xl font-bold">{course?.title}</h1>
                            {/* <h3>{course?.subTitle}</h3> */}
                        </div>
                        <div className="flex justify-start text-xl gap-2">
                            <div>2348 learner</div>
                            <div className="flex justify-between gap-2"> 22 courses</div>

                        </div>

                    </div>


                </div>
            </div>
        </>

    )
};

export default CourseDetailsPage;