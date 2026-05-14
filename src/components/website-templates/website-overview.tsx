"use client";

import {
  Globe,
  Users,
  ShoppingBag,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const WebsitesOverview = () => {
  const stats = [
    {
      title: "Total Websites",
      value: 340,
      icon: Globe,
    },
    {
      title: "Active Websites",
      value: 280,
      icon: TrendingUp,
    },
    {
      title: "Total Products",
      value: "4.2K",
      icon: ShoppingBag,
    },
    {
      title: "Flagged Websites",
      value: 12,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex items-center justify-between p-5 border rounded-2xl bg-white shadow-sm hover:shadow-md transition"
          >
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-semibold">{stat.value}</h3>
            </div>

            <div className="p-3 bg-muted rounded-xl">
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebsitesOverview;
