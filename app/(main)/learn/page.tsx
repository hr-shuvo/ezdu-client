
import { FeedWrapper } from "@/components/layout/feed-wrapper";
import { StickyWrapper } from "@/components/layout/sticky-wrapper";
import { UserProgress } from "@/components/layout/user-progress";
import {redirect} from "next/navigation";
import { Header } from "./header";
import { getUserProgress } from "@/services/courseService";


const LearnPage = async () =>{
    const userProgressData = getUserProgress();

    const [
        userProgress
    ] = await Promise.all([
        userProgressData
    ])


    console.log('user progress: ', userProgress)

    if(!userProgress || !userProgress.activeCourse){
        redirect('/courses')
    }

    return(
        <div className='flex flex-row-reverse gap-[48px] px-6'>
             <StickyWrapper>
                 <UserProgress
                     activeCourse={userProgress.activeCourse}
                     hearts={userProgress.hearts}
                     points={userProgress.points}
                     hasActiveSubscription={false}
                 ></UserProgress>
             </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress?.activeCourse?.title}/>
            </FeedWrapper>
        </div>
    )
};


export default LearnPage;