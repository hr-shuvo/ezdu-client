import { LucideArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
    title?: string;
    showBackArrow?: boolean
}

const Header = ({title, showBackArrow = false}: Props) => {
    return (
        <div className='px-2 py-4'>
            <div className='flex items-center gap-2 mb-2'>

                <Link
                    className='flex items-center gap-2 font-semibold '
                    href={'.'}
                >
                    {showBackArrow && (
                        <LucideArrowLeft size={20}/>
                    )}

                    {title}
                </Link>

            </div>

            {/*<h2 className='text-2xl'>{title}</h2>*/}
        </div>
    );
}

export default Header;
