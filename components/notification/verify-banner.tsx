'use client'


import React, { useState } from "react";
import { useSecure } from "@/context/SecureContext";

const VerifyBanner = () => {
    const {user} = useSecure();
    const [showBanner, setShowBanner] = useState(true);
    return (
        <>
            {showBanner && !user?.isVerified && (
                <div
                    className="p-6 py-3 mb-2 bg-yellow-100 border border-yellow-300 text-yellow-900 rounded-xl  flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                        <svg
                            className="w-6 h-6 text-yellow-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.636-1.14.99-2L13.99 4c-.618-.84-1.958-.84-2.576 0L3.052 17c-.646.86-.064 2 .99 2z"
                            />
                        </svg>
                        <span className="font-semibold">
        Please verify your account to unlock all features!
      </span>
                    </div>

                    <button
                        className="text-sm text-yellow-800 hover:underline"
                        onClick={() => setShowBanner(false)}>
                        Dismiss
                    </button>
                </div>
            )}

        </>
    );
}

export default VerifyBanner;