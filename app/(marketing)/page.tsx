import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className='justify-items-center'>


            <p className='font-bold my-5'>this is a marketing page</p>

            <Button><Link href={'/buttons'}>Button List</Link> </Button>
        </div>


    );
}
