import { LessonButton } from "./lesson-button";
import { UnitBanner } from "./unit-banner";

type Props = {
    id: string;
    order: number;
    title: string;
    description: string;
    lessons: [];
    activeLesson: any;
    activeLessonPercentage: number;
};

export const Unit = ({
    id,
    // order,
    title,
    description,
    lessons,
    activeLesson,
    activeLessonPercentage,
}: Props) => {
    // console.log("unit id : ", id);
    
    return (
        <>
            <UnitBanner title={title} description={description} />

            <div className="flex items-center flex-col relative" key={id}>
                {lessons.map((lesson: any, index) => {
                    const isCurrent = lesson._id === activeLesson?._id;
                    const isLocked = !lesson.completed && !isCurrent;

                    // console.log('current: ', lesson._id, isCurrent, isLocked)

                    
                    return (
                        <div key={lesson._id}>
                            <LessonButton
                                key={lesson._id}
                                id={lesson._id}
                                index={index}
                                totalCount={lessons.length - 1}
                                current={isCurrent}
                                locked={isLocked}
                                percentage={activeLessonPercentage}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};
