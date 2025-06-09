'use client';

import { useEffect, useState, useTransition } from "react";
import { ChooseQuizTopic } from "./choose-quiz-topic";
import { ShowQuizSummary } from "./show-quiz.summary";
import { AcademyQuiz } from "./AcademyQuiz";


const AcademyQuizPage = () => {
    const [isPending, startTransition] = useTransition();
    const [selectedLessons, setSelectedLessons] = useState<[]>([]);
    const [quizView, setQuizView] = useState<'topic' | 'summary' | 'quiz'>('topic');

    const handleChooseTopicClick = (event: 'summary' | 'cancel', lessons: []) => {
        // console.log("Data from child:", event);
        // console.log('lessons: ', lessons);

        if (event == 'summary') {
            setSelectedLessons(lessons);
            setQuizView('summary');
        }
        else {
            setSelectedLessons([]);
            setQuizView('topic');
        }
    };

    function handleBackFromSummary(data: "topic"): void {
        if (data == 'topic') {
            setQuizView('topic')
        }
        // console.log('selected lessons: ', selectedLessons);
    }

    function handleStartQuizFromSummary(type: string, duration: number): void {
        console.log(type, duration, selectedLessons);
    }

    useEffect(() => {

    }, [])


    return (
        <>

            <div>
                {
                    quizView == 'topic' && (
                        <ChooseQuizTopic onClickItem={handleChooseTopicClick} />
                    )
                }

                {
                    quizView == 'summary' && (
                        <ShowQuizSummary
                            lessons={selectedLessons}
                            onBack={handleBackFromSummary}
                            onStart={handleStartQuizFromSummary}
                            onCancel={() => { }}
                        />
                    )
                }

                {
                    quizView == 'quiz' &&(
                        <AcademyQuiz/>
                    )
                }
            </div>

        </>
    )

};

export default AcademyQuizPage;