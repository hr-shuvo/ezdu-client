'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser } from '@/services/authService';
import { useEffect, useState, useTransition } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { loadAcademicClass } from "@/app/_services/academy/academyService";
import { updateUser } from "@/app/_services/user-service";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
    name: string;
    email: string;
    location: string;
    userType?: {
        category: 'HSC' | 'SSC' | 'JOB';
        classId?: string;
        group?: string;
        jobTrack?: string;
    };
}

interface UserInfoField {
    label: string;
    value: string;
    key: keyof User;
}


const UserProfile = () => {
    const [isPending, startTransition] = useTransition();
    const [user, setUser] = useState<any>();

    const [fields, setFields] = useState<UserInfoField[]>([]);
    const [editingKey, setEditingKey] = useState<keyof User | null>(null);
    const [tempValue, setTempValue] = useState('');

    const [userType, setUserType] = useState<'student' | 'job' | ''>('student');
    const [classLevel, setClassLevel] = useState(''); // class ID
    const [group, setGroup] = useState('');
    const [jobTrack, setJobTrack] = useState('');
    const [classes, setClasses] = useState<any[]>([]);
    const [academicClass, setAcademicClass] = useState<any>();
    const [showGroup, setShowGroup] = useState(false);


    useEffect(() => {
        startTransition(async () => {
            const _user = (await getCurrentUser())?.data;
            // console.log(_user);
            setUser(_user);

            if (_user) {
                setFields([
                    {key: 'name', label: 'Name', value: _user.name},
                    {key: 'email', label: 'Email', value: _user.email},
                    {key: 'location', label: 'Location', value: _user.location},
                ]);
            }
        })
    }, []);

    useEffect(() => {
        startTransition(async () => {
            const _classes = await loadAcademicClass(1, 100);
            setClasses(_classes.data);
        })
    }, [])

    useEffect(() => {
        // console.log(classLevel)
        if(!classes) return;

        const _class = classes.find(c => c._id === classLevel);
        // console.log(_class);
        setAcademicClass(_class);

        if (_class && _class.groups &&
            _class.groups.length > 0) {
            setShowGroup(true)
        } else {
            setShowGroup(false);
        }

    }, [classLevel, classes])

    useEffect(() => {
        if (user?.userType) {
            // console.log(user.userType);
            setUserType(user.userType.category === 'JOB' ? 'job' : 'student');
            setClassLevel(user.userType.classId || '');
            setGroup(user.userType.group || '');
            setJobTrack(user.userType.jobTrack || '');
        } else {
            setUserType('student');
            setClassLevel('');
            setGroup('');
            setJobTrack('');
        }
    }, [user, classes]);

    const startEditing = (key: keyof User, currentValue: string) => {
        setEditingKey(key);
        setTempValue(currentValue);
    };

    const cancelEditing = () => {
        setEditingKey(null);
        setTempValue('');
    };

    const saveEditing = () => {
        setFields((prev) =>
            prev.map((field) =>
                field.key === editingKey ? {...field, value: tempValue} : field
            )
        );
        setEditingKey(null);
        setTempValue('');
        // TODO: Call API to save update
        console.log(tempValue)
    };

    const handleSubmit = () => {

        const user = {
            userType: {
                category: academicClass?.segment,
                classId: academicClass?._id,
                group: showGroup ? group : "",
                jobTrack: jobTrack ?? null
            }
        }

        startTransition(async () => {
            const response = await updateUser(user);
            if (response.success) {
                toast.success('Profile updated successfully!');
            } else {
                toast.error('Failed to update profile. Please try again.');
            }
        })


    };


    return (
        <>

            <div className="w-full space-y-6">

                <Card className="">
                    <CardHeader>
                        <CardTitle>Basic Info</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {
                            isPending ? (
                                    <>
                                        <div>
                                        <Skeleton className='h-12 w-full'/>
                                        </div>
                                    </>
                                ) :
                                (
                                    <>
                                        <div className="space-y-6">
                                            {fields.map(({key, label, value}) => (
                                                <div key={key} className="flex items-center gap-4">
                                                    <div className="w-24 font-semibold">{label}:</div>

                                                    {editingKey === key ? (
                                                        <>
                                                            <input
                                                                type="text"
                                                                value={tempValue}
                                                                onChange={(e) => setTempValue(e.target.value)}
                                                                className="border border-gray-300 rounded px-2 py-1 flex-1"
                                                            />
                                                            <button
                                                                onClick={saveEditing}
                                                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={cancelEditing}
                                                                className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="flex-1">{value}</div>
                                                            <button
                                                                onClick={() => startEditing(key, value)}
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                Edit
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )
                        }


                    </CardContent>

                </Card>


                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>User Type</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        <div>
                            <Label className="text-base mb-1 block">Who are you?</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant={userType === 'student' ? 'primary' : 'outline'}
                                    className="py-3 text-base rounded-xl h-14"
                                    onClick={() => {
                                        setUserType('student');
                                        setJobTrack('');
                                    }}
                                >
                                    🧑‍🎓 Student
                                </Button>
                                <Button
                                    variant={userType === 'job' ? 'primary' : 'outline'}
                                    className="py-3 text-base rounded-xl h-14"
                                    onClick={() => {
                                        setUserType('job');
                                        setClassLevel('');
                                        setGroup('');
                                    }}
                                >
                                    💼 Job Holder
                                </Button>
                            </div>
                        </div>

                        {userType === 'student' && (
                            <>
                                <div>
                                    <Label className="text-base mb-1 block">Which class are you in?</Label>
                                    <Select value={classLevel} onValueChange={setClassLevel}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select class"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classes.map((item: any) => (
                                                <SelectItem key={item._id} value={item._id}>
                                                    {item.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {showGroup && (
                                    <div>
                                        <Label className="text-base mb-1 block">Which group are you in?</Label>
                                        <Select value={group} onValueChange={setGroup}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select group"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {academicClass?.groups?.map((item: string) => (
                                                    <SelectItem key={item} value={item}>
                                                        {item}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </>
                        )}

                        {userType === 'job' && (
                            <div>
                                <Label className="text-base mb-1 block">Which job track are you preparing for?</Label>
                                <Select value={jobTrack} onValueChange={setJobTrack}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select track"/>
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
                            Save & Update Profile
                        </Button>
                    </CardContent>
                </Card>


            </div>


        </>
    )

}


export default UserProfile;