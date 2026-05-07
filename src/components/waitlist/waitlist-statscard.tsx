"use client";

type TimeRange = "24h" | "7d";

interface WaitlistStatCardProps {
    title: string;
    description: string;
    stats: {
        "24h": number;
        "7d": number;
    };
    range: TimeRange;
    color?: "blue" | "green" | "purple";
}

export const WaitlistStatCard = ({
    title,
    description,
    stats,
    range,
    color = "blue",
}: WaitlistStatCardProps) => {
    const data = [
        { label: "24h", value: stats["24h"] ?? 0 },
        { label: "7d", value: stats["7d"] ?? 0 },
    ];

    const selected = data.find((item) => item.label === range);

    const colorStyles = {
        blue: "border-blue-200 bg-blue-100",
        green: "border-green-200 bg-green-100",
        purple: "border-purple-200 bg-purple-100",
    };

    return (
        <div className="p-5 rounded-xl bg-white  shadow-sm h-full">
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <p className="text-sm text-slate-400 font-medium mb-4">
                {description}
            </p>
            <p className="text-3xl font-black text-slate-900 mb-4">
                {selected?.value.toLocaleString() ?? "0"}
            </p>
            <div className="grid grid-cols-2 gap-2">
                {data.map((item) => (
                    <div
                        key={item.label}
                        className={`rounded-xl border px-2 py-2 text-center ${item.label === range
                            ? colorStyles[color]
                            : "border-slate-200 bg-slate-50"
                            }`}
                    >
                        <p className="text-[11px] font-semibold text-slate-500">
                            {item.label}
                        </p>
                        <p className="text-sm font-bold text-slate-800">
                            {item.value.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};