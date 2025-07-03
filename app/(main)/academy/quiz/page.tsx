'use client';

import { useEffect, useState, useTransition } from "react";
import { ChooseQuizTopic } from "./choose-quiz-topic";
import { ShowQuizSummary } from "./show-quiz.summary";
import { AcademyQuiz } from "./academy-quiz";
import { getOngoingQuiz, loadOrCreateQuize } from "@/app/_services/academy/academy-quiz-service";
import Loading from "@/app/(voclift)/learn/loading";
import { useSecure } from "@/context/SecureContext";
import { toast } from "sonner";


const AcademyQuizPage = () => {
    const { isLoggedIn } = useSecure();
    const [isPending, startTransition] = useTransition();
    const [quizView, setQuizView] = useState<'topic' | 'summary' | 'quiz'>('topic');
    const [quiz, setQuiz] = useState();
    const [selectedLessons, setSelectedLessons] = useState<[]>([]);
    // const [duration, setDuration] = useState<number>(15);
    // const [quizType, setQuizType] = useState<"cq" | "mcq">("mcq");
    const [subjectId, setSubjectId] = useState<string>();

    useEffect(() => {
        if (isLoggedIn) {
            startTransition(async () => {
                const _quiz = await getOngoingQuiz();
                if (_quiz && _quiz.data) {
                    setQuiz(_quiz.data);
                    setQuizView("quiz");
                }
            })
        }
    }, [isLoggedIn]);

    const handleChooseTopicClick = (event: 'summary' | 'cancel', _subjectId:string, lessons: []) => {
        // console.log("Data from child:", event);
        // console.log('subjectId: ', _subjectId);
        setSubjectId(_subjectId);

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
        if(!isLoggedIn){
            toast.message("You must be logged in")
            return;
        }
        // setDuration(duration);
        // setQuizType(type);
        const _lessonIds = selectedLessons.map((lesson: { _id: string }) => lesson._id);

        startTransition(async () => {
            const _quiz = await loadOrCreateQuize(duration, subjectId!, _lessonIds, type);
            if (_quiz) {
                // console.log("_quiz: ", _quiz)
                setQuiz(_quiz.data);
                setQuizView('quiz');
            }
        });
    }

    if (isPending) {
        return <Loading />
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
                    quizView == 'quiz' && quiz && !isPending && (
                        <AcademyQuiz quiz={quiz} />
                    )
                }
            </div>

        </>
    )

};

export default AcademyQuizPage;