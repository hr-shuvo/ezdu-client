import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export const Social =() =>{
    return(
        <div className='flex items-center w-full gap-x-2'>
            <Button
                size="default"
                className="w-full flex items-center justify-center gap-2 text-gray-700 dark:text-white"
                variant="outline"
                onClick={() => {}}
            >
                <FcGoogle className="text-xl" />
                Google
            </Button>

            <Button
                size="default"
                className="w-full flex items-center justify-center gap-2 text-[#1877F2] dark:text-[#1877F2]"
                variant="outline"
                onClick={() => {}}
            >
                <FaFacebook className="text-xl" />
                Facebook
            </Button>


        </div>
    )
}