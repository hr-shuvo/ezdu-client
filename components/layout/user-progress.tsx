import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {InfinityIcon} from "lucide-react";

type Course = {
    _id: string;
    title: string;
    imageSrc: string;
};

type Props = {
    activeCourse: Course;
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
};

export const UserProgress =({activeCourse, points, hearts, hasActiveSubscription}: Props) =>{
    console.log(activeCourse)
    return (
        <div className='flex items-center justify-between gap-x-2 w-full'>
            <Link href='/courses'>
                <Button variant='ghost'>
                    {/* <Image
                        src='/fr.svg'
                        alt='French'
                        className='rounded-md border'
                        width={32}
                        height={32}
                    /> */}
                    Course Name
                </Button>
            </Link>
            <Link href='/shop'>
                <Button variant='ghost' className='text-orange-500'>
                    <Image
                        src='/common/points.svg'
                        alt='points'
                        className='mr-2'
                        width={28}
                        height={28}
                    />
                    {points}
                </Button>
            </Link>
            <Link href='/shop'>
                <Button variant='ghost' className='text-rose-500'>
                    <Image
                        src='/common/heart.svg'
                        alt='hearts'
                        className='mr-2'
                        width={28}
                        height={28}
                    />
                    {hasActiveSubscription ? <InfinityIcon/> : hearts}
                </Button>
            </Link>
        </div>
    )
}