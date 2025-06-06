'use client';

import Script from "next/script";
import React from "react";

type Props = {
    pId?: string
}

const ADSense = ({pId}: Props) => {

    const adsenseClientId = pId ?? process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;

    return (
        <Script async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
                crossOrigin="anonymous"
                // strategy='afterInteractive'
        ></Script>
    )

}

export default ADSense;