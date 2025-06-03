'use client';

import Loading from "@/app/(main)/courses/loading";
import { getAcademicSubject } from "@/app/_services/academy/academySubjectService";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const AcademySubjectPage = () => {
    const params = useParams();
    const [isPending, startTransition] = useTransition();

    const [subject, setSubject] = useState<any>();

    useEffect(() => {
        startTransition(async () => {

            const _subject = await getAcademicSubject(params.subjectId);
            setSubject(_subject);

            console.log(_subject);

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
                Academy suject
            </div>

            <div>
                {subject?.title}
            </div>
        </>
    )
};

export default AcademySubjectPage;