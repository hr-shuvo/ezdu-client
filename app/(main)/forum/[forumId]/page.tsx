"use client"

import Header from "@/app/(main)/forum/_components/header";
import PostItem from "@/app/(main)/forum/post-item";
import { useSecure } from "@/context/SecureContext";
import { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import {
    getForumPost,
    loadForumComments,
    upsertForumComment
} from "@/app/_services/forum/forum-service";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ForumComment from "@/app/(main)/forum/[forumId]/comment-item";


const ForumView = () => {
    const params = useParams();
    const {isLoggedIn} = useSecure();
    const [isPending, startTransition] = useTransition();
    const [forumPost, setForumPost] = useState();
    const [forumComments, setForumComments] = useState<any[]>();
    const forumId = Array.isArray(params.forumId) ? params.forumId[0] : params.forumId;

    const [postBody, setPostBody] = useState('');


    useEffect(() => {
        startTransition(async () => {
            const response = await getForumPost(forumId);
            setForumPost(response);
        })
    }, [params.forumId]);

    useEffect(() => {
        if (forumPost) {
            loadComments();
        }
    }, [forumPost]);


    function submitCommentBody() {
        console.log("Post body set to:", postBody);

        if (postBody.trim() === '') {
            return;
        }

        if (!forumPost || !forumId) {
            return;
        }

        const formData = new FormData();
        formData.append('content', postBody);
        formData.append('discussionId', forumId);

        startTransition(async () => {
            const response = await upsertForumComment(formData);
            console.log(response);
            setPostBody('');
            loadComments();
            toast.success('Post shared successfully!');

        });
    }

    const loadComments = () => {
        if (!forumPost || !forumId) {
            return;
        }
        console.log("load comments ok");
        startTransition(async () => {
            const response = await loadForumComments(1, 10, forumId);
            setForumComments(response.data);
            // console.log(response.data);
        });
    }


    return (
        <>
            <div>
                <Header title={'Forum'} showBackArrow/>

                <PostItem data={forumPost}/>

                <div className='flex flex-row gap-4'>
                    <div className='w-full my-2'>
                        <Textarea
                            disabled={isPending}
                            onChange={(e: any) => {
                                setPostBody(e.target.value)
                            }}
                            value={postBody}
                            placeholder='share your answer or comment'
                            className='disabled:opacity-80 peer resize-none w-full ring-0 outline-none'
                        >

                        </Textarea>
                        <hr className='opacity-0 peer-focus:opacity-100'/>

                        <div className='mt-4 flex flex-row justify-end'>
                            <Button
                                variant='primary'
                                className='rounded-3xl px-4 py-2 mr-2 min-w-24 '
                                onClick={submitCommentBody}
                                disabled={isPending || postBody.trim() === ''}
                            >
                                {isLoggedIn ? 'Login to Post':'Post'}
                            </Button>

                        </div>

                    </div>


                </div>

                <div className='flex flex-col space-y-10'>
                    {
                        forumComments?.map((data, index) => (
                            <div key={index}>
                                <ForumComment data={data}/>

                            </div>
                        ))
                    }

                </div>

            </div>


        </>
    )

}

export default ForumView;