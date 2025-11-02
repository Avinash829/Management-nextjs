import Image from "next/image";
import TaskCard from "./TaskCard";

interface Task {
    title: string;
    desc?: string;
    priority: string;
    comments: number;
    files: number;
    image?: string;
    members?: string[];
}

interface Props {
    title: string;
    color: string;
    tasks: Task[];
    onTaskSelect: (task: Task) => void;
}

export default function ProgressCol({
    title,
    color,
    tasks,
    onTaskSelect,
}: Props) {
    const count = tasks.length;

    return (
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col w-full sm:w-[300px] md:w-[360px] lg:w-[400px] mt-5 sm:mt-8 md:mt-10 transition-all">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="flex items-center gap-2 flex-wrap">
                    <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: color }}
                    ></span>

                    <h2 className="text-base sm:text-lg text-gray-900 font-medium">
                        {title}
                    </h2>

                    <span className="text-gray-600 text-xs sm:text-sm bg-gray-200 px-2 py-[2px] rounded-full">
                        {count}
                    </span>
                </div>

                {title === "In Pending" && (
                    <button className="hover:bg-gray-200 rounded-lg p-1 transition">
                        <Image
                            src="/add-square.svg"
                            alt="Add Task"
                            width={22}
                            height={22}
                        />
                    </button>
                )}
            </div>

            {/* Top Border */}
            <div
                className="w-full border-t rounded"
                style={{ borderColor: color, borderTopWidth: "3px" }}
            ></div>

            {/* Task List */}
            <div className="flex flex-col gap-4 mt-4 sm:mt-5 overflow-y-auto no-scrollbar max-h-[70vh] sm:max-h-[80vh] md:max-h-[90vh]">
                {tasks.map((task, i) => (
                    <div key={i} onClick={() => onTaskSelect(task)}>
                        <TaskCard {...task} />
                    </div>
                ))}
            </div>
        </div>
    );
}
