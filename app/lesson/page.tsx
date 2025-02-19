import { getUserProgress } from "@/services/courseService";
import { getLesson } from "@/services/lessonService";
import { redirect } from "next/navigation";
import Quiz from "./quiz";

const LessonPage = async () => {
    const lessonData = getLesson();
    const userProgressData = getUserProgress();

    const [lesson, userProgress] = await Promise.all([
        lessonData,
        userProgressData,
    ]);

    // console.log(lesson);

    if (!lesson || !userProgress) {
        redirect("/learn");
    }

    const initialPercentage =
        (lesson.challenges.filter((challenge: any) => {
            return challenge.completed === true;
        }).length /
            lesson.challenges.length) *
        100;

    return (
        <Quiz initialLessonId={lesson._id}
        initialLessonChallenges ={lesson.challenges}
        initialHearts={userProgress.hearts}
        initialPercentage={initialPercentage}
        userSubscription={null}
        />
    );
};

export default LessonPage;
