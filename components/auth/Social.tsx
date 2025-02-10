import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export const Social =() =>{
    return(
        <div className='flex items-center w-full gap-x-2'>
            <Button size='default' className='w-full' variant='outline' onClick={() =>{}}>
                <FcGoogle/>
            </Button>
            <Button size='default' className='w-full' variant='outline' onClick={() =>{}}>
                <FaFacebook color={'#1877F2'}/>
            </Button>

        </div>
    )
}