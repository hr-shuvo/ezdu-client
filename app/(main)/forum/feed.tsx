import PostItem from "@/app/(main)/forum/post-item";

type Props = {
    posts: any[]
};


const ForumFeed = ({posts}: Props) => {
    return (
        <>
            {
                posts.map((post, index) => (

                    <PostItem key={index} data={post}/>


                ))
            }


        </>
    );
}

export default ForumFeed;