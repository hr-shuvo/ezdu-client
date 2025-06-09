'use client';

import { useEffect, useState, useTransition } from "react";
import { ChooseQuizTopic } from "./choose-quiz-topic";
import { ShowQuizSummary } from "./show-quiz.summary";
import { AcademyQuiz } from "./academy-quiz";
import { getOngoingQuiz, loadOrCreateQuize } from "@/app/_services/academy/academy-quiz-service";
import Loading from "@/app/(main)/learn/loading";


const AcademyQuizPage = () => {
    const [isPending, startTransition] = useTransition();
    const [quizView, setQuizView] = useState<'topic' | 'summary' | 'quiz'>('topic');
    const [quiz, setQuiz] = useState();
    const [selectedLessons, setSelectedLessons] = useState<[]>([]);
    // const [duration, setDuration] = useState<number>(15);
    const [quizTtpe, setQuizType] = useState<"cq" | "mcq">("mcq");

    useEffect(() => {
        startTransition(async () => {
            const _quiz = await getOngoingQuiz();
            if (_quiz && _quiz.data) {
                setQuiz(_quiz.data);
                setQuizView("quiz");
            }
        })
    }, []);

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

    function handleStartQuizFromSummary(type: "cq" | "mcq", duration: number): void {
        // setDuration(duration);
        setQuizType(type);

        const _lessonIds = selectedLessons.map((lesson: { _id: string }) => lesson._id);

        startTransition(async () => {
            const _quiz = await loadOrCreateQuize(duration, _lessonIds, quizTtpe);
            if (_quiz) {
                setQuiz(_quiz);
                setQuizView('quiz');
            }
        });
    }

    if(isPending){
        return <Loading/>
    }

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
                    quizView == 'quiz' && (
                        <AcademyQuiz quiz={quiz!}/>
                    )
                }
            </div>

        </>
    )

};

export default AcademyQuizPage;