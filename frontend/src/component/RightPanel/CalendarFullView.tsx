/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import dayjs from "dayjs";

interface Props {
    monthIndex?: number;
    onClose: () => void;
}

export default function CalendarFullView({ monthIndex, onClose }: Props) {
    const [viewMode, setViewMode] = useState<"day" | "week" | "month">("month");
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [weekIndex, setWeekIndex] = useState(0);

    const currentMonth = currentDate.startOf("month");
    const daysInMonth = currentMonth.daysInMonth();
    const firstDay = currentMonth.day();

    const daysArray = [
        ...Array.from({ length: firstDay }, () => null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    const weeks: (number | null)[][] = [];
    for (let i = 0; i < daysArray.length; i += 7) {
        weeks.push(daysArray.slice(i, i + 7));
    }

    const totalWeeks = weeks.length;
    const handlePrev = () => {
        if (viewMode === "month") {
            setCurrentDate(currentDate.subtract(1, "month"));
            setWeekIndex(0);
        } else if (viewMode === "week" && weekIndex > 0) {
            setWeekIndex((prev) => prev - 1);
        } else if (viewMode === "day") {
            setCurrentDate(currentDate.subtract(1, "day"));
        }
    };

    const handleNext = () => {
        if (viewMode === "month") {
            setCurrentDate(currentDate.add(1, "month"));
            setWeekIndex(0);
        } else if (viewMode === "week" && weekIndex < totalWeeks - 1) {
            setWeekIndex((prev) => prev + 1);
        } else if (viewMode === "day") {
            setCurrentDate(currentDate.add(1, "day"));
        }
    };

    const weekDays = weeks[weekIndex] || [];

    return (
        <div className="flex flex-col p-2 h-full w-full">
            <div className="flex flex-wrap justify-between items-center w-3/4 gap-3 sm:gap-4 md:gap-6">
                <h2 className="text-xl sm:text-2xl md:text-[32px] leading-tight text-[#120e24]">
                    <span className="font-semibold">
                        {currentDate.format("MMMM")}
                    </span>{" "}
                    <span className="font-normal text-[#0D062D]/80">
                        {currentDate.format("YYYY")}
                    </span>
                </h2>

                <div className="flex items-center bg-gray-100 border border-white rounded-full px-1 sm:px-2 py-1 text-black">
                    {["Day", "Week", "Month"].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => {
                                setViewMode(mode.toLowerCase() as any);
                                setWeekIndex(0);
                            }}
                            className={`px-3 sm:px-5 py-1 rounded-full text-xs sm:text-sm font-medium transition ${
                                viewMode === mode.toLowerCase()
                                    ? "bg-white shadow-sm"
                                    : ""
                            }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={handlePrev}
                        className={`p-1 sm:p-2 rounded-full ${
                            viewMode === "week" && weekIndex === 0
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        <img
                            src="/left_a.svg"
                            alt="Prev"
                            className="w-4 h-4 sm:w-5 sm:h-5"
                        />
                    </button>
                    <button
                        onClick={handleNext}
                        className={`p-1 sm:p-2 rounded-full ${
                            viewMode === "week" && weekIndex === totalWeeks - 1
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        <img
                            src="/right_a.svg"
                            alt="Next"
                            className="w-4 h-4 sm:w-5 sm:h-5"
                        />
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mt-4 w-full">
                <div className="flex-1 bg-white rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm w-full">
                    {viewMode === "month" && (
                        <>
                            <div className="grid grid-cols-7 gap-2 sm:gap-4 text-center text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                                {[
                                    "Sun",
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thu",
                                    "Fri",
                                    "Sat",
                                ].map((d) => (
                                    <div
                                        key={d}
                                        className="py-1 sm:py-2 text-gray-700"
                                    >
                                        {d}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-2 sm:gap-4">
                                {daysArray.map((day, i) =>
                                    !day ? (
                                        <div
                                            key={i}
                                            className="h-12 sm:h-20 md:h-24"
                                        />
                                    ) : (
                                        <div
                                            key={i}
                                            className="h-12 sm:h-20 md:h-24 flex items-start justify-end p-1 sm:p-2 rounded-lg hover:bg-gray-50 transition"
                                        >
                                            <div className="text-xs sm:text-sm text-gray-700">
                                                {day}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </>
                    )}

                    {viewMode === "week" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {weekDays.map((day, i) =>
                                day ? (
                                    <div
                                        key={i}
                                        className="h-[260px] sm:h-[320px] bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col"
                                    >
                                        <div className="text-base sm:text-lg font-medium text-gray-800 mb-2">
                                            {day}
                                        </div>
                                    </div>
                                ) : (
                                    <div key={i} />
                                )
                            )}
                        </div>
                    )}

                    {viewMode === "day" && (
                        <div className="flex flex-col items-center justify-center h-[300px] sm:h-[500px] md:h-[700px]">
                            <div className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
                                {currentDate.format("dddd, MMMM D, YYYY")}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-4 sm:gap-6 w-full lg:w-[354px]">
                    <aside className="w-full bg-white rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm h-1/3">
                        <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">
                            Task Labels
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#648EF1] flex items-center justify-center">
                                <img
                                    src="/label_blue.svg"
                                    alt="Design"
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                />
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#83FFA2] flex items-center justify-center">
                                <img
                                    src="/label_blue.svg"
                                    alt="Development"
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                />
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#FF8989] flex items-center justify-center">
                                <img
                                    src="/car_pink.svg"
                                    alt="Testing"
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
