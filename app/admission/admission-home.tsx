'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Flame, Trophy } from "lucide-react";
import Link from "next/link";

const AdmissionHomePage = () => {
    const mockPaths = [
        { name: "Medical", path: 'admission/medical', subjects: ["Biology", "Chemistry"] },
        { name: "University", path: 'admission/university', subjects: ["English", "GK"] },
        { name: "Engineering", path: 'admission/engineering', subjects: ["Math", "Physics"] },
    ];

    const mockProgress: Record<string, number> = {
        Biology: 70,
        Chemistry: 40,
        English: 90,
        GK: 60,
    };


    return (
        <>
            <div className="p-4 space-y-6">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Admission Preparation</h1>
        <p className="text-muted-foreground">Practice, improve, and get ready for your dream institution.</p>
      </div>

      {/* XP & Progress Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Today’s XP</p>
              <p className="text-xl font-bold">55</p>
            </div>
            <Flame className="text-orange-500" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Streak</p>
              <p className="text-xl font-bold">4 days</p>
            </div>
            <Clock className="text-blue-500" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rank</p>
              <p className="text-xl font-bold">#13</p>
            </div>
            <Trophy className="text-yellow-500" />
          </CardContent>
        </Card>
      </div>

      {/* Continue Where You Left Off */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Continue Learning</h2>
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Biology - Chapter 3 Quiz</p>
              <p className="text-sm text-muted-foreground">Continue where you left off</p>
            </div>
            <Button variant="primary" size="sm">Resume</Button>
          </CardContent>
        </Card>
      </div>

      {/* Admission Paths */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Admission Paths</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPaths.map((path, index) => (
            <Link href={path.path} key={index}>
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">{path.name}</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {path.subjects.map((subj, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{subj}</span>
                      <Progress value={mockProgress[subj] || 0} className="w-24" />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Mock Test */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Mock Tests</h2>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Medical Biology Full Mock</p>
                <p className="text-sm text-muted-foreground">Earn up to 100 XP</p>
              </div>
              <Button variant="secondary" size="sm">Start</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips & Strategy Articles */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Tips & Strategies</h2>
        <Card>
          <CardContent className="p-4">
            <Link href="#" className="text-blue-600 hover:underline">How to prepare for DU English in 15 days</Link>
          </CardContent>
        </Card>
      </div>
    </div>
        </>
    )
}

export default AdmissionHomePage;