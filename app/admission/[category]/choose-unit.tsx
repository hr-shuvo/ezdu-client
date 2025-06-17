'use client';

import { getAdmissionUnitLearningPath } from "@/app/_services/admission/admission-service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import LearningPath from "./learning-path";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
    units: any[]
}

const ChooseUnit = ({ units }: Props) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [unitId, setUnit] = useState(searchParams.get('s'));

    const [learningPath, setLearningPath] = useState<any>();

    useEffect(() => {
        if (unitId) {
            startTransition(async () => {
                const _path = await getAdmissionUnitLearningPath(unitId!);
                console.log(_path);
                setLearningPath(_path);
            })
        }

    }, [searchParams, unitId])

    const handleUnitClick = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('s', id);
        setUnit(id);

        router.push(`?${params.toString()}`);
    }

    return (
        <>

            {
                unitId && learningPath ? (
                    <LearningPath learningPath={learningPath} />
                ) : (
                    <div className="flex gap-4">
                        {
                            units.map((unit, index) => (
                                <Button key={index} className='h-auto' onClick={() => handleUnitClick(unit.id)}>
                                    <div className="p-8 px-12 ">
                                        <h3 className="text-xl font-bold mb-2">{unit.title}</h3>
                                    </div>
                                </Button>

                            ))
                        }
                    </div>
                )
            }

        </>
    )
};

export default ChooseUnit;
