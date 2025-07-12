import { Star, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";


const topUsers = [
    { id: 1, name: "Tanzim Rahman", xp: 1520 },
    { id: 2, name: "Sumaiya Akter", xp: 1390 },
    { id: 3, name: "Rakib Hasan", xp: 1250 },
];


const ForumEngagement = () => {
    return (

        <div className='hidden lg:block col-span-1 pl-2'>

            <Card className="rounded-xl border border-sky-200 dark:border-sky-900 p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-3 text-sky-700 dark:text-sky-300 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" /> Top Contributors
                </h2>

                <ul className="space-y-4">
                    {topUsers.map((user) => (
                        <li key={user.id} className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800 dark:text-gray-200">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.xp} XP</p>
                            </div>
                            <Button variant="outline" size="sm" className="text-xs">
                                <UserPlus className="w-4 h-4 mr-1" /> <span className='hidden xl:block'>Follow</span>
                            </Button>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
}

export default ForumEngagement;