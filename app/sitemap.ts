import { MetadataRoute } from "next";


// interface Subject {
//     _id: string;
// }

// interface ApiResponse {
//     data: Subject[];
//     total?: number;
//     page?: number;
//     pageSize?: number;
// }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.ezduonline.com';
    // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // const responseData: ApiResponse = await (await fetch(`${apiUrl}academy/subjects?pg=1&sz=5`)).json();
    // const subjects: Subject[] = responseData.data || [];

    // const subjectSitemapEntries = subjects.map((subject: Subject) => ({
    //     url: `${baseUrl}/academy/subjects/${subject._id}`, 
    //     changeFrequency: 'monthly' as const, 
    //     priority: 0.5,
    // }));

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
            priority: 0.8,
        },
        {
            url: `${baseUrl}/academy/subjects`,
            // lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },        
        {
            url: `${baseUrl}/admission`,
            // lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },        
        {
            url: `${baseUrl}/jobs`,
            // lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        // ...subjectSitemapEntries

    ]
}