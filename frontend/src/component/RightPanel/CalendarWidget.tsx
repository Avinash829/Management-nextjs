/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import dayjs from "dayjs";
import Image from "next/image";

interface Task {
    id: string;
    title: string;
    deadline?: string;
}

interface CalendarWidgetProps {
    selectedTask: { title: string } | null;
    onExpandCalendar?: () => void;
}

export default function CalendarWidget({
    selectedTask,
    onExpandCalendar,
}: CalendarWidgetProps) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [showInfo, setShowInfo] = useState(false);

    const currentYear = dayjs().year();
    const isTaskMode = !!selectedTask;

    const prevMonth = () => setMonthIndex((m) => (m === 0 ? 11 : m - 1));
    const nextMonth = () => setMonthIndex((m) => (m === 11 ? 0 : m + 1));

    const currentMonth = dayjs().month(monthIndex).startOf("month");
    const daysInMonth = currentMonth.daysInMonth();
    const firstDay = currentMonth.day();

    const monthName = dayjs().month(monthIndex).format("MMMM");
    const prevMonthName = dayjs()
        .month((monthIndex + 11) % 12)
        .format("MMM");
    const nextMonthName = dayjs()
        .month((monthIndex + 1) % 12)
        .format("MMM");

    const startDate = 7;
    const meetings = [17, 18];
    const deadline = 28;

    const daysArray = [
        ...Array.from({ length: firstDay }, () => null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    return (
        <div
            onDoubleClick={() => onExpandCalendar?.()}
            className={`transition-all duration-200 rounded-2xl select-none relative bg-gray-100 border border-gray-100 shadow-sm p-5
                ${isTaskMode ? "ml-5 w-[300px]" : " w-[360px]"}`}
            title="Double click to open expanded calendar"
        >
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center justify-center flex-1 gap-2">
                    <button
                        onClick={prevMonth}
                        className="p-2 px-3 rounded-full bg-white border border-gray-100 hover:bg-gray-50 transition"
                    >
                        <Image
                            src="/left_a.svg"
                            alt="Previous Month"
                            width={7}
                            height={7}
                        />
                    </button>

                    <div className="flex items-center justify-center w-[160px]">
                        <span className="text-xs text-gray-400 mr-2">
                            {prevMonthName}
                        </span>
                        <span className="text-sm text-[#000000] font-medium">
                            {monthName}
                        </span>
                        <span className="text-xs text-gray-400 ml-2">
                            {nextMonthName}
                        </span>
                    </div>

                    <button
                        onClick={nextMonth}
                        className="p-2 px-3 rounded-full bg-white border border-gray-100 hover:bg-gray-50 transition"
                    >
                        <Image
                            src="/right_a.svg"
                            alt="Next Month"
                            width={7}
                            height={7}
                        />
                    </button>
                </div>

                <div className="relative ml-3">
                    <button
                        onClick={() => setShowInfo(!showInfo)}
                        className="p-2 hover:bg-gray-200 rounded-full transition"
                    >
                        <Info size={18} className="text-gray-600" />
                    </button>

                    <AnimatePresence>
                        {showInfo && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 top-8 bg-white border border-gray-100 shadow-md rounded-xl p-3 w-52 z-10"
                            >
                                <p className="text-[14px] font-medium text-[#0D062D] mb-2">
                                    Color Legend
                                </p>
                                <div className="flex flex-col gap-2 text-[13px] text-[#787486]">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FFA63E] to-[#FF7A00]" />
                                        <span>Project Start</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-md bg-[#3D76F5]" />
                                        <span>Meeting Days</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#9C27F0] to-[#3D76F5]" />
                                        <span>Deadline</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="grid grid-cols-7 text-center text-[12px] font-semibold mb-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <span key={`${d}-${i}`}>{d}</span>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-[2px] text-center text-[15px] text-[#0D062D] mt-1">
                {daysArray.map((day, i) => {
                    if (!day) return <div key={i} className="h-10" />;

                    let className =
                        "flex items-center justify-center w-10 h-10 transition-all duration-200 ";

                    if (day === startDate) {
                        className +=
                            "bg-gradient-to-r from-[#FFA63E] to-[#FF7A00] text-white rounded-full";
                    } else if (meetings.includes(day)) {
                        if (day === 17) {
                            className += "bg-[#397FFE] text-white rounded-l-lg";
                        } else if (day === 18) {
                            className +=
                                "bg-[#397FFE] text-white rounded-r-lg -ml-[8px]";
                        } else {
                            className += "bg-[#3D76F5] text-white rounded-md";
                        }
                    } else if (day === deadline) {
                        className +=
                            "bg-gradient-to-r from-[#9C27F0] to-[#3D76F5] text-white rounded-full";
                    } else {
                        className += "hover:bg-gray-200 rounded-md";
                    }

                    return (
                        <div key={i} className={className}>
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
