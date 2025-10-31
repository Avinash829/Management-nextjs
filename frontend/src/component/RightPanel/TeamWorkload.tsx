/* eslint-disable @next/next/no-img-element */

interface Task {
    title: string;
    desc?: string;
    priority: string;
    comments: number;
    files: number;
    image?: string;
}

interface Props {
    selectedTask: Task | null;
}

export default function TeamWorkload({ selectedTask }: Props) {
    const members = [
        {
            name: "Autumn Phillips",
            email: "amakarapova@mail.com",
            avatar: "/puser1.svg",
        },
        {
            name: "Emily Stone",
            email: "estone@mail.com",
            avatar: "/puser2.svg",
        },
        {
            name: "Daniel Craig",
            email: "dcraig@mail.com",
            avatar: "/puser3.svg",
        },
        {
            name: "Riya Patel",
            email: "riya@mail.com",
            avatar: "/puser1.svg",
        },
    ];

    const teammatesForTask = members.slice(0, 4);
    const isTaskMode = !!selectedTask;

    return (
        <div
            className={`p-5 w-[360px] ${
                isTaskMode
                    ? "bg-transparent mr-2"
                    : "bg-white border border-gray-100 shadow-sm transition-all duration-200 rounded-2xl"
            }`}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-[18px] font-semibold text-[#0D062D]">
                    {isTaskMode ? "Team members" : "Team workload"}
                </h3>
                <button className="text-[#3D76F5] text-[14px] font-medium border border-transparent rounded-sm px-2 py-0.5 transition-all duration-200 hover:bg-[#EAF1FF]">
                    + Add
                </button>
            </div>

            {isTaskMode ? (
                <div className="border border-gray-100 bg-gray-100 rounded-xl flex flex-row flex-wrap items-start justify-start gap-4 mt-2 px-4 py-4 min-h-[200px]">
                    {teammatesForTask.map((m, i) => (
                        <img
                            key={i}
                            src={m.avatar}
                            alt={m.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    ))}
                </div>
            ) : (
                <ul className="divide-y divide-gray-100">
                    {members.map((m, i) => (
                        <li key={i} className="flex items-center gap-3 py-3">
                            <img
                                src={m.avatar}
                                alt={m.name}
                                className="w-9 h-9 rounded-full object-cover"
                            />
                            <div className="flex flex-col">
                                <p className="text-[15px] font-medium text-[#0D062D] leading-tight">
                                    {m.name}
                                </p>
                                <p className="text-[13px] text-[#787486] leading-tight">
                                    {m.email}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
