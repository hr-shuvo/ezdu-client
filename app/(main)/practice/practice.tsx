'use client';

import { useState, useTransition } from "react";
import ChooseTopic from "@/app/(main)/practice/choose-topic";
import PracticeQuiz from "@/app/(main)/practice/quiz";
import { loadAcademyMcq } from "@/app/_services/academy/academyMcqService";

const AcademyPractice = () => {
    const [isPending, startTransition] = useTransition();
    const [challenges, setChallenges] = useState<any[]>([]);
    const [showQuiz, setShowQuiz] = useState(false);


    function handleStartPractice(subjectId:string, lessonIds:string[]) {
        console.log(subjectId, lessonIds);

        startTransition(async () =>{
            //TODO: update to loadRandomMcq(subjectId, lessonIds)
            const response = await loadAcademyMcq(1, 40, subjectId);
            if(response.data.length > 0){
                setChallenges(response.data);
                setShowQuiz(true);
            }
        })

    }

    return (
        <>
            {
                showQuiz && !isPending ? (
                    <PracticeQuiz
                        initialChallenges={challenges}
                        initialPercentage={0}
                        userSubscription={null} // TODO:Replace with actual user subscription data if needed
                    />
                ) : (
                    <ChooseTopic onClickItem={handleStartPractice}/>
                )

            }


        </>
    );
};

export default AcademyPractice;
