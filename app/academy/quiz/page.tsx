'use client';

import { useEffect, useState, useTransition } from "react";
import { RecentTest } from "../_components/recent-test";
import { StreakCount } from "../_components/streak-count";
import { SubjectProgress } from "../_components/subject-progress";
import { loadAcademicClass } from "@/app/_services/academy/academyService";
import { loadAcademicSubject } from "@/app/_services/academy/academySubjectService";
import { loadAcademicLesson } from "@/app/_services/academy/academyLessonService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChooseQuizTopic } from "./choose-quiz-topic";
import { ShowQuizSummary } from "./show-quiz.summary";


const AcademyQuizPage = () => {
    const [isPending, startTransition] = useTransition();


    const [selectedLessons, setSelectedLessons] = useState<[]>([]);

    const [quizView, setQuizView] = useState<'topic' | 'summary' | 'quiz'>('topic');

    const handleChooseTopicClick = (event: 'summary' | 'cancel', lessons:[]) => {
        console.log("Data from child:", event);
        console.log('lessons: ', lessons);

        if(event == 'summary'){            
            setSelectedLessons(lessons);
            setQuizView('summary');
        }
        else{
            setSelectedLessons([]);
            setQuizView('topic');
        }


    };



    function startQuiz(): void {
        console.log('start quiz with: ', selectedLessons)
    }

    return (
        <>

            <div>
                {
                    quizView == 'topic' && (
                        <ChooseQuizTopic onClickItem={handleChooseTopicClick } />
                    )
                }

                {
                    quizView == 'summary' && (
                        <ShowQuizSummary lessons={selectedLessons}/>
                    )
                }
            </div>



        </>
    )





};

export default AcademyQuizPage;