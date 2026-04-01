"use client";
import { useState } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { MarketplaceCard } from "./marketplace-card";
import { UserGrowthChart } from "./usergrowth";
import { ProductChart } from "./productchart";
import { ProductRequestChart } from "./requestchart";
import { ReelsChart } from "./reelschart";
import { SocialEngagementCard } from "./social-engagement";
import { OperationalStats } from "./operational-stat";
import { formatDateTime } from "@/utils/formatDate";
import Summary from "./summary";
import AnalyticsSkeleton from "./analytics-skeleton";

type TimeRange = "24h" | "7d" | "30d";

export default function AnalyticsClient() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("7d");
  const { data, isPending, isError, error } = useAnalytics();
  if (isPending) return <AnalyticsSkeleton />;
  if (isError)
    return (
      <div className="text-red-500 p-6">
        Error loading analytics data. {error.message}
      </div>
    );
  if (!data?.entity) {
    return <div className="p-6">No analytics data available.</div>;
  }
  const analytics = data.entity;
  return (
    <div className="space-y-4 pb-20 max-w-7xl mx-auto px-0">
      <div className="flex items-end justify-between gap-3">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Live Marketplace Data
          </h2>
          <p className="text-slate-400 text-sm font-medium">
            Last updated {formatDateTime(analytics.generatedAt)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="analytics-range"
            className="text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Range
          </label>
          <select
            id="analytics-range"
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value as TimeRange)}
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
          >
            <option value="24h">24h</option>
            <option value="7d">7d</option>
            <option value="30d">30d</option>
          </select>
        </div>
      </div>
      <Summary analytics={analytics} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
        <div className="space-y-4">
          <MarketplaceCard analytics={analytics} />
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 whitespace-nowrap">
                Growth Metrics
              </h3>
              <div className="h-px w-full bg-slate-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UserGrowthChart analytics={analytics} range={selectedRange} />
              <ProductChart analytics={analytics} range={selectedRange} />
            </div>
          </section>
          <OperationalStats analytics={analytics} />
        </div>
        <aside className="space-y-4">
          <SocialEngagementCard analytics={analytics} />
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 whitespace-nowrap">
                Activity Pulse
              </h3>
              <div className="h-px w-full bg-slate-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProductRequestChart analytics={analytics} range={selectedRange} />
              <ReelsChart analytics={analytics} range={selectedRange} />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
