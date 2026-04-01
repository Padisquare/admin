"use client";
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

export default function AnalyticsClient() {
    const { data, isPending, isError, error } = useAnalytics();
    if (isPending) return (<AnalyticsSkeleton />);
    if (isError) return <div className="text-red-500 p-6">Error loading analytics data. {error.message}</div>;
    if (!data?.entity) {
        return <div className="p-6">No analytics data available.</div>;
    }
    const analytics = data.entity;
    return (
        <div className="space-y-10 pb-20 max-w-7xl mx-auto px-4 ">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Live Marketplace Data</h2>
                <p className="text-slate-400 text-sm font-medium">Last updated {formatDateTime(analytics.generatedAt)}</p>
            </div>
            <Summary analytics={analytics} />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                <div className="xl:col-span-2 space-y-8">
                    <MarketplaceCard analytics={analytics} />
                    <section className="space-y-5">
                        <div className="flex items-center gap-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 whitespace-nowrap">Growth Metrics</h3>
                            <div className="h-px w-full bg-slate-200" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <UserGrowthChart analytics={analytics} />
                            <ProductChart analytics={analytics} />
                        </div>
                    </section>
                    <section className="space-y-5">
                        <div className="flex items-center gap-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 whitespace-nowrap">Activity Pulse</h3>
                            <div className="h-px w-full bg-slate-200" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <ProductRequestChart analytics={analytics} />
                            <ReelsChart analytics={analytics} />
                        </div>
                    </section>
                </div>
                <aside className="space-y-8">
                    <div className="xl:sticky xl:top-10 space-y-8">
                        <SocialEngagementCard analytics={analytics} />
                        <OperationalStats analytics={analytics} />
                    </div>
                </aside>
            </div>
        </div>
    );
}