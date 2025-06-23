'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils'; // optional for styling
import { useAskSetupProfileModal } from '@/store/use-modal-state';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaGem } from 'react-icons/fa';
import { loadAcademicClass } from '@/app/_services/academy/academyService';


export const AskSetupProfileModal = () => {
    const { isOpen, close, open } = useAskSetupProfileModal();
    const [isPending, startTransition] = useTransition();

    const [isClient, setIsClient] = useState(false);
    const [userType, setUserType] = useState<'student' | 'job' | ''>('');
    const [classLevel, setClassLevel] = useState('');
    const [jobTrack, setJobTrack] = useState('');

    const [classes, setClasses] = useState<any[]>([]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        open();
    }, [isClient])

    useEffect(() => {
        startTransition(async () => {
            const _classes = await loadAcademicClass(1, 100);
            setClasses(_classes.data);
        })

    })

    if (!isClient) {
        return null;
    }

    const handleSubmit = () => {
        // You would send this data to backend or Zustand/global state
        console.log({ userType, classLevel, jobTrack });
        // close();
    };

    return (
        <>

            <Dialog open={isOpen} onOpenChange={close}>
                <DialogContent className="max-w-4xl rounded-2xl p-8 shadow-xl bg-gradient-to-br from-white to-lime-100">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center text-primary  flex items-center justify-center gap-2">
                            <FaGem /> Set Up Your Learning Profile
                        </DialogTitle>
                        <p className="text-sm text-muted-foreground text-center mt-2">
                            To personalize your EzDu journey, let us know where you are in your learning path.
                        </p>
                    </DialogHeader>

                    <div className="space-y-6 mt-4">
                        <div>
                            <Label className="text-base mb-1 block">Who are you?</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant={userType === 'student' ? 'primary' : 'outline'}
                                    className="py-3 text-base rounded-xl h-16"
                                    onClick={() => {
                                        setUserType('student');
                                        setJobTrack('');
                                    }}
                                >
                                    🧑‍🎓 Student
                                </Button>
                                <Button
                                    variant={userType === 'job' ? 'primary' : 'outline'}
                                    className="py-3 text-base rounded-xl h-16"
                                    onClick={() => {
                                        setUserType('job');
                                        setClassLevel('');
                                    }}
                                >
                                    💼 Job Holder
                                </Button>
                            </div>
                        </div>

                        {userType === 'student' && (
                            <div>
                                <Label className="text-base mb-1 block">Which class are you in?</Label>
                                <Select value={classLevel} onValueChange={setClassLevel}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classes && classes.length > 0 &&
                                            classes.map((item: any) => (
                                                <SelectItem key={item._id} value={item._id}>
                                                    {item.title}
                                                </SelectItem>
                                            ))
                                        }

                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {userType === 'job' && (
                            <div>
                                <Label className="text-base mb-1 block">Which job track are you preparing for?</Label>
                                <Select value={jobTrack} onValueChange={setJobTrack}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select track" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bcs">🔥 BCS</SelectItem>
                                        <SelectItem value="bank">🏦 Bank Job</SelectItem>
                                        <SelectItem value="govt">🏛️ Govt Job</SelectItem>
                                        <SelectItem value="general">📘 General Job Prep</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <Button
                            className="w-full py-3 text-base font-semibold rounded-xl"
                            onClick={handleSubmit}
                            disabled={
                                !userType ||
                                (userType === 'student' && !classLevel) ||
                                (userType === 'job' && !jobTrack)
                            }
                        >
                            🚀 Save and Continue
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>


        </>
    );
};
