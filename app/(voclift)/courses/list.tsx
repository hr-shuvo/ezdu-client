"use client";

import { useRouter } from "next/navigation";
import { Card } from "./card";
import { useTransition } from "react";
import { upsertUserProgress } from "@/services/progressService";
import { toast } from "sonner";

type Course = {
    _id: string;
    title: string;
    imageSrc: string;
};

type Props = {
    courses: Course[];
    activeCourseId?: string;
};

export const List = ({ courses, activeCourseId }: Props) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    // console.log('courses data: ', courses);
    // console.log("active course Id:  ", activeCourseId);

    const onClick = (id: string) => {
        if (pending) return;

        if (id === activeCourseId) {
            return router.push("/learn");
        }

        startTransition(() => {
            upsertUserProgress(id).then(()=>{
                // revalidatePath('/courses');
                // revalidatePath('/learn');
                // router.refresh();
                router.push('/learn');
                toast.success('course selected');
            }).catch((err) =>{
                console.log('Something went wrong ', err);
                toast.error('Something went wrong');
            })
        });
    };

    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {courses.map((course) => (
                <Card
                    key={course._id}
                    id={course._id}
                    title={course.title}
                    imageSrc={course.imageSrc}
                    onClick={onClick}
                    disabled={pending}
                    active={course._id === activeCourseId}
                />
            ))}
        </div>
    );
};


