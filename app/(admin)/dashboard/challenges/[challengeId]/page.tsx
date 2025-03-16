'use client';

import { getChallenge } from "@/app/_services/challenge-service";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Loading from "../../modules/loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { Pencil } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const ChallengeDetailsPage = () => {
    const params = useParams();
    const [challenge, setChallenge] = useState<any>();

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            const challengeId = Array.isArray(params.challengeId) ? params.challengeId[0] : params.challengeId;
            const challenge = await getChallenge(challengeId);
            setChallenge(challenge);
        })
    }, [params.challengeId]);

    if (isPending) {
        return <Loading />
    }


    return (
        <div className="w-full flex-col">
            <div className="w-full my-5 p-5 border">

                <div className="flex justify-between">
                    <h1 className="text-4xl">Challenge Details</h1>
                    <div className="gap-2 flex">
                        <Link href={`./form${challenge?.moduleId}`}>
                            <Button size='sm'> <IoArrowBack /> <span>Back</span></Button>
                        </Link>
                        <Link href={`./form/${challenge?._id}`}>
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
                                <Link href="/dashboard" className="text-blue-500 hover:underline">Units</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link href="/dashboard" className="text-blue-500 hover:underline">Lessons</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link href="/dashboard" className="text-blue-500 hover:underline">Challenges</Link>
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
                        <h1 className="text-4xl font-bold">{challenge?.question}</h1>
                        {/* <h3>{course?.subTitle}</h3> */}
                    </div>
                    <div className="flex justify-start text-xl gap-2">
                        <div>2348 learner</div>
                        <div className="flex justify-between gap-2"> 22 courses</div>

                    </div>

                </div>


            </div>

        </div>
    )
}


export default ChallengeDetailsPage;