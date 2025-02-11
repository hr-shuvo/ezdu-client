import { getCourses } from "@/services/courseService";
import { List } from "./list";

const CoursesPage = async () => {

    const courses = await getCourses();

    // const [courses] = await Promise.all([
    //     courseData
    // ])

    // console.log('courses data: ', courses);

    return (
        <div className="h-full max-w[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Select Courses
            </h1>

            <List
                courses = {courses}
                activeCourseId=''
            />

        </div>
    )
};

export default CoursesPage;
