import { MetadataRoute } from "next";



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.ezduonline.com';
    
    return [
        {
            url: `${baseUrl}/academy`,
            // lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/academy/qb`,
            // lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/academy/quiz`,
            // lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/academy/subjects`,
            // lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.9,
        },        
        {
            url: `${baseUrl}/admission`,
            // lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },        
        {
            url: `${baseUrl}/leaderboard`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        }
        // {
        //     url: `${baseUrl}/jobs`,
        //     // lastModified: new Date(),
        //     changeFrequency: 'monthly',
        //     priority: 0.7,
        // },
        // ...subjectSitemapEntries

    ]
}