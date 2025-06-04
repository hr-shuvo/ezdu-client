'use client';

import { useSearchParams } from "next/navigation";



const ContentMcqPage = () =>{
    const searchParams = useSearchParams();

    const subjectId = searchParams.get('s');
    const lessonId = searchParams.get('l');

    console.log('subjectId: ', subjectId);
    console.log('lessonId: ', lessonId);
    return(
        <>
        <div>
            Content MCQ

            <div>
                sub: {subjectId}
            </div>
            <div>
                les: {lessonId}
            </div>
        </div>
        </>
    )
};

export default ContentMcqPage;