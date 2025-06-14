

export const FeatureBanner = () => {
    return (
        <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mb-12">
                <div className="bg-indigo-50 rounded-2xl p-6 shadow hover:shadow-md transition">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">Curriculum-Aligned</h3>
                    <p className="text-sm text-neutral-600">
                        Follows the exact syllabus of Class 6,7,8, SSC, HSC, and other exams 
                    </p>
                </div>
                <div className="bg-indigo-50 rounded-2xl p-6 shadow hover:shadow-md transition">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">You Needed This</h3>
                    <p className="text-sm text-neutral-600">
                        Provides only the content that’s relevant - no extras, just what’s required to succeed
                    </p>
                </div>
                <div className="bg-indigo-50 rounded-2xl p-6 shadow hover:shadow-md transition">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">Practice & Analyze</h3>
                    <p className="text-sm text-neutral-600">
                        Take quizzes, test your weaknesses, and improve with instant feedback and smart progress tracking.
                    </p>
                </div>
            </div></>
    )
}