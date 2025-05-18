import React from "react";
import ADSense from "@/components/Ads/AdSense";


type Props = {
    children: React.ReactNode
};
export const StickyWrapper = ({children}: Props) => {

    return (
        <div className='hidden lg:block w-[368px] sticky self-end bottom-6'>
            <div className='min-h-[calc(100vh-48px)] sticky top-6 flex flex-col gap-y-4'>
                <div>
                    {children}
                </div>

                <div>
                    {/*<Script async*/}
                    {/*        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}*/}
                    {/*        crossOrigin="anonymous"></Script>*/}

                    <ADSense/>
                    {/*<AdBanner dataAdSlot={''} dataAdFormat={'auto'} dataFullWidthResponsive={true}/>*/}
                </div>

            </div>

        </div>
    )

}