"use client";

import Image from "next/image";

interface HeaderProps {
    isTaskSelected: boolean;
    onBack: () => void;
}

export default function Header({ isTaskSelected, onBack }: HeaderProps) {
    return (
        <header className="w-full h-[84px] bg-white rounded-full shadow-sm flex items-center justify-between px-6 mt-3">
            <div className="flex items-center text-gray-500 text-sm font-medium ml-4">
                {isTaskSelected ? (
                    <>
                        <button
                            onClick={onBack}
                            className="mr-3 text-gray-400 hover:text-gray-600"
                        >
                            ←
                        </button>
                        <span className="text-gray-700">
                            Project management
                        </span>
                    </>
                ) : (
                    <>
                        <span className="text-gray-700">
                            Project management
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4 mx-2 text-gray-400"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                        <span className="text-gray-400">Dashboard</span>
                    </>
                )}
            </div>

            <div className="flex items-center gap-3 mr-4">
                <Image
                    src="/user1.svg"
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-50"
                />
            </div>
        </header>
    );
}
