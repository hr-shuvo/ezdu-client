"use client";




import { Particle } from "@/components/custom-ui/particle";

const AcademyPage = () =>{


    return (
        <>
            <div>
                <Particle title={'Courses'} />
            </div>


            <div className='flex flex-col md:flex-row gap-2 px-6'>
                <div className='bg-orange-500 md:w-1/4 w-full p-4'>Filter</div>
                <div className='bg-green-500 md:w-3/4 w-full p-4'>Content</div>
            </div>
        </>
    )
};

export default AcademyPage;