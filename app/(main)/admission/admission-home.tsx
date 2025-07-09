'use client';

import { LeaderboardSummary } from "@/components/layout/leaderboard/leaderboard-summary";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSecure } from "@/context/SecureContext";
import { Clock, Flame, Trophy } from "lucide-react";
import Link from "next/link";

const AdmissionHomePage = () => {
  const { isLoggedIn } = useSecure();

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
      <div className="space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Admission Preparation</h1>
          <p className="text-muted-foreground">Practice, improve, and get ready for your dream institution.</p>
        </div>


        {
          isLoggedIn && (

            <>

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
            </>


          )
        }



        {/* Admission Paths */}
        <div className="space-y-2">
          <div>
            <h2 className="text-lg font-semibold">Admission Paths</h2>
            <p className="text-sm text-muted-foreground">Explore your interes</p>
          </div>
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

        <div>

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






        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-4 space-y-6">

            <div className="space-y-4 mt-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  ভর্তি পরীক্ষায় সফলতার জন্য কেন এই প্ল্যাটফর্ম?
                </h1>
              </div>

              <div>
                <Card>
                  <CardTitle>

                  </CardTitle>
                  <CardContent>
                    <Accordion
                      type="single"
                      className="w-full"
                      defaultValue={"0"}

                    >
                      <AccordionItem value={"0"}>
                        <AccordionTrigger>ভর্তি পরীক্ষার জন্য প্রমাণ-ভিত্তিক প্রস্তুতি</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc ps-5 space-y-2 text-sm text-muted-foreground">
                            <li>
                              EzDu তে ভর্তি পরীক্ষার প্রস্তুতি কেবল বইয়ের গাইড নয়—এটি একটি সম্পূর্ণ গাইডলাইন সিস্টেম।
                            </li>
                            <li>
                              মেডিকেল, ইঞ্জিনিয়ারিং এবং বিশ্ববিদ্যালয়ের প্রতিটি ইউনিট অনুযায়ী সাজানো হয়েছে অধ্যায়ভিত্তিক পাঠ।
                            </li>
                            <li>
                              বিষয়ভিত্তিক MCQ, অধ্যায়ের প্রশ্ন এবং বোর্ড-প্রশ্ন বিশ্লেষণ অন্তর্ভুক্ত।
                            </li>
                            <li>
                              আপনি যা পড়ছেন, তা সরাসরি পরীক্ষার কাঠামোর সঙ্গে সামঞ্জস্যপূর্ণ।
                            </li>
                          </ul>
                        </AccordionContent>

                      </AccordionItem>
                      <AccordionItem value={"1"}>
                        <AccordionTrigger>ধারাবাহিক মূল্যায়ন ও অগ্রগতি বিশ্লেষণ</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc ps-5 space-y-1 text-sm text-muted-foreground">
                            <li>
                              প্রতিটি অধ্যায়ের শেষে কুইজ ও মূল্যায়নের মাধ্যমে শিখনফল যাচাই করা যায়।
                            </li>
                            <li>
                              আপনি কতোটা শিখেছেন, কোন বিষয়ে দুর্বল—তা স্পষ্টভাবে দেখতে পারবেন।
                            </li>
                            <li>
                              আপনি কেবল পড়বেন না, বরং বুঝে, পরিমাপ করে ধাপে ধাপে এগোবেন।
                            </li>
                          </ul>

                        </AccordionContent>

                      </AccordionItem>
                      <AccordionItem value={"2"}>
                        <AccordionTrigger>অভ্যাস গড়ার মাধ্যমে ফলাফল নিশ্চিত</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc ps-5 space-y-1 text-sm text-muted-foreground">
                            <li>
                              ভর্তি পরীক্ষায় সফলতা শুধু পড়ার পরিমাণে নয়, বরং নিয়মিততার ওপর নির্ভর করে।
                            </li>
                            <li>
                              EzDu প্রতিদিনের স্টাডি ট্র‍্যাকিং ও স্ট্রিক ধরে রাখার মাধ্যমে শেখার অভ্যাস তৈরি করে।
                            </li>
                            <li>
                              গেমিফিকেশনের মাধ্যমে শেখাকে আকর্ষণীয় ও ধারাবাহিক করে তোলে।
                            </li>
                            <li>
                              এটি প্রতিদিনের শিক্ষাকে একটি ফলপ্রসূ অভ্যাসে রূপান্তর করে।
                            </li>
                          </ul>

                        </AccordionContent>

                      </AccordionItem>

                    </Accordion>

                  </CardContent>
                </Card>
              </div>


            </div>

          </div>



          <div className="lg:col-span-2 space-y-6">
            <div>
              <LeaderboardSummary/>
            </div>

          </div>
        </div>





      </div>
    </>
  )
}

export default AdmissionHomePage;