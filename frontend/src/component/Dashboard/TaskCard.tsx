/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

interface TaskProps {
    title: string;
    desc?: string;
    priority: string;
    comments: number;
    files: number;
    image?: string;
    members?: string[];
}

export default function TaskCard({
    title,
    desc,
    priority,
    comments,
    files,
    image,
    members = ["/puser1.svg", "/puser2.svg", "/puser3.svg"],
}: TaskProps) {
    return (
        <div className="p-5 bg-white hover:border border-gray-100 rounded-2xl w-full cursor-pointer mb-1">
            <div className="flex justify-between items-start">
                <span
                    className={`px-2 py-0.5 text-[13px] font-medium rounded-sm ${
                        priority === "Low"
                            ? "bg-[#FEEFD8] text-[#D58D49]"
                            : priority === "High"
                            ? "bg-[#FEE4E2] text-[#D92D20]"
                            : "bg-[#83C29D33] text-[#68B266]"
                    }`}
                >
                    {priority}
                </span>

                <button className="p-1 rounded-full hover:bg-gray-100">
                    <img src="/p_menu.svg" alt="menu" className="w-5 h-5" />
                </button>
            </div>

            <h3 className="mt-3 text-[18px] font-semibold text-[#0D062D] leading-snug">
                {title}
            </h3>

            {desc ? (
                <p className="text-[14px] text-[#787486] mt-1.5 leading-relaxed">
                    {desc}
                </p>
            ) : image ? (
                <div className="mt-3 rounded-lg overflow-hidden border border-gray-100">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-[100px] object-cover rounded-lg"
                    />
                </div>
            ) : null}

            <div className="flex items-center justify-between mt-5">
                <div className="flex items-center">
                    {members
                        .slice()
                        .reverse()
                        .map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`member-${idx}`}
                                className="w-6 h-6 rounded-full border-white -ml-2 first:ml-0 relative"
                                style={{ zIndex: members.length - idx }}
                            />
                        ))}
                </div>

                <div className="flex items-center gap-4 text-[#787486] text-[13px]">
                    <div className="flex items-center gap-1.5">
                        <img
                            src="/comments.svg"
                            alt="comments"
                            className="w-4 h-4"
                        />
                        <span>{comments} comments</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <img
                            src="/file_icon.svg"
                            alt="files"
                            className="w-4 h-4"
                        />
                        <span>{files} files</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
