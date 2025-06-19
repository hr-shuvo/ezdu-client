'use client';

import { useState, useEffect, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { getAdmissionLearningPath } from '@/app/_services/admission/admission-service';
import LearningPath from './learning-path';
import Loading from '@/app/(main)/learn/loading';
import ChooseUnit from './choose-unit';


const LearningPathHome = () => {
    const params = useParams();
    const [isPending, startTransition] = useTransition();
    const [learningPath, setLearningPath] = useState<any>();


    const category: string = Array.isArray(params.category) ? params.category[0] : params.category!;

    useEffect(() => {
        startTransition(async () => {
            const _path = await getAdmissionLearningPath(category);
            // console.log(_path);
            setLearningPath(_path);
        })
    },[params.category])

    if (isPending || !learningPath) {
        return <Loading />
    }

    return (
        <>
            {
                learningPath?.units && learningPath?.units?.length > 0 ? (
                    <ChooseUnit units={learningPath?.units} />
                ) : (

                    <LearningPath learningPath={learningPath}/>

                )
            }


        </>


    );
}


export default LearningPathHome;