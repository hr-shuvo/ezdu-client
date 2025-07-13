import { Star, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";


const topUsers = [
    { id: 1, name: "Tanzim Rahman", xp: 1520 },
    { id: 2, name: "Sumaiya Akter", xp: 1390 },
    { id: 3, name: "Rakib Hasan", xp: 1250 },
];


const ForumEngagement = () => {
    return (

        <div className='hidden lg:block col-span-1 pl-2'>

            <div className="rounded-xl border  p-4 shadow-sm">
                <h2 className=" font-semibold mb-3 text-sky-700 dark:text-sky-300 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" /> Top Contributors
                </h2>

                <ul className="space-y-4">
                    {topUsers.map((user) => (
                        <li key={user.id} className="flex items-center justify-between text-sm">
                            <div>
                                <p className=" text-gray-800 dark:text-gray-200">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.xp} XP</p>
                            </div>
                            <Button variant="outline" size="sm" className="text-xs">
                                <UserPlus className="w-4 h-4 mr-1" /> <span className='hidden xl:block'>Follow</span>
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ForumEngagement;