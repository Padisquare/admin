"use client";

import { Eye, Film, Heart, MessageCircle } from "lucide-react";

const ReelsOverview = () => {
  const stats = [
    {
      title: "Total Reels",
      value: 210,
      icon: Film,
    },
    {
      title: "Total Views",
      value: "1.2M",
      icon: Eye,
    },
    {
      title: "Total Likes",
      value: "320K",
      icon: Heart,
    },
    {
      title: "Comments",
      value: "18.4K",
      icon: MessageCircle,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
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

export default ReelsOverview;
