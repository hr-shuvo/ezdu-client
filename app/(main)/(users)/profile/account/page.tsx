'use client';

import { useEffect, useState, useTransition } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/services/authService";
import { Button } from "@/components/ui/button";

interface AccountField {
    key: string;
    label: string;
    value: string;
    type?: 'text' | 'password';
}



export default function AccountSettings() {
    const [isPending, startTransition] = useTransition();
    const [fields, setFields] = useState<AccountField[]>([]);
    const [editingKey, setEditingKey] = useState<string | null>(null);
    const [tempValue, setTempValue] = useState('');

    useEffect(() => {
        startTransition(async () => {
            const _user = (await getCurrentUser())?.data;
            // console.log(_user.data);

            if (_user) {
                setFields([
                    {key: 'name', label: 'Name', value: _user.name},
                    {key: 'email', label: 'Email', value: _user.email},
                    {key: 'password', label: 'Password', value: '********', type: 'password'},
                ]);
            }
        })
    }, []);

    const startEditing = (key: string, currentValue: string) => {
        setEditingKey(key);
        setTempValue(key === 'password' ? '' : currentValue);
    };

    const cancelEditing = () => {
        setEditingKey(null);
        setTempValue('');
    };

    const saveEditing = () => {
        setFields((prev) =>
            prev.map((field) =>
                field.key === editingKey
                    ? { ...field, value: editingKey === 'password' ? '********' : tempValue }
                    : field
            )
        );
        cancelEditing();
        // TODO: Call backend to save updated field
    };

    if(isPending) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">

            <Card>
                <CardHeader>
                    <CardTitle></CardTitle>
                </CardHeader>

                <CardContent>

                    <div  className={'flex flex-col space-y-6'}>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
                            <div className="space-y-4">
                                {fields.map(({ key, label, value, type }) => (
                                    <div key={key} className="flex items-center gap-4">
                                        <div className="w-32 font-medium">{label}:</div>
                                        {editingKey === key ? (
                                            <>
                                                <input
                                                    type={type === 'password' ? 'password' : 'text'}
                                                    value={tempValue}
                                                    onChange={(e) => setTempValue(e.target.value)}
                                                    className="border border-gray-300 rounded px-3 py-1 flex-1"
                                                />
                                                <button
                                                    onClick={saveEditing}
                                                    className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={cancelEditing}
                                                    className="border px-3 py-1 rounded hover:bg-gray-100"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex-1">{value}</div>
                                                <button
                                                    onClick={() => startEditing(key, value)}
                                                    className="text-sky-600 hover:underline"
                                                >
                                                    {key === 'password' ? 'Change Password' : 'Edit'}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Social Accounts</h2>
                            <div className="space-y-4">
                                <SocialAccount provider="Google" icon={<FaGoogle />} connected />
                                <SocialAccount provider="Facebook" icon={<FaFacebook />} connected={false} />
                            </div>
                        </section>
                    </div>

                </CardContent>
            </Card>

        </div>
    );
}

function SocialAccount({
                           provider,
                           icon,
                           connected,
                       }: {
    provider: string;
    icon: React.ReactNode;
    connected: boolean;
}) {
    return (
        <div className="flex items-center justify-between border px-4 py-2 rounded-md">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                {icon}
                <span>{provider}</span>
            </div>
            <Button size='sm' className={'min-w-28'}
                variant={connected ? 'destructive' : 'primary'}
            >
                {connected ? 'Disconnect' : 'Connect'}
            </Button>
        </div>
    );
}
