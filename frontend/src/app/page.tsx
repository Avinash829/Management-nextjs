/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import Header from "@/component/Header";
import ProgressCol from "@/component/Dashboard/ProgressCol";
import TeamWorkload from "@/component/RightPanel/TeamWorkload";
import CalendarWidget from "@/component/RightPanel/CalendarWidget";
import WorkflowCanvas from "@/component/workflow/WorkflowCanvas";
import WorkflowActions from "@/component/RightPanel/WorkflowActions";
import CalendarFullView from "@/component/RightPanel/CalendarFullView";
import { ReactFlowProvider } from "@xyflow/react";

interface Task {
    title: string;
    desc?: string;
    priority: string;
    comments: number;
    files: number;
    image?: string;
    members?: string[];
}

export default function Home() {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
    const canvasRef = useRef<any>(null);

    const handleTaskSelect = (task: Task) => {
        setSelectedTask(task);
        setIsCalendarExpanded(false);
    };

    const handleBackToDashboard = () => {
        setSelectedTask(null);
        setIsCalendarExpanded(false);
    };

    return (
        <main className="flex flex-col gap-6 p-4 min-h-screen">
            <Header
                isTaskSelected={!!selectedTask}
                onBack={handleBackToDashboard}
            />

            {selectedTask ? (
                <div className="flex flex-col w-full h-[85vh] p-4">
                    <div className="flex flex-1 gap-6">
                        <div className="flex-1 overflow-hidden">
                            {!isCalendarExpanded ? (
                                <ReactFlowProvider>
                                    <WorkflowCanvas ref={canvasRef} />
                                </ReactFlowProvider>
                            ) : (
                                <CalendarFullView
                                    onClose={() => setIsCalendarExpanded(false)}
                                />
                            )}
                        </div>

                        {!isCalendarExpanded && (
                            <aside className="w-90 flex flex-col gap-6 border border-gray-100 rounded-2xl bg-white p-2">
                                <TeamWorkload selectedTask={selectedTask} />

                                <WorkflowActions
                                    onAddTask={() =>
                                        canvasRef.current?.addTaskNode()
                                    }
                                    onAddNote={() =>
                                        canvasRef.current?.addNoteNode()
                                    }
                                />

                                <CalendarWidget
                                    selectedTask={selectedTask}
                                    onExpandCalendar={() =>
                                        setIsCalendarExpanded(true)
                                    }
                                />
                            </aside>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6 w-full">
                    {/* Main Board */}
                    <div className="flex flex-row flex-wrap sm:flex-nowrap gap-4 overflow-x-auto no-scrollbar w-full pb-4">
                        <ProgressCol
                            title="In Pending"
                            color="#5030E5"
                            tasks={[
                                {
                                    title: "Brainstorming",
                                    desc: "Brainstorming brings team members' diverse experience into play.",
                                    priority: "Low",
                                    comments: 12,
                                    files: 0,
                                    members: ["/puser1.svg", "/puser2.svg"],
                                },
                            ]}
                            onTaskSelect={handleTaskSelect}
                        />

                        <ProgressCol
                            title="On Progress"
                            color="#FFA500"
                            tasks={[
                                {
                                    title: "Onboarding Illustrations",
                                    priority: "Low",
                                    comments: 14,
                                    files: 15,
                                    image: "/progress_pic1.svg",
                                    members: ["/puser2.svg", "/puser3.svg"],
                                },
                                {
                                    title: "Moodboard",
                                    priority: "Low",
                                    comments: 9,
                                    files: 10,
                                    image: "/progress_pic2.svg",
                                    members: ["/puser1.svg", "/puser3.svg"],
                                },
                            ]}
                            onTaskSelect={handleTaskSelect}
                        />

                        <ProgressCol
                            title="Done"
                            color="#8BC48A"
                            tasks={[
                                {
                                    title: "Mobile App Design",
                                    priority: "Completed",
                                    comments: 12,
                                    files: 15,
                                    image: "/done_pic1.svg",
                                    members: ["/puser3.svg"],
                                },
                                {
                                    title: "Design System",
                                    desc: "It just needs to adapt the UI from what you did before.",
                                    priority: "Completed",
                                    comments: 12,
                                    files: 15,
                                    members: ["/puser1.svg", "/puser2.svg"],
                                },
                            ]}
                            onTaskSelect={handleTaskSelect}
                        />
                    </div>

                    <aside className="w-full sm:w-[90%] md:w-[80%] lg:w-80 flex flex-col gap-6 lg:mr-10 mx-auto">
                        <TeamWorkload selectedTask={selectedTask} />
                        <CalendarWidget selectedTask={null} />
                    </aside>
                </div>
            )}
        </main>
    );
}
