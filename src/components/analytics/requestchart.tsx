import { AnalyticsData } from "@/types/analytics.type";
import BaseGrowthChart from "../common/reuseable-areachart";

export const ProductRequestChart = ({ analytics }: { analytics: AnalyticsData }) => {
    const data = [
        { name: "24h", value: analytics.productRequests.newLast24Hours ?? 0 },
        { name: "7d", value: analytics.productRequests.newLast7Days ?? 0 },
        { name: "30d", value: analytics.productRequests.newLast30Days ?? 0 },
    ];

    return (
        <BaseGrowthChart
            title="Request Velocity"
            subtitle="Customer intent & leads"
            data={data}
            color="#f59e0b"
            gradientId="gradRequests"
        />
    );
};