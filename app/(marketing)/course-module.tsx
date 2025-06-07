

export const CourseModule = () => {

    const modules: any[] = [
        
        {
            title: 'BCS',
            subTitle: 'complete preparation',
            totalCourse: 17,
            duration: 0,
            isPopular: true,
            emoji: '🎓',
        },
        {
            title: 'Bank Jobs',
            subTitle: 'complete preparation',
            totalCourse: 17,
            duration: 0,
            isPopular: true,
            emoji: '🏦',
        },
        {
            title: 'Govment Jobs',
            subTitle: 'complete preparation',
            totalCourse: 17,
            duration: 0,
            isPopular: true,
            emoji: '🏛️',
        },
        {
            title: 'Class 6,7,8',
            subTitle: 'complete preparation',
            totalCourse: 17,
            duration: 0,
            isPopular: true,
            emoji: '📚',
        },
        {
            title: 'Class 9,10',
            subTitle: 'complete preparation',
            totalCourse: 14,
            duration: 0,
            isPopular: true,
            emoji: '📖',
        },
        {
            title: 'Class 11,12',
            subTitle: 'complete preparation',
            totalCourse: 16,
            duration: 0,
            isPopular: true,
            emoji: '🎯',
        },
    ];


    // modules.sort(() => Math.random() - 0.5);




    return (

        <div className="w-full mx-auto p-6 bg-white rounded-3xl shadow-md">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
                Explore Our Courses
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map(({ title, subTitle, totalCourse, isPopular, emoji }, idx) => (
                    <div
                        key={idx}
                        className="cursor-pointer p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center bg-indigo-50 relative"
                        onClick={() => { }}
                    >
                        {/* Popular badge */}
                        {isPopular && (
                            <span className="absolute top-3 right-3 bg-yellow-400 text-xs font-semibold rounded-full px-2 py-1 shadow-md">
                                Popular
                            </span>
                        )}



                        <div className="mb-3 text-indigo-600 text-5xl">{emoji || '📘'}</div>


                        <h3 className="text-xl font-semibold mb-1">{title}</h3>
                        <p className="text-indigo-700 text-sm mb-2">{subTitle}</p>
                        <p className="text-indigo-900 font-medium">{totalCourse} Courses</p>
                    </div>
                ))}
            </div>
        </div>


    )
}