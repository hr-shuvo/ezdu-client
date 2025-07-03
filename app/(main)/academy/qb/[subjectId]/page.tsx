import { Metadata } from "next";
import QuestionBankSubject from "./questionBankSubject";

export const metadata : Metadata = {
  title: "Question Bank - SSC, HSC & Class 6,7,8",
  description: "Access subject-wise question banks for SSC, HSC, and Classes 6–8. Practice past questions and prepare smartly with EzDu.",
  keywords: [
    "question bank",
    "ssc question bank",
    "hsc question bank",
    "class 6 question bank",
    "class 10 questions",
    "academic questions",
    "ezdu",
    "bd education",
    "subject wise questions",
    "ssc mcq",
    "hsc written questions",
    "ssc preparation",
    "hsc model test"
  ],
  openGraph: {
    title: "Question Bank - SSC, HSC & Class-wise Questions | EzDu",
    description: "Practice SSC, HSC, and school-level questions by subject. Your smart preparation starts here.",
    url: "https://ezduonline.com/qb",
    siteName: "EzDu",
    type: "website"
  }
};



const QuestionBankSubjectPage = () => {

    return (
        <>
            <QuestionBankSubject />

        </>
    )
}

export default QuestionBankSubjectPage;