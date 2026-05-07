"use client";

import { useWaitlistStats } from "@/hooks/useWaitlist";
import { useState } from "react";
import { WaitlistStatCard } from "./waitlist-statscard";
import WaitlistStatsSkeleton from "./waitlist-skeleton";

type TimeRange = "24h" | "7d";

export const WaitlistStatsSection = () => {
    const [range, setRange] = useState<TimeRange>("7d");
    const { data, isLoading } = useWaitlistStats();
    const stats = data?.entity;
    if (isLoading) return <WaitlistStatsSkeleton />;

    return (
        <div className="space-y-4 mb-6">
            <div className="flex items-end justify-between gap-3">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Waitlist Overview
                    </h2>
                    <p className="text-sm text-slate-500">
                        Monitor recent waitlist activity and user distribution
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-slate-500">
                        Range
                    </label>
                    <select
                        value={range}
                        onChange={(e) => setRange(e.target.value as TimeRange)}
                        className="h-9 rounded-lg border bg-white px-3 text-sm"
                    >
                        <option value="24h">24h</option>
                        <option value="7d">7d</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <WaitlistStatCard
                    title="Total Users"
                    description="New waitlist users"
                    stats={stats?.user ?? { "24h": 0, "7d": 0 }}
                    range={range}
                    color="blue"
                />
                <WaitlistStatCard
                    title="Vendors"
                    description="Vendors joined waitlist"
                    stats={stats?.vendors ?? { "24h": 0, "7d": 0 }}
                    range={range}
                    color="purple"
                />

                <WaitlistStatCard
                    title="Buyers"
                    description="Buyers joined waitlist"
                    stats={stats?.buyers ?? { "24h": 0, "7d": 0 }}
                    range={range}
                    color="green"
                />
            </div>
        </div>
    );
};