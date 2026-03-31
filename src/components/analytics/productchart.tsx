import BaseGrowthChart from "../common/reuseable-areachart";

export const ProductChart = ({ analytics }: any) => {
    const data = [
        { name: "24h", value: analytics.products.newLast24Hours },
        { name: "7d", value: analytics.products.newLast7Days },
        { name: "30d", value: analytics.products.newLast30Days },
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