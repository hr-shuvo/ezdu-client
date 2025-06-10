import { MetadataRoute } from "next";



export default function robots() : MetadataRoute.Robots{

    const baseUrl = 'https://www.ezduonline.com';

    return{
        rules:[
            {
                userAgent:"*",
                allow:"/",
                disallow:[
                    "/admin", 
                    "/academy/*",
                ]
            }
        ],
        sitemap:`${baseUrl}/sitemap.xml`
    }

}