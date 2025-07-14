'use client';

import { useEffect, useState, useTransition } from "react";
import ChooseTopic from "@/app/(main)/practice/choose-topic";
import PracticeQuiz from "@/app/(main)/practice/quiz";
import { loadAcademyMcq } from "@/app/_services/academy/academyMcqService";

const AcademyPractice = () => {
    const [isPending, startTransition] = useTransition();
    const [challenges, setChallenges] = useState<any[]>([]);
    const [showQuiz, setShowQuiz] = useState(false);

    useEffect(() => {
        // startTransition(async() => {
        //     const _challenges = await loadAcademyMcq(1, 10)
        // })
    }, []);


    useEffect(() => {

    }, []);


    function handleStartPractice(data:string, subjectId:string, lessonIds:string[]) {
        console.log(data, subjectId, lessonIds);

        startTransition(async () =>{
            //TODO: update to loadRandomMcq(subjectId, lessonIds)
            const response = await loadAcademyMcq(1, 40, subjectId);
            if(response.data.length > 0){
                console.log(response.data);
                setChallenges(response.data);
                setShowQuiz(true);
            }
        })


    }

    return (
        <>
            {
                showQuiz ? (
                    <PracticeQuiz/>
                ) : (
                    <ChooseTopic onClickItem={handleStartPractice}/>
                )

            }


        </>
    );
};

export default AcademyPractice;
