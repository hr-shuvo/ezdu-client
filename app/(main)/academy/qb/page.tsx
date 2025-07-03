import { Metadata } from "next";
import AcademyQuestionBank from "./AcademyQuestionBank";


export const metadata: Metadata = {
    title: 'Question Bank',
    description:
        'Get SSC, HSC, and Class 6-8 MCQ question bank with chapter-wise model tests. Practice questions based on NCTB syllabus and BD board exams.',
    keywords:
        'ssc question bank, hsc question bank, class 6 mcq, class 7 quiz, class 8 exam, bd board questions, nctb question bank, online mcq practice, ssc english mcq, hsc biology quiz',
    openGraph: {
        title: 'Question Bank | SSC, HSC, Class 6-8 MCQ & Model Tests',
        description:
            'Explore SSC, HSC, and Class 6-8 question banks. Practice MCQs and model tests by subject and chapter. Based on NCTB and BD board syllabus.',
        url: 'https://ezduonline.com/qb',
        siteName: 'EzDu',
        images: [
            {
                url: 'https://ezduonline.com/images/og-qb.png',
                width: 1200,
                height: 630,
                alt: 'EzDu Question Bank',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Question Bank | SSC, HSC, Class 6-8 MCQ & Model Tests',
        description:
            'Practice from question bank for SSC, HSC, and Class 6-8. Online MCQ practice and model test for BD board exam preparation.',
        images: ['https://ezduonline.com/images/og-qb.png'],
    },
    icons: {
        icon: '/favicon.ico',
    },
};

const AcademyQuestionBankPage = () => {

    return (
        <>
            <AcademyQuestionBank />
        </>
    )
}

export default AcademyQuestionBankPage;