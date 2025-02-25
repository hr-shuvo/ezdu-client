import { getCourses, getUserProgress } from "@/services/courseService";
import { List } from "./list";

const CoursesPage = async () => {
    const coursesData = getCourses();
    const userProgressdata = getUserProgress();

    const [courses, userProgress] = await Promise.all([
        coursesData,
        userProgressdata,
    ]);

    // const url = process.env.NEXT_PUBLIC_API_URL;

    console.warn("courses data: ", courses);
    console.warn("progress data: ", userProgress);

    return (
        <div className="h-full max-w[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Select Courses
            </h1>

            <h2 className="text-xl font-bold">course list</h2>
            {courses.map((course: any) => {
                return <div key={course._id} className="my-5">{JSON.stringify(course)}</div>;
            })}

            <List
                courses={courses}
                activeCourseId={userProgress?.activeCourseId}
            />
        </div>
    );
};

export default CoursesPage;
