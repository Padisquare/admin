import { AnalyticsData } from "@/types/analytics.type";

type TimeRange = "24h" | "7d" | "30d";

export const ProductChart = ({ analytics, range }: { analytics: AnalyticsData; range: TimeRange }) => {
    const stats = [
        { label: "24h", value: analytics.products.newLast24Hours ?? 0 },
        { label: "7d", value: analytics.products.newLast7Days ?? 0 },
        { label: "30d", value: analytics.products.newLast30Days ?? 0 },
    ];
    const selected = stats.find((item) => item.label === range);

    return (
        <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm h-full">
            <h3 className="text-lg font-bold text-slate-800">Product Velocity</h3>
            <p className="text-sm text-slate-400 font-medium mb-4">New listings in selected period</p>
            <p className="text-3xl font-black text-slate-900 mb-4">
                {selected?.value.toLocaleString() ?? "0"}
            </p>
            <div className="grid grid-cols-3 gap-2">
                {stats.map((item) => (
                    <div
                        key={item.label}
                        className={`rounded-xl border px-2 py-2 text-center ${item.label === range
                            ? "border-emerald-200 bg-emerald-50"
                            : "border-slate-200 bg-slate-50"
                            }`}
                    >
                        <p className="text-[11px] font-semibold text-slate-500">{item.label}</p>
                        <p className="text-sm font-bold text-slate-800">{item.value.toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};