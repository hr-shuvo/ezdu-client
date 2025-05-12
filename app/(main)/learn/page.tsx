import { FeedWrapper } from "@/components/layout/feed-wrapper";
import { StickyWrapper } from "@/components/layout/sticky-wrapper";
import { UserProgress } from "@/components/layout/user-progress";
import { redirect } from "next/navigation";
import { Header } from "./header";
import {
    getCourseProgress,
    getLessonPercentage,
    getUnits,
    getUserProgress,
} from "@/services/progressService";
import { Unit } from "./unit";

const LearnPage = async () => {
    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const unitsData = getUnits();

    const [userProgress, units, courseProgress, lessonPercentage] =
        await Promise.all([
            userProgressData,
            unitsData,
            courseProgressData,
            lessonPercentageData,
        ]);

    // console.log("user units: ", units);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }
    if (!courseProgress) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                ></UserProgress>
            </StickyWrapper>
            
            <FeedWrapper>
                <Header title={userProgress?.activeCourse?.title} />
                {units.map((unit: any) => (
                    <Unit
                        key={unit._id}
                        id={unit._id}
                        order={unit.order}
                        description={unit.description}
                        title={unit.title}
                        lessons={unit.lessons}
                        activeLesson={courseProgress.activeLesson}
                        activeLessonPercentage={lessonPercentage.data}
                    />
                ))}
            </FeedWrapper>
        </div>
    );
};

export default LearnPage;
