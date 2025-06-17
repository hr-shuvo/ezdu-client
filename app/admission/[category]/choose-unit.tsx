'use client';

import { getAdmissionUnitLearningPath } from "@/app/_services/admission/admission-service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import LearningPath from "./learning-path";
import { Button } from "@/components/ui/button";
import Loading from "@/app/(main)/courses/loading";

type Props = {
    units: any[]
}

const ChooseUnit = ({ units }: Props) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [unitId, setUnitId] = useState(searchParams.get('s'));

    const [learningPath, setLearningPath] = useState<any>();

    useEffect(() => {
        const id = searchParams.get('s');
        setUnitId(id);
    }, [searchParams]);


    useEffect(() => {
        if (!unitId) return;

        startTransition(async () => {
            const _path = await getAdmissionUnitLearningPath(unitId);
            console.log(_path);
            setLearningPath(_path);
        });
    }, [unitId]);

    const handleUnitClick = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('s', id);
        setUnitId(id);

        router.push(`?${params.toString()}`);
    }

    if(isPending){
        return <Loading/>
    }

    return (
        <>

            {
                unitId && learningPath ? (
                    <LearningPath learningPath={learningPath} />
                ) : (
                    <div className="px-6">

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
                    </div>
                )
            }

        </>
    )
};

export default ChooseUnit;
