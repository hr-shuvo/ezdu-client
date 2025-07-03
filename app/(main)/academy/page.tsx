import { Metadata } from "next";
import AcademyDashboard from "./AcademyDashboard";

export const metadata: Metadata = {
    title: 'Academic Study',
    description: 'SSC, HSC, Class 6-8 Standard Learning',
    keywords:
        'ssc mcq, hsc mcq, class 6 quiz, class 7 question, class 8 exam, bd education, nctb questions, ssc model test, hsc english, online test bd, school exam preparation',
    openGraph: {
        title: 'Academy | SSC, HSC, Class 6-8 MCQ Practice',
        description:
            'Practice SSC, HSC, and Class 6-8 MCQ/CQ questions online. Free model tests, chapter-wise quizzes, and NCTB-based exam preparation for students in Bangladesh.',
        url: 'https://ezduonline.com/academy',
        siteName: 'EzDu',
        images: [
            {
                url: 'https://ezduonline.com/logo/logo.png',
                width: 1200,
                height: 630,
                alt: 'EzDu Academy',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Academy | SSC, HSC, Class 6-8 MCQ/CQ Practice',
        description:
            'Free MCQ practice for SSC, HSC, and Class 6-8 students. Bangladesh board exam preparation based on NCTB books.',
        images: ['https://ezduonline.com/logo/logo.png'],
    },
    icons: {
        icon: '/favicon.ico',
    },

};

const AcademyDashboardPage = () => {
    return (
        <>
            <AcademyDashboard />
        </>
    )
};

export default AcademyDashboardPage;