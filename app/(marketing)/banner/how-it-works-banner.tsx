'use client';

import { FaBrain, FaChartLine } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";

export const HowItWorksBanner = () => {
    return (
        <>
            <section className="w-full bg-indigo-50 py-12">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-sky-800 mb-10">
                        EzDu কীভাবে কাজ করে?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-indigo-100">
                            <div className="text-4xl mb-4 flex justify-center">
                                <span><LuNotebookPen className="text-4xl text-sky-500"/></span>
                            </div>
                            <h3 className="text-xl font-semibold text-sky-700 mb-2">
                                ১. তোমার শেখার পথ বেছে নাও
                            </h3>
                            <ul className="list-disc list-inside space-y-4 text-slate-600 text-sm">
                                <li>তোমার ক্লাস বা জব প্রিপারেশন ট্র্যাক নির্বাচন করো</li>
                                <li>বোর্ড, বিষয়, কিংবা পরীক্ষা ঠিক করে নাও</li>
                                <li>কি শিখবে, কোথা থেকে শুরু করবে - সবকিছু নিজের মতো করে ঠিক করো</li>
                            </ul>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-sky-100">
                            <div className="text-4xl mb-4 flex justify-center">
                                <span><FaBrain className="text-4xl text-red-500"/></span>
                            </div>
                            <h3 className="text-xl font-semibold text-sky-700 mb-2">
                                ২. শেখো কুইজ ও লেসনের মাধ্যমে
                            </h3>
                            <ul className="list-disc list-inside space-y-4 text-slate-600 text-sm">
                                <li>প্রতিটি টপিকে ছোট ছোট লেসন ও কুইজ থাকবে</li>
                                <li>সঠিক উত্তর দিলে পাবে XP, স্ট্রীক ও ব্যাজ</li>
                                <li>প্রতিটি প্রশ্নের ব্যাখ্যা থাকবে যাতে ভুল করলেও শেখা যায়</li>
                            </ul>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-sky-100">
                            <div className="text-4xl mb-4 flex justify-center">
                                <span><FaChartLine className="text-4xl text-lime-500"/></span>
                            </div>
                            <h3 className="text-xl font-semibold text-sky-700 mb-2">
                                ৩. অগ্রগতি ট্র্যাক করো 
                            </h3>
                            <ul className="list-disc list-inside space-y-4 text-slate-600 text-sm">
                                <li>প্রতিদিনের শেখা, মোট XP ও স্ট্রীক ট্র্যাক করা হয়</li>
                                <li>তোমার প্রগ্রেস গ্রাফ আকারে দেখতে পারবে</li>
                                <li>বন্ধুদের সাথে প্রতিযোগিতা করে শেখা আরও মজার করে তোলো</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>



        </>
    )
}