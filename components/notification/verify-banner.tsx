'use client'


import React, { useState } from "react";
import { useSecure } from "@/context/SecureContext";
import { MdWarningAmber } from "react-icons/md";

const VerifyBanner = () => {
    const {user} = useSecure();
    const [showBanner, setShowBanner] = useState(true);
    return (
        <>
            {showBanner && user && !user?.isVerified && (
                <div
                    className="p-6 py-3 mb-2 bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                        <MdWarningAmber className="w-6 h-6 text-yellow-600 dark:text-yellow-300"/>
                        <span className="font-semibold">
        Please verify your account to unlock all features!
      </span>
                    </div>

                    <button
                        className="text-sm text-yellow-800 dark:text-yellow-200 hover:underline"
                        onClick={() => setShowBanner(false)}
                    >
                        Dismiss
                    </button>
                </div>
            )}

        </>
    );
}

export default VerifyBanner;