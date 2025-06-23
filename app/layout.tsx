import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { SecureProvider } from "@/context/SecureContext";
import { AskSetupProfileModal } from "@/components/modals/ask-setup-profile-modal";

const font = Nunito({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "EzDu - Practice for Class 6-8, SSC, HSC, BCS & Govt Job Exams",
        template: "%s - EzDu"
    },
    description: "EzDu is Bangladesh’s smart learning platform for SSC, HSC, school (Class 6-8), and job exam preparation. Practice MCQs, get instant feedback, and track your daily progress – all for free.",
    keywords: [
        "SSC exam preparation",
        "HSC model test",
        "Class 6 MCQ practice",
        "Class 7 exam",
        "Class 8 questions",
        "BCS preparation",
        "Bank job preparation",
        "Govt job preparation",
        "SSC HSC previous questions",
        "IELTS Preparation",
        "IELTS Mock Test"
    ],
    openGraph: {
        title: "Practice for SSC, HSC, Class 6-8, BCS & Job",
        description: "EzDu is Bangladesh’s smart learning platform for SSC, HSC, school (Class 6-8), and job exam preparation. Practice MCQs, get instant feedback, and track your daily progress – all for free.",
        url: "https://ezduonline.com",
        siteName: "EzDu",
        images: [
            {
                url: "https://www.ezduonline.com/logo/logo_og.svg",
                width: 1200,
                height: 630,
                alt: "EzDu - SSC, HSC & Job Exam Practice"
            }
        ],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "EzDu - Practice for SSC, HSC, Class 6-8, BCS & Govt Job Exams",
        description: "EzDu is Bangladesh’s smart learning platform for SSC, HSC, school (Class 6-8), and job exam preparation. Practice MCQs, get instant feedback, and track your daily progress – all for free.",
        images: ["https://www.ezduonline.com/logo/logo_og.svg"]
    },
    metadataBase: new URL("https://ezduonline.com")
};




export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${font.className} flex flex-col min-h-screen`}>
                <SecureProvider>
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Toaster />
                    <ExitModal />
                    <HeartsModal />
                    <PracticeModal />
                    <AskSetupProfileModal/>
                </SecureProvider>

            </body>
        </html>
    );
}
