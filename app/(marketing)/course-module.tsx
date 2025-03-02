import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"


export const CourseModule = () => {

    const modules: any[] = [
        {
            title: 'BCS',
            subTitle: 'previous questions',
            // description: 'A collection of past BCS exam questions',
            totalCourse: 9,
            duration: 0,
            isPopular: true,
            

        },
        {
            title: 'BCS',
            subTitle: 'complete preparation',
            // description: 'Complete preparation course for BCS exams.',
            totalCourse: 17,
            duration: 0,
            isPopular: true,
        },
        {
            title: 'Bank Jobs',
            subTitle: 'complete preparation',
            // description: 'Complete preparation course for BCS exams.',
            totalCourse: 17,
            duration: 0,
            isPopular: true,
        },        
        {
            title: 'Govment Jobs',
            subTitle: 'complete preparation',
            // description: 'Complete preparation course for BCS exams.',
            totalCourse: 17,
            duration: 0,
            isPopular: true,
        },
        {
            title: 'Class 6,7,8',
            subTitle: 'complete preparation',
            // description: 'Complete preparation course for BCS exams.',
            totalCourse: 17,
            duration: 0,
            isPopular: true,
        },
        {
            title: 'Class 9,10',
            subTitle: 'complete preparation',
            // description: 'Complete preparation course for BCS exams.',
            totalCourse: 14,
            duration: 0,
            isPopular: true,
        },
        {
            title: 'Class 11,12',
            subTitle: 'complete preparation',
            // description: 'Complete preparation course for BCS exams.',
            totalCourse: 16,
            duration: 0,
            isPopular: true,
        },
    ];

    // modules.sort(() => Math.random() - 0.5);




    return (
        <div className="flex flex-wrap justify-center gap-5 my-28">

            {
                modules.map((module, index) => (
                    <Card key={index} className="w-[220px] shadow-md hover:cursor-pointer hover:shadow-xl transition-all duration-150 transform">
                        <CardHeader className="text-center">
                            <h1 className="font-bold">{module.title}</h1>
                            <p>{module.subTitle}</p>
                        </CardHeader>

                        <CardContent>
                            {/* {module.description} */}

                        </CardContent>

                        <CardFooter className="text-center">
                            total <span className="ml-1 font-bold"> {module.totalCourse} courses</span>
                        </CardFooter>

                    </Card>
                ))
            }


        </div>
    )
}