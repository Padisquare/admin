"use client";

import { Users, Package, ClipboardList, Film } from "lucide-react";

const Summary = () => {
  const stats = [
    {
      title: "Total Users",
      value: 1240,
      icon: Users,
    },
    {
      title: "Total Products",
      value: 530,
      icon: Package,
    },
    {
      title: "Product Requests",
      value: 87,
      icon: ClipboardList,
    },
    {
      title: "Total Reels",
      value: 210,
      icon: Film,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="flex items-center justify-between p-6 border rounded-xl bg-white"
        >
          <div>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
            <h3 className="text-2xl font-semibold">{stat.value}</h3>
          </div>

          <div className="p-3 bg-muted rounded-lg">
            <stat.icon className="h-6 w-6" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Summary;
