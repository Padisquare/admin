import { AnalyticsData } from "@/types/analytics.type";
import BaseGrowthChart from "../common/reuseable-areachart";

export const UserGrowthChart = ({ analytics }: { analytics: AnalyticsData }) => {
    const data = [
        { name: "24h", value: analytics.users.newLast24Hours ?? 0 },
        { name: "7d", value: analytics.users.newLast7Days ?? 0 },
        { name: "30d", value: analytics.users.newLast30Days ?? 0 },
    ];

    return (
        <BaseGrowthChart
            title="User Acquisition"
            subtitle="Growth of the platform user base"
            data={data}
            color="#3b82f6"
            gradientId="colorUsers"
        />
    );
};