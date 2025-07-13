'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useTransition } from 'react';
import { Label } from '@/components/ui/label';
import { useAskSetupProfileModal } from '@/store/use-modal-state';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaGem } from 'react-icons/fa';
import { loadAcademicClass } from '@/app/_services/academy/academyService';
import { getCurrentUser } from '@/services/authService';
import { updateUser } from '@/app/_services/user-service';
import { useSecure } from '@/context/SecureContext';
import { toast } from 'sonner';
import Loading from '@/app/(voclift)/learn/loading';


export const AskSetupProfileModal = () => {
    const { isLoggedIn, user, setUser } = useSecure();
    const { isOpen, close, open } = useAskSetupProfileModal();
    const [isPending, startTransition] = useTransition();
    const [showGroup, setShowGroup] = useState(false);

    const [isClient, setIsClient] = useState(false);
    const [userType, setUserType] = useState<'student' | 'job' | ''>('student');
    const [classLevel, setClassLevel] = useState('');
    const [group, setGroup] = useState('');
    const [jobTrack, setJobTrack] = useState('');
    const [currentUser, setCurrentUser] = useState<any>();

    const [classes, setClasses] = useState<any[]>([]);
    const [academicClass, setAcademicClass] = useState<any>();

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        }

        setIsClient(true);
    }, [user]);

    useEffect(() => {
        if (isLoggedIn && user && !user.userType) {
            open();
        }
        
        // console.log(user)
    }, [isClient, isLoggedIn, user])

    useEffect(() => {
        startTransition(async () => {
            const _classes = await loadAcademicClass(1, 100);
            setClasses(_classes.data);
        })
    }, [])

    useEffect(() => {
        // console.log(classLevel)
        const _class = classes.find(c => c._id === classLevel);
        // console.log(_class);
        setAcademicClass(_class);

        if (_class && _class.groups &&
            _class.groups.length > 0) {
            setShowGroup(true)
        } else {
            setShowGroup(false);
        }       

    }, [classLevel])


    if (!isClient) {
        return null;
    }

    if(isPending){
        return (
            <>
            <Loading/>
            </>
        )
    }

    

    const handleSubmit = () => {
        startTransition(async () => {
            if (!currentUser) {
                const _currentUser = await getCurrentUser();
                // console.log(_currentUser);
                setCurrentUser(_currentUser);
            }

            const userType = {
                category: academicClass?.segment,
                classId: academicClass?._id,
                group: showGroup ? group : "",
                jobTrack: jobTrack
            };

            // const _newUserData = { ...currentUser, userType: userType }
            const _newUserData = { userType: userType }

            await updateUser(_newUserData).then(result => {
                if (result.success) {
                    setUser(result.success);
                    close();
                    toast.success('Congratulations!!! happy learning...')
                }
                else{
                    toast.error('Something went wrong, please try again.')
                }
            })

        });
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

                            <>
                                <div>

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

                                    {
                                        academicClass && academicClass.groups &&
                                        academicClass.groups.length > 0 && (
                                            <>

                                                <div>
                                                    <Label className="text-base mb-1 block">Which Group are you in?</Label>
                                                    <Select value={group} onValueChange={setGroup}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select class" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {
                                                                academicClass.groups.map((item: string) => (
                                                                    <SelectItem key={item} value={item}>
                                                                        {item}
                                                                    </SelectItem>
                                                                ))

                                                            }

                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </>
                                        )

                                    }

                                </div>

                            </>
                        )}

                        {userType === 'job' && (
                            <div>
                                <Label className="text-base mb-1 block">Which job track are you preparing for?</Label>
                                <Select value={jobTrack} onValueChange={setJobTrack}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select track" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="BCS">🔥 BCS</SelectItem>
                                        <SelectItem value="BANK">🏦 Bank Job</SelectItem>
                                        <SelectItem value="GOVT">🏛️ Govt Job</SelectItem>
                                        <SelectItem value="GENERAL">📘 General Job Prep</SelectItem>
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
