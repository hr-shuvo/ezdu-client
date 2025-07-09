export const CourseModule = () => {

    const modules: any[] = [

        {
            title: 'Admission',
            subTitle: 'complete preparation',
            totalCourse: 6,
            duration: 0,
            isPopular: true,
            emoji: '🎓',
        },
        {
            title: 'Question Bank',
            subTitle: 'complete preparation',
            totalCourse: 17,
            duration: 0,
            isPopular: true,
            emoji: '🏦',
        },
        {
            title: 'Quiz',
            subTitle: 'review & practice',
            totalCourse: 1,
            duration: 0,
            isPopular: true,
            emoji: '❔',
        },
        {
            title: 'Class 6-12',
            subTitle: 'complete preparation',
            totalCourse: 6,
            duration: 0,
            isPopular: true,
            emoji: '📚',
        },
        {
            title: 'SSC',
            subTitle: 'complete preparation',
            totalCourse: 3,
            duration: 0,
            isPopular: true,
            emoji: '📖',
        },
        {
            title: 'HSC',
            subTitle: 'complete preparation',
            totalCourse: 3,
            duration: 0,
            isPopular: true,
            emoji: '🎯',
        },
    ];


    // modules.sort(() => Math.random() - 0.5);


    return (

        <div className="w-full mx-auto p-6 bg-white rounded-3xl shadow-md dark:bg-zinc-900 dark:shadow-zinc-700">
            <h2 className="text-2xl font-bold text-sky-700 mb-6 text-center dark:text-sky-400">
                Explore Our Features
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map(({title, subTitle, totalCourse, isPopular, emoji}, idx) => (
                    <div
                        key={idx}
                        className="cursor-pointer p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center bg-gradient-to-br from-white to-sky-100 relative
                   dark:text-sky-100 dark:from-zinc-800 dark:to-zinc-900 dark:shadow-zinc-700 dark:hover:shadow-zinc-600"
                        onClick={() => {
                        }}
                    >
                        {/* Popular badge */}
                        {isPopular && (
                            <span
                                className="absolute top-3 right-3 bg-lime-700 text-white text-xs font-semibold rounded-full px-2 py-1 shadow-md">
            Popular
          </span>
                        )}

                        <div className="mb-3 text-sky-600 text-5xl dark:text-sky-100">{emoji || '📘'}</div>

                        <h3 className="text-xl font-semibold mb-1">{title}</h3>
                        <p className="text-sky-700 text-sm mb-2 dark:text-white">{subTitle}</p>
                        <p className="text-sky-900 font-medium dark:text-white">{totalCourse} Courses</p>
                    </div>
                ))}
            </div>
        </div>


    )
}