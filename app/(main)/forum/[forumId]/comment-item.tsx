import Image from "next/image";
import { formatRelativeDate } from "@/lib/date-time";

type Props = {
    data:any
}

const ForumComment = ({data}: Props) => {
    function goToUserProfile(username: any) {
        console.log(username)
        
    }

    return (
        <>
            <div
                className='flex flex-row items-start gap-3'
            >
                <div>
                    <Image
                        src={data?.user?.avatar || '/avatar/boy/1.svg'}
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

                        <span className='text-neutral-500 text-sm'>{formatRelativeDate(data?.createdAt)}</span>

                    </div>

                    <div className='text-neutral-700 dark:text-neutral-300 mt-2'>
                        {data?.content}
                    </div>

                </div>


            </div>



        </>
    )
}

export default ForumComment;