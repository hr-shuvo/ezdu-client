'use client'

import React, { useEffect } from "react";

type Props = {
    dataAdSlot: string,
    dataAdFormat: string,
    dataFullWidthResponsive: boolean,
}

const ADBanner = ({dataAdSlot, dataAdFormat, dataFullWidthResponsive}: Props) => {

    const adsenseClientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;

    useEffect(() => {
        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
        } catch (e:any) {
            console.error(e.message)        }
    }, [])

    return (
        <ins
            className='adsbygoogle'
            // style={{display: 'block'}}
            data-ad-client={adsenseClientId}
            data-ad-format={dataAdFormat}
            data-ad-slot={dataAdSlot}
            data-full-width-responseve={dataFullWidthResponsive.toString()}
        >

        </ins>
    )

}

export default ADBanner;