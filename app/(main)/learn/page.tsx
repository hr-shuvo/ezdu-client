import { FeedWrapper } from "@/components/layout/feed-wrapper";
import { StickyWrapper } from "@/components/layout/sticky-wrapper";
import { UserProgress } from "@/components/layout/user-progress";
import { redirect } from "next/navigation";
import { Header } from "./header";
import { getUnits, getUserProgress } from "@/services/courseService";
import { Unit } from "./unit";

const LearnPage = async () => {
    const userProgressData = getUserProgress();
    const unitsData = getUnits();

    const [userProgress, units] = await Promise.all([
        userProgressData,
        unitsData,
    ]);

    // console.log("user units: ", units);

    if (!userProgress || !userProgress.activeCourse) {
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
                        activeLesson={false}
                        activeLessonPercentage={0}
                    />
                ))}
            </FeedWrapper>
        </div>
    );
};

export default LearnPage;
