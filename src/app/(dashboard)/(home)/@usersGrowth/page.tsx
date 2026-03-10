import { ReusableBarChart } from "@/components/common/reusable-barchart";
import React from "react";

const UserGrowthPage = () => {
  const userData = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 210 },
    { month: "Mar", users: 380 },
    { month: "Apr", users: 520 },
    { month: "May", users: 690 },
    { month: "Jun", users: 860 },
  ];

  return (
    <div>
      <ReusableBarChart
        title="User Growth"
        data={userData}
        dataKey="users"
        barColor="#2563EB"
      />
    </div>
  );
};

export default UserGrowthPage;
