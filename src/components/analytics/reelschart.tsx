import { AnalyticsData } from "@/types/analytics.type";
import BaseGrowthChart from "../common/reuseable-areachart";

export const ReelsChart = ({ analytics }: { analytics: AnalyticsData }) => {
    const data = [
        { name: "24h", value: analytics.reels.newLast24Hours ?? 0 },
        { name: "7d", value: analytics.reels.newLast7Days ?? 0 },
        { name: "30d", value: analytics.reels.newLast30Days ?? 0 },
    ];

    return (
        <BaseGrowthChart
            title="Reel Engagement"
            subtitle="Short-form video growth"
            data={data}
            color="#a855f7"
            gradientId="gradReels"
        />
    );
};
