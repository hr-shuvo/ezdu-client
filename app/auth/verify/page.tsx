"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormSuccess } from "@/components/notification/form-success";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { sendVerificationCode, verificationByCode } from "@/services/authService";
import { toast } from "sonner";


const VerifyPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [otp, setOtp] = useState(Array(4).fill(""));
    const email = searchParams.get('email');
    const [timer, setTimer] = useState(60);

    // useEffect(() => {
    //     const firstInput = document.getElementById("otp-0");
    //     firstInput?.focus();
    // }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerifyCode = () => {
        const code = otp.join("");
        if (code.length < 4) {
            toast.error("Please enter a valid 4-digit code");
            return;
        }

        if (!email) {
            toast.error("Please enter a valid email address");
            return;
        }

        verificationByCode(email, code).then(
            (response) => {
                // console.log(response);
                if (response.success) {
                    toast.success(response.data);

                    router.push("/");
                } else {
                    toast.error("Verification failed. Please try again.");
                }
            }
        ).catch((error) => {
                console.error("Error verifying code:", error);
                toast.error("An error occurred while verifying the code.");
            }
        );

    }

    const handleResendCode = () => {
        if (!email) {
            toast.error("Invalid email address");
            return;
        }
        sendVerificationCode(email).then(
            (response) => {
                // console.log(response);
                if (response.success) {
                    setOtp(Array(4).fill(""));
                    setTimer(60);
                } else {
                    console.error(response.error);
                }
            }
        ).catch((error) => {
                console.error("Error sending verification code:", error);
            }
        )
    }


    return (
        <CardWrapper headerLabel={'Verify Account'} backButtonLabel={'Wrong email? Change it'}
                     backButtonHref={'/auth/login-with-code'}>

            <div className="space-y-4">


                <FormSuccess message={`Verification sent to ${email}`}/>

                <div className="flex justify-center mt-8">
                    <div className="grid grid-cols-4 gap-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                maxLength={1}
                                className="text-center text-2xl font-bold w-14 h-14 border-2 border-gray-300 focus:border-sky-700 focus:outline-none focus:ring-0 rounded-md"
                            />

                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <Button
                        variant={otp.includes("") ? 'default':'primary'}
                        disabled={otp.includes("")} type='button'
                        onClick={handleVerifyCode}
                        className="w-full"
                    >
                        Verify Code
                    </Button>

                </div>


                <p className="text-center text-sm text-muted-foreground">
                    {timer > 0 ? (
                        <>You can resend the code in {timer} seconds.</>
                    ) : (
                        <button type='button'
                                onClick={() =>handleResendCode()}
                                className="underline text-blue-600 hover:text-blue-800"
                        >
                            Resend code
                        </button>
                    )}
                </p>


                <p className="text-center text-sm text-muted-foreground">
                    Check your email for the verification link. If it’s not there, look in your spam folder.
                </p>
            </div>


        </CardWrapper>
    )

}

export default VerifyPage;