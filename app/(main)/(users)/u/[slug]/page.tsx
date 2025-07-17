import { getUserProfile } from "@/app/_services/user-service";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Flame, Star } from "lucide-react";
import UserDetails from "@/app/(main)/(users)/u/[slug]/user-details";
import { getAcademyProgress } from "@/app/_services/academy/academyProgressService";

type Props = {
    params: Promise<{
        slug: string;
    }>;
}

const UserDetailsPage = async ({ params }:Props) => {
    const { slug } = await params;

    const userProfile = await getUserProfile(slug);
    const userProgress = await getAcademyProgress(slug);

    if(!userProfile){
        toast.error("User profile not found.");
        redirect('/');
    }

    userProfile.badges = [
        { label: "Fast Learner", icon: <Flame className="text-orange-500" /> },
        { label: "Top 10%", icon: <Star className="text-yellow-500" /> },
    ];
    userProfile.recentLessons = [
        { title: "Class 7 Science - Chapter 3", xp: 30 },
        { title: "BCS English Practice", xp: 20 },
    ];


    return (

        <>
            <UserDetails userProfile={userProfile} progress={userProgress}/>

        </>
    )
}

export default UserDetailsPage;