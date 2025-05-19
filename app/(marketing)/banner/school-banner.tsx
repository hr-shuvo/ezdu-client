import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";


export const SchoolBanner = () => {
    // const neonColors = {firstColor: "#91143e", secondColor: "#2c8787"};

    return (

        <div className='flex flex-col lg:flex-row items-center justify-between w-full gap-x-2'>

            <NeonGradientCard className="w-full lg:w-1/2 items-center justify-center">
                <div className='flex justify-around gap-2 text-xl p-3'>

                    <Card
                        onClick={() => redirect('/academy')}
                          className='p-3 h-[100px] w-1/3 flex items-center justify-center text-center cursor-pointer hover:shadow-xl transition-all duration-150 transform'>
                        <h1 className="pointer-events-none z-10  whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-2xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                            Class 6,7,8
                        </h1>
                    </Card>

                    <Card
                        onClick={() => redirect('/academy')}
                        className='p-3 h-[100px] w-1/3 flex items-center justify-center text-center cursor-pointer hover:shadow-xl transition-all duration-150 transform'>
                        <h1 className="pointer-events-none z-10  whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-2xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                            Class 9,10
                        </h1>
                    </Card>

                    <Card
                        onClick={() => redirect('/academy')}
                        className='p-3 h-[100px] w-1/3 flex items-center justify-center text-center cursor-pointer hover:shadow-xl transition-all duration-150 transform'>
                        <h1 className="pointer-events-none z-10  whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-2xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                            Class 11,12
                        </h1>

                    </Card>

                </div>

                <div className='px-10 text-green-900 font-bold'>
                    <h1 className='flex justify-center'>
                        <a href="/academy" className='hover:underline hover:cursor-pointer'>Complete Class 6 to 12 Study Material and Solutions</a><ArrowRight/>
                    </h1>
                </div>


            </NeonGradientCard>


            <NeonGradientCard className="w-full lg:w-1/2 items-center justify-center">
                <div className='flex justify-around gap-2 text-xl p-3'>

                    <Card className='p-3 h-[100px] w-1/3 flex items-center justify-center text-center cursor-pointer hover:shadow-xl transition-all duration-150 transform'>
                        <h1 className="pointer-events-none z-10  whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-2xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                            <span>SSC</span>
                            <span> 25</span>
                        </h1>
                    </Card>

                    <Card className='p-3 h-[100px] w-1/3 flex items-center justify-center text-center cursor-pointer hover:shadow-xl transition-all duration-150 transform'>
                        <h1 className="pointer-events-none z-10  whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-2xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                            <span>HSC</span>
                            <span> 25,26</span>
                        </h1>
                    </Card>

                    <Card className='p-3 h-[100px] w-1/3 flex items-center justify-center text-center cursor-pointer hover:shadow-xl transition-all duration-150 transform'>
                        <h1 className="pointer-events-none z-10  whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-2xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                            MCQ, Quiz, Test
                        </h1>

                    </Card>

                </div>

                <div className='px-10 text-green-900 font-bold'>
                    <h1 className='flex justify-center'>
                        <a href="#" className='hover:underline hover:cursor-pointer'>Effective SSC and HSC Exam Practice and Revision</a><ArrowRight/>
                    </h1>
                </div>


            </NeonGradientCard>


        </div>

    )

}