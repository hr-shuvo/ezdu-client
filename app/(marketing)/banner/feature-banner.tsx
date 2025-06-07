

export const FeatureBanner = () => {
    return (
        <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mb-12">
                <div className="bg-indigo-50 rounded-2xl p-6 shadow hover:shadow-md transition">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">Curriculum-Aligned</h3>
                    <p className="text-sm text-neutral-600">
                        Covers national school subjects and job exam topics like BCS, Bank, Primary, and more.
                    </p>
                </div>
                <div className="bg-indigo-50 rounded-2xl p-6 shadow hover:shadow-md transition">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">Gamified Learning</h3>
                    <p className="text-sm text-neutral-600">
                        Earn points, track progress, and compete on leaderboards to stay motivated and consistent.
                    </p>
                </div>
                <div className="bg-indigo-50 rounded-2xl p-6 shadow hover:shadow-md transition">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">Practice & Analyze</h3>
                    <p className="text-sm text-neutral-600">
                        Take quizzes, view instant feedback, and analyze your performance with smart stats.
                    </p>
                </div>
            </div></>
    )
}