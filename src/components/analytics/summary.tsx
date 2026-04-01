"use client";

import { Users, Package, ClipboardList, Film } from "lucide-react";
import { AnalyticsData } from "@/types/analytics.type";

const Summary = ({ analytics }: { analytics: AnalyticsData }) => {
  const stats = [
    {
      title: "Total Users",
      value: analytics.users.total,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      sub: `+${analytics.users.newLast7Days} this week`,
    },

    {
      title: "Total Products",
      value: analytics.products.total,
      icon: Package,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      isProduct: true,
      active: analytics.products.activeListings,
      closed: analytics.products.closedListings,
    },

    {

      title: "Requests",
      value: analytics.productRequests.total,
      icon: ClipboardList,
      color: "text-orange-600",
      bg: "bg-orange-50",
      sub: `${analytics.productRequests.open} currently open`,

    },
    {
      title: "Reels",
      value: analytics.reels.total,
      icon: Film,
      color: "text-purple-600",
      bg: "bg-purple-50",
      sub: `+${analytics.reels.newLast30Days} this month`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="relative p-6 border border-slate-100 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          <div className="flex items-end-safe justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {stat.title}
              </p>
              <h3 className="text-3xl font-extrabold mt-1 text-slate-900 leading-none">
                {stat.value?.toLocaleString() ?? "0"}
              </h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} transition-colors`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-6">
            {stat.isProduct ? (
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase">
                  <span className="text-emerald-600">Active: {stat.active}</span>
                  <span className="text-slate-400">Closed: {stat.closed}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full transition-all"
                    style={{ width: `${(stat.active! / (stat.value ?? 1)) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                {stat.sub}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Summary;