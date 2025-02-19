"use client";

import { useState, useTransition } from "react";
import { Header } from "./Header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/services/challenge-progress";
import { toast } from "sonner";

type Props = {
    initialLessonId: number;
    initialPercentage: number;
    initialHearts: number;
    initialLessonChallenges: any[];
    userSubscription: any;
};

const Quize = ({
    // initialLessonId,
    initialPercentage,
    initialHearts,
    initialLessonChallenges,
    userSubscription,
}: Props) => {
    const [isPending, startTransition] = useTransition();

    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const unCompletedIndex = challenges.findIndex(
            (challenge) => !challenge.completed
        );
        return unCompletedIndex === -1 ? 0 : unCompletedIndex;
    });

    console.log('challenges: ', initialLessonChallenges);

    const [selectedOption, setSelectedOpton] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.options ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };

    const onContinue = () => {
        if(isPending){}
        if (!selectedOption) return;

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
            setStatus("wrong");
            console.log("Incorrect option");
        }
    };

    const onSelect = (id: number) => {
        if (status != "none") return;

        setSelectedOpton(id);
    };

    const title =
        challenge.type === "ASSIST"
            ? "Select the correct meaning"
            : challenge.question;

    return (
        <>
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

// .then((response: any) => {
//     if (response?.err === "hearts") {
//         console.error("Missing hearts");
//         return;
//     }

//     setStatus("correct");
//     setPercentage((prev) => prev + 100 / challenges.length);

//     // this is practice
//     if (initialPercentage === 100) {
//         setHearts((prev) => Math.min(prev + 1, 5));
//     }

// })
// .catch(() =>
//     toast.error("something went wrong, please try later")
// );
