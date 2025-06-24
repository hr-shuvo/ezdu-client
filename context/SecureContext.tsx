'use client';

import { loginUser } from "@/app/_services/auth";
import httpClient, { setGlobalErrorHandler } from "@/lib/httpClient";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    location: string;
    userType: any;
}

interface SecureContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoggedIn: boolean;
    login: () => Promise<void>;
    logout: () => void;
}

const SecureContext = createContext<SecureContextType>({
    user: null,
    setUser: () => { },
    isLoggedIn: false,
    login: async () => { },
    logout: () => { },
});

export const SecureProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const login = async () => {
         httpClient
            .get('/users/current-user')
            .then((res) => {
                setUser(res.data);
                toast.success('user logged in');
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    // logout();
                }
            });
    };

    const logout = async () => {
        try {
            await httpClient.post('/auth/logout', {});
            setUser(null);

            toast.warning("logged out")
        } catch (err: any) {
            toast.warning('Logged out due to session expired');
            setUser(null);

            // return { error: err?.response?.data?.msg };
            console.error(err?.response?.data?.msg);            
        }
        finally{
            router.push('/')
        }
    };


    useEffect(() => {
        setGlobalErrorHandler((msg: string) => {
            toast.error(msg);
        });
    }, []);


    useEffect(() => {
        httpClient
            .get('/auth/user')
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    // logout();
                }
            });
    }, []);

    return (
        <SecureContext.Provider value={{ user, setUser, isLoggedIn: !!user, login, logout }}>
            {children}
        </SecureContext.Provider>
    );
};

export const useSecure = () => useContext(SecureContext);
