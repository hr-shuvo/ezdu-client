"use client";

import { useEffect, useState, useTransition } from "react";
import { Header } from "./Header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/services/challenge-progress";
import { toast } from "sonner";
import { useAudio, useWindowSize } from "react-use";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ResultCard } from "./result-card";
import Confetti from "react-confetti";

type Props = {
    initialLessonId: string;
    initialPercentage: number;
    initialHearts: number;
    initialLessonChallenges: any[];
    userSubscription: any;
};

const Quize = ({
    initialLessonId,
    initialPercentage,
    initialHearts,
    initialLessonChallenges,
    userSubscription,
}: Props) => {
    const [isPending, startTransition] = useTransition();
    const { width, height } = useWindowSize();
    const router = useRouter();

    const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });
    const [correctAudio, _c, correctControl] = useAudio({ src: "/correct.wav", });
    const [incorrectAudio, _i, incorrectControl] = useAudio({ src: "/incorrect.wav",  });

    const [lessonId] = useState(initialLessonId);
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const unCompletedIndex = challenges.findIndex(
            (challenge) => !challenge.completed
        );
        return unCompletedIndex === -1 ? 0 : unCompletedIndex;
    });

    const [selectedOption, setSelectedOpton] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.options ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };

    const [clientWidth, setClientWidth] = useState(1920);
    const [clientHeight, setClientHeight] = useState(1080);
    useEffect(() => {
        setClientWidth(width);
        setClientHeight(height);
    }, [width, height]);

    const onContinue = () => {
        if (isPending) {
        }
        if (!selectedOption) return;

        if (activeIndex === challenges.length) {
            router.push("/learn");
        }

        if (status === "wrong") {
            setStatus("none");
            setSelectedOpton(undefined);
            return;
        }

        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOpton(undefined);
            return;
        }

        const correctOption = options.find((option: any) => option.correct);

        if (!correctOption) {
            return;
        }

        if (correctOption && correctOption._id === selectedOption) {
            // console.log('correct option: ', selectedOption);

            startTransition(() => {
                upsertChallengeProgress(challenge._id)
                    .then((data) => {
                        if (data.error) {
                            // console.log(data.error)
                            toast.warning(data.error);
                            return;
                        }

                        correctControl.play();
                        setStatus("correct");
                        setPercentage((prev) => prev + 100 / challenges.length);

                        if (initialPercentage === 100) {
                            setHearts((prev) => Math.min(prev + 1, 5));
                        }
                    })
                    .catch(() => {
                        toast.error("Something went wrong, please try later");
                    });
            });
        } else {
            incorrectControl.play();
            setStatus("wrong");
            // console.log("Incorrect option");
        }
    };

    const onSelect = (id: number) => {
        if (status != "none") return;

        setSelectedOpton(id);
    };

    if (!challenge) {
        return (
            <>
                {finishAudio}                
                <Confetti
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={15000}
                    width={clientWidth}
                    height={clientHeight}
                />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
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
                        Greate job! <br /> You&apos;ve completed the lesson.
                    </h1>

                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard
                            variant="points"
                            value={challenges.length * 10}
                        />
                        <ResultCard variant="hearts" value={hearts} />
                    </div>
                </div>

                <Footer
                    lessonId={lessonId}
                    status={"completed"}
                    onCheck={() => router.push("/learn")}
                />
            </>
        );
    }

    const title =
        challenge.type === "ASSIST"
            ? "Select the correct meaning"
            : challenge.question;

    return (
        <>
            {incorrectAudio}
            {correctAudio}
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />

            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                            {challenge.type === "ASSIST" && (
                                <QuestionBubble question={challenge.question} />
                            )}
                            <Challenge
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
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
};

export default Quize;
