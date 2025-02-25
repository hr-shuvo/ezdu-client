import { getCourses, getUserProgress } from "@/services/courseService";
import { List } from "./list";

const CoursesPage = async () => {
    const coursesData = getCourses();
    const userProgressdata = getUserProgress();

    const [courses, userProgress] = await Promise.all([
        coursesData,
        userProgressdata,
    ]);

    const url = process.env.NEXT_PUBLIC_API_URL;
    
    // console.log('courses data: ', courses);
    // console.log("progress data: ", userProgress);

    return (
        <div className="h-full max-w[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Select Courses
            </h1>

            url: {url}
            courses: {JSON.stringify(courses)}

            <List
                courses={courses}
                activeCourseId={userProgress?.activeCourseId}
            />
        </div>
    );
};

export default CoursesPage;
