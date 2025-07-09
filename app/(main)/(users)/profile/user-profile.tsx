'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser } from '@/services/authService';
import { useEffect, useState, useTransition } from 'react';
import Loading from '@/app/(voclift)/courses/loading';

interface User {
    name: string;
    email: string;
    location: string;
}

interface UserInfoField {
    label: string;
    value: string;
    key: keyof User;
}


const UserProfile = () => {
    const [isPending, startTransition] = useTransition();
    // const [user, setUser] = useState<any>();

    const [fields, setFields] = useState<UserInfoField[]>([]);
    const [editingKey, setEditingKey] = useState<keyof User | null>(null);
    const [tempValue, setTempValue] = useState('');


    useEffect(() => {
        startTransition(async () => {
            const _user = (await getCurrentUser())?.data;
            // console.log(_user.data);
            // setUser(_user);

            if (_user) {
                setFields([
                    {key: 'name', label: 'Name', value: _user.name},
                    {key: 'email', label: 'Email', value: _user.email},
                    {key: 'location', label: 'Location', value: _user.location},
                ]);
            }
        })
    }, []);

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


    if (isPending) {
        return <Loading/>
    }


    return (
        <>

            <div className="w-full space-y-6">

                <Card className="">
                    <CardHeader>
                        <CardTitle>Basic Info</CardTitle>
                    </CardHeader>
                    <CardContent>

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
                    </CardContent>

                </Card>

            </div>


        </>
    )

}


export default UserProfile;