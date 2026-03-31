import BaseGrowthChart from "../common/reuseable-areachart";

export const UserGrowthChart = ({ analytics }: any) => {
    const data = [
        { name: "24h", value: analytics.users.newLast24Hours },
        { name: "7d", value: analytics.users.newLast7Days },
        { name: "30d", value: analytics.users.newLast30Days },
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