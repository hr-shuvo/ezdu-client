
import { getBlogPost } from "@/app/_services/public/blog-post-service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { formatDate } from "@/lib/date-time";

interface BlogPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const trendingBlogs = [
    {title: 'Master Anything with Consistent Learning', date: 'July 5, 2025'},
    {title: 'How Daily Study Boosts Creativity', date: 'July 4, 2025'},
    {title: 'The Hidden Benefits of Learning Every Day', date: 'July 3, 2025'},
    {title: 'Boost Your Productivity with Daily Learning', date: 'July 2, 2025'},
];


const BlogPost = async ({ params }: BlogPageProps) => {
    const { slug } = await params;
    const blogPost = await getBlogPost(slug);

    console.log(blogPost);
    return(
        <>

            <main className='grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-2'>

                <div className=''>
                    <div className='max-w-5xl mx-auto px-4'>
                        <Card className='overflow-hidden rounded-2xl border-0'>
                            <Image
                                src={blogPost.coverImageUrl}
                                alt='Featured blog post cover'
                                className='w-full h-72 md:h-96 object-cover'
                                width={1200}
                                height={400}
                                style={{ width: '100%', height: 'auto', maxHeight: '420px' }}
                            />
                            <CardContent className='p-6 md:p-8'>
                                <CardHeader className='p-0 mb-4'>
                                    <CardTitle className='text-4xl font-bold mb-2'>
                                        {blogPost.title}
                                    </CardTitle>
                                    <CardDescription className='text-gray-500 text-sm'>
                                        {formatDate(blogPost.updatedAt)} • {blogPost.author?.name || 'Ezdu Team'}
                                    </CardDescription>
                                </CardHeader>

                                <article className='prose prose-green max-w-none text-lg'>
                                    {
                                        blogPost.content ? (
                                            <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                                        ) : (
                                            <p className='text-gray-500'>No content available for this post.</p>
                                        )
                                    }
                                </article>
                            </CardContent>
                        </Card>
                    </div>

                </div>

                <div>

                    <div className='p-4 rounded-lg shadow'>
                        <h2 className='text-2xl font-bold mb-4'>More...</h2><ul className='space-y-4'>
                        {trendingBlogs.map((blog, idx) => (
                            <li key={idx} className='border-b pb-3 last:border-none'>
                                <h3 className='font-semibold text-lg hover:text-green-600 cursor-pointer transition'>
                                    {blog.title}
                                </h3>
                                <p className='text-gray-500 text-sm'>{blog.date}</p>
                            </li>
                        ))}
                    </ul>

                    </div>

                </div>

            </main>


        </>
    )
};

export default BlogPost;