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
    const [weekIndex, setWeekIndex] = useState(0); // track which week in month we are on

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
        <div className="flex flex-col p-2 h-full">
            <div className="flex justify-between items-center w-[70vw]">
                <h2 className="text-[32px] leading-tight text-[#120e24]">
                    <span className="font-semibold">
                        {currentDate.format("MMMM")}
                    </span>{" "}
                    <span className="font-normal text-[#0D062D]/80">
                        {currentDate.format("YYYY")}
                    </span>
                </h2>

                <div className="flex items-center bg-gray-100 border border-white rounded-full px-2 py-1 text-black">
                    {["Day", "Week", "Month"].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => {
                                setViewMode(mode.toLowerCase() as any);
                                setWeekIndex(0);
                            }}
                            className={`px-5 py-1 rounded-full text-sm font-medium transition ${
                                viewMode === mode.toLowerCase()
                                    ? "bg-[#FFFFFF] "
                                    : " "
                            }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 p-1">
                        <button
                            onClick={handlePrev}
                            className={`p-2 rounded-full ${
                                (viewMode === "week" && weekIndex === 0) ||
                                (viewMode === "month" && false)
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            <img
                                src="/left_a.svg"
                                alt="Prev"
                                className="w-5 h-5"
                            />
                        </button>
                        <button
                            onClick={handleNext}
                            className={`p-2 rounded-full ${
                                (viewMode === "week" &&
                                    weekIndex === totalWeeks - 1) ||
                                (viewMode === "month" && false)
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            <img
                                src="/right_a.svg"
                                alt="Next"
                                className="w-5 h-5"
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 mt-4">
                <div className="flex-1 bg-white rounded-[37px] p-6 border border-gray-100 shadow-sm w-[1065px]">
                    {viewMode === "month" && (
                        <>
                            <div className="grid grid-cols-7 gap-4 text-center text-sm font-semibold mb-3">
                                {[
                                    "Sun",
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thu",
                                    "Fri",
                                    "Sat",
                                ].map((d) => (
                                    <div key={d} className="py-2 text-gray-700">
                                        {d}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-4">
                                {daysArray.map((day, i) => {
                                    if (!day)
                                        return <div key={i} className="h-24" />;
                                    return (
                                        <div
                                            key={i}
                                            className="h-24 flex items-start justify-end p-2 rounded-lg hover:bg-gray-50 transition"
                                        >
                                            <div className="text-sm text-gray-700">
                                                {day}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {viewMode === "week" && (
                        <div className="grid grid-cols-3 gap-x-3 gap-y-2 justify-between">
                            {weekDays.map((day, i) =>
                                day ? (
                                    <div
                                        key={i}
                                        className="h-[360px] w-[310px] bg-white border border-gray-100 shadow-sm rounded-[28px] p-4 flex flex-col"
                                    >
                                        <div className="text-lg font-medium text-gray-800 mb-2">
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
                        <div className="flex justify-center h-[1065px]">
                            <div className="text-xl font-semibold text-gray-800 mb-6">
                                {currentDate.format("dddd, MMMM D, YYYY")}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-6">
                    <aside className="w-[354px] h-[296px] bg-white rounded-[37px] p-6 border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-medium mb-6">
                            Task Labels
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-[10px] bg-[#648EF1] flex items-center justify-center">
                                <img
                                    src="/label_blue.svg"
                                    alt="Design"
                                    className="w-5 h-5"
                                />
                            </div>

                            <div className="w-10 h-10 rounded-[10px] bg-[#83FFA2] flex items-center justify-center">
                                <img
                                    src="/label_blue.svg"
                                    alt="Development"
                                    className="w-5 h-5"
                                />
                            </div>

                            <div className="w-10 h-10 rounded-[10px] bg-[#FF8989] flex items-center justify-center">
                                <img
                                    src="/car_pink.svg"
                                    alt="Testing"
                                    className="w-5 h-5"
                                />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
