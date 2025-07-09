import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { loadBlogPost } from '@/app/_services/public/blog-post-service';
import { formatDate } from '@/lib/date-time';

const trendingBlogs = [
    {
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        title: 'Boost Your Productivity with Daily Learning',
        author: 'Michael Green',
        date: 'July 3, 2025',
    },
    {
        url: 'https://images.unsplash.com/photo-1560264418-c4445382edbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        title: 'Learning Languages Faster: Myths vs Facts',
        author: 'John Smith',
        date: 'July 5, 2025',
    },
    {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        title: 'How to Stay Curious and Keep Learning',
        author: 'Samantha Ray',
        date: 'July 2, 2025',
    },
];


type Props = {
    trending: any[]
}

const BlogPage = async ({trending}: Props) => {
    const featuredBlogList  = await loadBlogPost(1, 1, 'FEATURED');
    const featuredBlog = featuredBlogList.data?.[0] ?? null;


    console.log(featuredBlog);



    trending = trendingBlogs

    return (

        <>

            <div className='text-gray-900 '>
                {/* =================== Featured Section =================== */}
                <section className='max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                    {/* Left side text */}
                    <div className='flex flex-col justify-center space-y-4'>
                        <p className='text-sm text-gray-500 dark:text-gray-200 uppercase tracking-wide font-semibold'>
                            {formatDate(featuredBlog.updatedAt)} &nbsp;&bull;&nbsp; {featuredBlog.author?.name || 'Ezdu Team'}
                        </p>

                        <h1 className='text-4xl md:text-5xl font-extrabold text-lime-500 leading-tight'>
                            {featuredBlog.title}
                        </h1>

                        <p className='text-lg text-gray-700 dark:text-gray-200 max-w-xl'>
                            {featuredBlog.subTitle}
                        </p>

                        <Link href={`/blog/${featuredBlog.slug}`} className='mt-4'>
                            <Button className='inline-block w-max rounded-full font-bold ' variant={'primary'} size={'lg'}>Read More</Button>

                        </Link>
                    </div>

                    {/* Right side image */}
                    <div className='relative w-full h-72 md:h-[400px] rounded-xl overflow-hidden shadow-lg'>
                        <img
                            src={featuredBlog.coverImageUrl}
                            alt='Featured blog'
                            className='w-full h-full object-cover'
                            loading='lazy'

                        />
                    </div>
                </section>



                {/* =================== Highlighted Blogs =================== */}
                <section className='max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {[
                        {
                            title: 'How to Stay Motivated',
                            url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=300',
                        },
                        {
                            title: 'Best Apps for Learning',
                            url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=300',
                        },
                        {
                            title: 'Language Myths Debunked',
                            url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=300',
                        },
                    ].map((blog, idx) => (
                        <Card
                            key={idx}
                            className='overflow-hidden shadow-md hover:shadow-2xl transition-transform duration-300 rounded-lg'
                        >
                            <img
                                src={blog.url}
                                alt={blog.title}
                                className='w-full h-48 object-cover rounded-t-lg'
                            />
                            <CardContent className='p-4'>
                                <CardHeader className='p-0 mb-2'>
                                    <CardTitle
                                        className='text-xl font-semibold hover:text-green-600 cursor-pointer transition duration-300'>{blog.title}</CardTitle>
                                </CardHeader>
                                <CardDescription className='text-gray-600 dark:text-gray-200 text-sm'>
                                    A quick overview of {blog.title.toLowerCase()} and how it can help you on your
                                    language journey.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </section>

                {/* =================== Trending Blogs =================== */}

                <section className='max-w-7xl mx-auto px-4 py-16 '>
                    <h2 className='text-2xl font-bold  mb-6'>
                        Trending Now
                    </h2>


                    <div className=' space-y-8'>
                        {
                            trending.map((blog, idx) => (
                                <Card
                                    key={idx}
                                    className='flex flex-col md:flex-row overflow-hidden duration-300 shadow-lg hover:shadow-2xl rounded-2xl border-0'
                                >
                                    <img
                                        src={blog.url}
                                        alt={blog.title}
                                        className='w-full md:w-56 h-64 object-cover rounded-t-2xl md:rounded-t-none md:rounded-l-2xl flex-shrink-0'
                                    />
                                    <CardContent className='p-6 flex flex-col justify-center'>
                                        <CardHeader className='p-0 mb-3'>
                                            <CardTitle
                                                className='text-2xl font-bold hover:text-green-600 cursor-pointer transition duration-300'>
                                                {blog.title}
                                            </CardTitle>
                                            <CardDescription className='text-gray-500 dark:text-gray-100 text-sm flex items-center gap-2'>
                                                <svg
                                                    className='w-4 h-4 text-green-500'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    strokeWidth='2'
                                                    viewBox='0 0 24 24'
                                                    aria-hidden='true'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                                                    />
                                                </svg>
                                                {blog.date} • {blog.author}
                                            </CardDescription>
                                        </CardHeader>
                                        <p className='text-gray-600 dark:text-gray-200 text-base'>
                                            Explore how {blog.title.toLowerCase()} can impact your daily-learning
                                            success.
                                        </p>
                                    </CardContent>
                                </Card>

                            ))}
                    </div>
                </section>


                <div className='text-center mt-2'>
                    <Link href='/blog/archive'>
                        <Button className='rounded-full font-bold' variant='outline' size='lg'>
                            Show All Blogs
                        </Button>
                    </Link>
                </div>



                {/* =================== Footer / CTA =================== */}
                <section className="bg-sky-600 text-white py-12 mt-12 text-center dark:bg-sky-700 dark:text-white"
                >
                    <h2 className='text-3xl font-bold mb-4'>Ready to start your language journey?</h2>
                    <p className='mb-6 max-w-2xl mx-auto'>
                        Join thousands of learners improving their lives through language. Stay updated with our latest
                        blogs.
                    </p>
                    <button
                        className='bg-white text-sky-700 font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition'>
                        Subscribe Now
                    </button>
                </section>
            </div>

        </>
    )
};

export default BlogPage;

