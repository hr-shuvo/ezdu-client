'use client';

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const demoSuggestions = [
    "Biology Chapter 1",
    "MCQ Practice",
    "Chemistry Basics",
    "English Grammar",
    "Bangla 1st Paper",
];

export const NavSearchBox = () => {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(demoSuggestions);
    const [showDropdown, setShowDropdown] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Search submitted:", query);
        setShowDropdown(false);
    };

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (!query.trim()) {
                setFilteredSuggestions(demoSuggestions);
            } else {
                const lower = query.toLowerCase();
                const filtered = demoSuggestions.filter((item) =>
                    item.toLowerCase().includes(lower)
                );
                setFilteredSuggestions(filtered);
            }
            if (isFocused) {
                setShowDropdown(true);
            }
        }, 2000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [query]);

    return (
        <div className="relative w-full max-w-full">
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    type="text"
                    placeholder="Search lessons, topics, MCQs..."
                    className="pl-9 rounded-full "
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        setIsFocused(true)
                        setFilteredSuggestions(demoSuggestions);
                        setShowDropdown(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false)
                        setTimeout(() => setShowDropdown(false), 100);
                    }}
                />
            </form>


            {showDropdown && filteredSuggestions.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-60 overflow-y-auto">
                    {filteredSuggestions.map((item, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                            onMouseDown={() => {
                                setQuery(item);
                                setShowDropdown(false);
                                console.log("Selected:", item);
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <Search className="h-4 w-4 text-muted-foreground" />
                                <span>{item}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
