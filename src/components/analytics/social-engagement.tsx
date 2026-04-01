"use client";
import { AnalyticsData } from "@/types/analytics.type";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export const SocialEngagementCard = ({ analytics }: { analytics: AnalyticsData }) => {
    const data = [
        { name: "Likes", value: analytics.engagement.likes ?? 0, color: "#3b82f6" },
        { name: "Comments", value: analytics.engagement.comments ?? 0, color: "#8b5cf6" },
        { name: "Shares", value: analytics.engagement.reposts ?? 0, color: "#10b981" },
        { name: "Stories", value: analytics.stories.total ?? 0, color: "#f59e0b" },
        { name: "Mentions", value: analytics.contactMessages.total, color: "#ec4899" },
    ];

    const totalEngagement = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
            <h3 className="font-bold text-slate-800 text-lg">Social Impact</h3>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">
                {analytics.social.follows.toLocaleString()} New Followers
            </p>

            <div className="h-56 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Pie
                            data={data}
                            innerRadius={75}
                            outerRadius={100}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-black text-slate-800 leading-none">
                        {totalEngagement >= 1000
                            ? `${(totalEngagement / 1000).toFixed(1)}k`
                            : totalEngagement}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">Interactions</span>
                </div>
            </div>
            <div className="mt-8 space-y-1">
                {data.map((item) => (
                    <div
                        key={item.name}
                        className="flex justify-between items-center p-2.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-2.5 h-2.5 rounded-full shadow-sm"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm font-semibold text-slate-600">{item.name}</span>
                        </div>
                        <span className="font-bold text-slate-800 text-sm">
                            {item.value.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};