import { AnalyticsData } from "@/types/analytics.type";
import BaseGrowthChart from "../common/reuseable-areachart";

export const ProductChart = ({ analytics }: { analytics: AnalyticsData }) => {
    const data = [
        { name: "24h", value: analytics.products.newLast24Hours ?? 0 },
        { name: "7d", value: analytics.products.newLast7Days ?? 0 },
        { name: "30d", value: analytics.products.newLast30Days ?? 0 },
    ];

    return (
        <BaseGrowthChart
            title="Product Velocity"
            subtitle="New listings added to marketplace"
            data={data}
            color="#10b981"
            gradientId="colorProducts"
        />
    );
};