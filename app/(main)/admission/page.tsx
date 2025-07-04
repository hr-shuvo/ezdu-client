
import AdmissionHomePage from "./admission-home";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "University Admission Preparation | DU, BUET, Medical & More",
    description:
        "Get ready for university admission tests, including Dhaka University, BUET, and Medical entrance exams. Access past questions, interactive model tests, and complete preparation resources to secure your seat in top Bangladeshi universities.",
    keywords: [
        "Dhaka University admission test",
        "DU KA unit previous questions",
        "DU KHA unit question bank",
        "DU GA unit model test",
        "BUET admission preparation",
        "BUET previous years question",
        "Medical admission MBBS preparation",
        "Medical admission previous question",
        "university admission model test",
        "admission question bank",
        "university model test",
        "admission test guide Bangladesh",
        "admission test preparation Bangladesh",
        "Bangladesh university entrance exam",
        "BD admission exam question",
        "Bangladesh admission test MCQ",
    ],
};


const AdmissionPage = () => {
    return (
        <>
            <AdmissionHomePage />
        </>
    );
};

export default AdmissionPage;