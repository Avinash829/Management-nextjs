"use client";

import Image from "next/image";

interface WorkflowActionsProps {
    onAddTask: () => void;
    onAddNote: () => void;
}

export default function WorkflowActions({
    onAddTask,
    onAddNote,
}: WorkflowActionsProps) {
    return (
        <div className="flex flex-col items-start gap-8 w-full pl-6">
            <div className="flex flex-row items-start justify-start gap-8">
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[16px] text-[#0D062D] font-medium">
                        Add note
                    </span>
                    <button
                        onClick={onAddNote}
                        className="w-[63px] h-[62px] rounded-2xl bg-[#F8F8F8] flex items-center justify-center hover:scale-105 transition-transform duration-200 pl-2"
                    >
                        <Image
                            src="/add_note.svg"
                            alt="Add Note"
                            width={40}
                            height={40}
                        />
                    </button>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <span className="text-[16px] text-[#0D062D] font-medium">
                        Add tasks
                    </span>
                    <button
                        onClick={onAddTask}
                        className="w-[63px] h-[62px] rounded-2xl bg-[#F8F8F8] flex items-center justify-center hover:scale-105 transition-transform duration-200"
                    >
                        <Image
                            src="/add_task.svg"
                            alt="Add Task"
                            width={40}
                            height={40}
                        />
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-start mt-2">
                <span className="text-[16px] text-[#0D062D] font-medium">
                    Add deadline
                </span>
            </div>
        </div>
    );
}
