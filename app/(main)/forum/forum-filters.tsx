import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/sidebar";
import Image from "next/image";

type Props = {
    onFilterChange: (filters: {
        categories: string[];
        status: string;
        searchTerm: string;
    }) => void;
    isMobileOpen: boolean;
    onClose: () => void;
};

const categories = ["Math", "Science", "English", "Job Prep", "Programming"];

const ForumFilter: React.FC<Props> = ({onFilterChange, isMobileOpen, onClose}) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [status, setStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const drawerRef = useRef<HTMLDivElement | null>(null);

    const toggleCategory = (cat: string) => {
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setStatus("all");
        setSearchTerm("");
        onFilterChange({categories: [], status: "all", searchTerm: ""});
    };

    useEffect(() => {
        onFilterChange({categories: selectedCategories, status, searchTerm});
    }, [selectedCategories, status, searchTerm]);

    // ✅ Detect outside click
    useEffect(() => {
        if (!isMobileOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobileOpen, onClose]);

    const filterContent = (
        <div className="space-y-6 px-4 ">

            <div className='pt-4 flex items-center gap-x-3'>
                <h1 className='text-xl font-extrabold text-sky-400 tracking-wide'>
                    Filter
                </h1>

            </div>


            {/* Search */}
            {/*<div className='mt-4'>*/}
            {/*    <input*/}
            {/*        type="search"*/}
            {/*        placeholder="Search questions..."*/}
            {/*        value={searchTerm}*/}
            {/*        onChange={(e) => setSearchTerm(e.target.value)}*/}
            {/*        className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"*/}
            {/*    />*/}
            {/*</div>*/}

            {/* Categories */}
            <div>
                <h3 className="font-medium mb-2">Subjects</h3>
                <ul className="space-y-2 max-h-48 overflow-auto">
                    {categories.map((cat) => (
                        <li key={cat}>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => toggleCategory(cat)}
                                    className="form-checkbox text-sky-600"
                                />
                                <span className="ml-2 dark:text-gray-100 hover:text-sky-600">{cat}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Status */}
            <div>
                <h3 className="font-medium mb-2">Status</h3>
                {["all", "unanswered", "answered"].map((val) => (
                    <label key={val} className="inline-flex items-center mr-4 cursor-pointer">
                        <input
                            type="radio"
                            name="status"
                            value={val}
                            checked={status === val}
                            onChange={() => setStatus(val)}
                            className="form-radio text-sky-600"
                        />
                        <span className="ml-2 text-gray-700 capitalize hover:text-sky-600">
              {val}
            </span>
                    </label>
                ))}
            </div>

            {/* Clear Filters */}
            <button
                onClick={clearFilters}
                className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md font-semibold transition"
            >
                Clear Filters
            </button>
        </div>
    );

    return (
        <>
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block col-span-1">
                <aside className="h-full sticky top-4 shadow-sm">
                    {filterContent}
                </aside>
            </div>

            {/* Mobile Drawer Filter */}
            {isMobileOpen && (

                <div className='lg:hidden px-6 h-[50px] flex items-center bg-sky-200 border-b fixed top-0 w-full z-50'>
                    <Sheet open={isMobileOpen} onOpenChange={onClose}>
                        <SheetContent  className='z-[100]' side='left'>
                            <SheetTitle></SheetTitle>
                            {filterContent}
                        </SheetContent>
                    </Sheet>
                </div>
            )}

        </>
    );
};

export default ForumFilter;
