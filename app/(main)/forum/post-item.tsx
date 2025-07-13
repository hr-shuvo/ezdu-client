import { useRouter } from "next/navigation";
import { useSecure } from "@/context/SecureContext";
import { toast } from "sonner";
import Image from "next/image";
import { formatDate, formatRelativeDate } from "@/lib/date-time";
import { AiOutlineMessage } from "react-icons/ai";
import { Bookmark, MessageSquare, Star, ThumbsUp } from "lucide-react";

interface PostItemProps {
    data?: any
}

const PostItem = ({data}: PostItemProps) => {
    const router = useRouter();
    const {isLoggedIn, user} = useSecure();


    const goToUserProfile = (uid: string) => {
        if (uid) {
            router.push(`/u/${uid}`);
        } else {
            toast.error('User is not available');
            console.error("User ID is not available");
        }
    }

    const goToPost = (postId: string) => {
        if (postId) {
            router.push(`/forum/${postId}`);
        } else {
            toast.error('Post is not available');
            console.error("Post ID is not available");
        }
    }

    const onPostLike = (postId: string) => {
        if (!isLoggedIn) {
            toast.error('You must be logged in to like a post');
            return;
        }
        // Logic to handle post like
        console.log(`Post ${postId} liked by user ${user?._id}`);
        // You can add API call here to update the like status
    }

    const onBookMark = (postId: string) => {
        if (!isLoggedIn) {
            toast.error('You must be logged in to like a post');
            return;
        }
        // Logic to handle post like
        console.log(`Post ${postId} bookmarked by user ${user?._id}`);
        // You can add API call here to update the like status
    }


    return (
        <div
            onClick={() => goToPost(data?._id)}
            className="border-b-[1px] border-neutral-100 dark:border-neutral-800
            p-4 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900
            transition-colors duration-200"
        >
            <div
                className='flex flex-row items-start gap-3'
            >
                <div>
                    <Image
                        src={data?.user?.avatar || 'avatar/boy/1.svg'}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                    />

                </div>

                <div>
                    <div
                        className='flex flex-row items-center gap-2'
                    >
                        <p className='font-semibold cursor-pointer hover:underline'
                           onClick={() => goToUserProfile(data?.user?.username)}
                        >{data?.user?.name || 'anonymous'}</p>
                        <span className='text-neutral-500 hidden md:block'>
                            @{data?.user?.username || 'anonymous'}
                        </span>

                        <span className='text-neutral-500 text-sm'>{formatRelativeDate(data.createdAt)}</span>

                    </div>

                    <div className='text-neutral-700 dark:text-neutral-300 mt-2'>
                        {data?.content}
                    </div>

                    <div className='flex flex-row items-center gap-10 mt-3'>
                        <div className='flex flex-row items-center gap-2 text-neutral-500 cursor-pointer
                        transition hover:text-sky-500'
                        >
                            <MessageSquare className="w-5 h-5"/>
                            <p>
                                {data?.comments?.length || 0}
                            </p>

                        </div>

                        <div className='flex flex-row items-center gap-2 text-neutral-500 cursor-pointer
                        transition hover:text-lime-500'
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the click from propagating to the post item
                                onPostLike(data?._id);
                            }}
                        >
                            <Star size={16}/>
                            {/*<MessageSquare className="w-5 h-5" />*/}
                            <p>
                                {data?.comments?.length || 0}
                            </p>

                        </div>

                        <div className='flex flex-row items-center gap-2 text-neutral-500 cursor-pointer
                        transition hover:text-lime-500'
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the click from propagating to the post item
                                onBookMark(data?._id);
                            }}
                        >
                            <Bookmark size={16}/>
                            {/*<MessageSquare className="w-5 h-5" />*/}
                            <p>
                                {data?.comments?.length || 0}
                            </p>

                        </div>


                    </div>


                </div>


            </div>


        </div>
    );
}

export default PostItem;