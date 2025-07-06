import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const trendingBlogs = [
    {title: "Master Anything with Consistent Learning", date: "July 5, 2025"},
    {title: "How Daily Study Boosts Creativity", date: "July 4, 2025"},
    {title: "The Hidden Benefits of Learning Every Day", date: "July 3, 2025"},
    {title: "Boost Your Productivity with Daily Learning", date: "July 2, 2025"},
];

const BlogPost = () => {

    return (
        <>

            <main className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-2">

                <div className="">
                    <div className="max-w-5xl mx-auto px-4">
                        <Card className="overflow-hidden rounded-2xl border-0">
                            <img
                                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
                                alt="Featured blog post cover"
                                className="w-full h-72 md:h-96 object-cover"
                            />
                            <CardContent className="p-6 md:p-8">
                                <CardHeader className="p-0 mb-4">
                                    <CardTitle className="text-4xl font-bold mb-2">
                                        The Power of Learning Daily
                                    </CardTitle>
                                    <CardDescription className="text-gray-500 text-sm">
                                        July 6, 2025 • Jane Doe
                                    </CardDescription>
                                </CardHeader>

                                <article className="prose prose-green max-w-none text-lg">
                                    <p>
                                        Learning every day can transform the way you approach your goals
                                        and mindset. Even just a few minutes a day helps build momentum
                                        and keeps your curiosity alive.
                                    </p>

                                    <img
                                        src="https://images.unsplash.com/photo-1513258496099-48168024aec0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                                        alt="Learning environment"
                                        className="rounded-xl my-6 w-full object-cover shadow"
                                    />

                                    <p>
                                        Studies show consistent learning habits can significantly improve
                                        your cognitive abilities, memory, and creativity. By making
                                        learning a daily ritual, you train your brain to adapt faster and
                                        better retain new information.
                                    </p>

                                    <img
                                        src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                                        alt="Notebook and coffee"
                                        className="rounded-xl my-6 w-full object-cover shadow"
                                    />

                                    <h2>Tips to Keep Learning Consistently</h2>
                                    <ul>
                                        <li>Set aside dedicated time each day for learning.</li>
                                        <li>Break topics into small, manageable chunks.</li>
                                        <li>Track your progress and celebrate milestones.</li>
                                        <li>Mix formats: read, watch videos, or join discussions.</li>
                                    </ul>

                                    <blockquote>
                                        "An investment in knowledge pays the best interest." – Benjamin
                                        Franklin
                                    </blockquote>

                                    <p>
                                        Remember, it’s not about perfection, but about building a habit
                                        that compounds over time. Start today and watch your growth
                                        accelerate!
                                    </p>
                                </article>
                            </CardContent>
                        </Card>
                    </div>

                </div>

                <div>

                    <div className="p-4 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">More...</h2><ul className="space-y-4">
                        {trendingBlogs.map((blog, idx) => (
                            <li key={idx} className="border-b pb-3 last:border-none">
                                <h3 className="font-semibold text-lg hover:text-green-600 cursor-pointer transition">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-500 text-sm">{blog.date}</p>
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