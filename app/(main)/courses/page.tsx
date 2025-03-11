'use client';

import { List } from "./list";
import { PaginatedList } from "@/app/utils/pagination";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import Loading from "./loading";
import { loadCourses } from "@/app/_services/course-services";
import { getUserProgress } from "@/app/_services/progress-service";

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [userProgress, setUserProgress] = useState<any>();

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const [isPending, startTransition] = useTransition();

    // const url = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        startTransition(async () => {
            try {
                const response: PaginatedList = await loadCourses(currentPage, pageSize);
                setCourses(response.data);
                setCurrentPage(response.currentPage);
                setPageSize(pageSize);

                const userProgress = await getUserProgress();
                setUserProgress(userProgress);
            }
            catch {
                toast.error('error')
            }
        })
    }, [currentPage, pageSize]);



    if (isPending) {
        return <Loading />;
    }



    console.warn("courses data: ", courses);
    console.warn("progress data: ", userProgress);

    return (
        <div className="h-full max-w[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Select Courses
            </h1>

            <List
                courses={courses}
                activeCourseId={userProgress?.activeCourseId}
            />
        </div>
    );
};

export default CoursesPage;
