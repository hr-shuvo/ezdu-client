import Forum from "@/app/(main)/forum/forum";
import { Metadata } from "next";

// app/forum/page.tsx

export const metadata : Metadata = {
    title: 'Forum | Ask, Learn, Grow',
    description: 'Join the EzDu Forum to ask questions, share knowledge, and connect with learners across Bangladesh. Education meets community here.',
    openGraph: {
        title: 'Forum | EzDu',
        description: 'Ask questions, solve doubts, and collaborate with others in the EzDu learning community.',
        url: 'https://ezdu.com/forum',
        siteName: 'EzDu',
        images: [
            {
                url: 'https://ezdu.com/og/forum-cover.png', // update with actual image
                width: 1200,
                height: 630,
                alt: 'EzDu Forum',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Forum | EzDu',
        description: 'Ask and learn together on the EzDu Forum.',
        images: ['https://ezdu.com/og/forum-cover.png'], // update with actual image
    },
    keywords: ['EzDu forum', 'discussion board', 'learning community', 'student questions', 'ask doubts'],
};


const ForumPage = () => {
    return (
        <>

            <Forum/>

        </>
    );
}

export default ForumPage;