import Link from "next/link";

const AdmissionTips = () => {
    return (
        <>


            <main className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold text-lime-600 mb-6">📝 Admission Tips</h1>

                <p className="text-lg text-gray-700 mb-8">
                    Whether you&apos;re preparing for school, college, or job-related exams — we&apos;ve gathered some
                    of the most effective tips to help you stay ahead and succeed in your admission journey.
                </p>

                {/* Section 1: Plan Your Preparation */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-lime-600 mb-3">📅 Plan Your Preparation</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Create a realistic study schedule and stick to it</li>
                        <li>Break down subjects into daily or weekly targets</li>
                        <li>Start early to avoid last-minute pressure</li>
                    </ul>
                </section>

                {/* Section 2: Focus on the Syllabus */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-lime-600 mb-3">📚 Know Your Syllabus</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Always follow the official syllabus or curriculum</li>
                        <li>Cover basics before jumping into advanced topics</li>
                        <li>Don&apos;t skip chapters that feel boring — they might carry marks</li>
                    </ul>
                </section>

                {/* Section 3: Practice Smart */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-lime-600 mb-3">🎯 Practice Smart</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Take quizzes every day to boost retention</li>
                        <li>Use EzDu&apos;s gamified practice system to earn XP and track growth</li>
                        <li>Review your mistakes regularly — that&apos;s how you grow</li>
                    </ul>
                </section>

                {/* Section 4: Stay Healthy */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-lime-600 mb-3">💪 Stay Mentally & Physically Fit</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Take breaks and avoid burnout</li>
                        <li>Eat healthy and sleep well — your brain needs rest to remember</li>
                        <li>Practice breathing or mindfulness if you&apos;re feeling anxious</li>
                    </ul>
                </section>

                {/* Section 5: Exam Day Strategy */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-lime-600 mb-3">🧠 On the Exam Day</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Reach your center early to avoid stress</li>
                        <li>Read questions carefully before answering</li>
                        <li>Manage your time — don&apos;t spend too long on one question</li>
                    </ul>
                </section>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link href="/admission"
                          className="inline-block bg-lime-600 hover:bg-lime-700 text-white font-semibold px-6 py-3 rounded-full transition">
                        🎓 Explore Admission Options
                    </Link>
                </div>
            </main>

        </>
    )
}

export default AdmissionTips;