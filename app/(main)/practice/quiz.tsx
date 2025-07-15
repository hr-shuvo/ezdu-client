'use client';

import { useAudio } from "react-use";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import Image from "next/image";
import { Challenge } from "@/app/(main)/practice/challenge";
import { Footer } from "@/app/(main)/practice/footer";
import { PracticeChallengeProgress } from "@/app/(main)/practice/practice-challenge-progress";


type Props = {
    initialChallenges: any[];
    initialPercentage: number;
    userSubscription: any;
}

const PracticeQuiz = ({
                          initialChallenges,
                          initialPercentage,
                          userSubscription,
                      }: Props) => {
    const router = useRouter();
    const [finishAudio] = useAudio({src: "/audio/finish.mp3", autoPlay: true});
    const [correctAudio, , correctControl] = useAudio({src: "/audio/correct.wav"});
    const [incorrectAudio, , incorrectControl] = useAudio({src: "/audio/incorrect.wav"});

    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialChallenges);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string>(); // selected option text/string
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.optionList ?? [];



    const onNext = () => {
        setActiveIndex((current) => current + 1);
        setSelectedOption(undefined);
        setStatus("none");
    }

    const onContinue = () => {

        if (!selectedOption) return;

        if (activeIndex === challenges.length) {
            router.push('/practice');

        }

        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }


        const correctOption = options.find((option: any) => option.correct);
        if (!correctOption || !selectedOption) {
            setStatus("none");
            return;
        }

        if (correctOption.text === selectedOption) {
            correctControl.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);
        } else {
            incorrectControl.play();
            setStatus("wrong");
        }
    }

    const onSelect = (option: string) => {
        if (status !== "none") return;
        setSelectedOption(option);
    }


    if (!challenge) {
        return (
            <>
                {finishAudio}
                <Confetti
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={15000}
                />

                <div
                    className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image
                        src="/finish.svg"
                        alt="finish"
                        className="hidden md:block"
                        height={100}
                        width={100}
                    />
                    <Image
                        src="/finish.svg"
                        alt="finish"
                        className="block md:hidden"
                        height={50}
                        width={50}
                    />
                    <h1 className="text-xl lg:text-3xl font-bold">
                        Great job! <br/> You&apos;ve completed the lesson.
                    </h1>

                    <div className="flex items-center gap-x-4 w-full">
                        <div className="rounded-2xl border-2 w-full bg-orange-400 border-orange-400">
                            <div className="p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs">
                                Total XP
                            </div>
                            <div
                                className="rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg text-orange-400">
                                {challenges.length * 10}
                            </div>
                        </div>

                        <div className="rounded-2xl border-2 w-full bg-rose-500 border-rose-500">
                            <div className="p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs">
                                Hearts Left
                            </div>
                            <div
                                className="rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg text-rose-500">
                                {userSubscription?.hearts ?? 0}
                            </div>
                        </div>

                    </div>



                    <Footer
                        status={"completed"}
                        onCheck={() => router.push("/practice")}
                    />

                </div>

            </>
        )
    }

    const title = "Practice ";

    return (
        <>
            {incorrectAudio}
            {correctAudio}

                <PracticeChallengeProgress hearts={5} percentage={percentage} hasActiveSubscription={userSubscription?.isActive}/>


            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                            {challenge.type === "SELECT" ? (
                                <></>
                            ):(
                                <>
                                    <div className="w-full flex items-center lg:items-start justify-center lg:justify-start gap-x-4 mb-6">
                                        <Image
                                            src="/common/qna.svg"
                                            alt="mascot"
                                            height={60}
                                            width={60}
                                            className="hidden lg:block"
                                        />
                                        <Image
                                            src="/common/qna.svg"
                                            alt="mascot"
                                            height={40}
                                            width={40}
                                            className="block lg:hidden"
                                        />

                                        <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">
                                            {challenge.question}
                                            <div
                                                className="absolute -left-3 top-1/2 w-0 h-0 border-x-8
                border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90"
                                            />
                                        </div>
                                    </div>
                                </>
                                )}
                            <Challenge
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption} // selected option text/string
                                disabled={false}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>


            <Footer
                disabled={!selectedOption}
                status={status}
                onCheck={onContinue}
                // lessonId={undefined}
            />
        </>
    );
}

export default PracticeQuiz;