import { AnalyticsData } from "@/types/analytics.type";
import { formatNumberToKMB } from "@/utils/formatNumber";

export const MarketplaceCard = ({ analytics }: { analytics: AnalyticsData }) => {
    const val = analytics.marketplace.estimatedActiveListingsValue;
    return (
        <div className="relative overflow-hidden p-8 rounded-3xl bg-slate-950 text-white shadow-2xl">
            <p className="text-slate-400 font-medium text-sm uppercase tracking-widest">Marketplace Valuation</p>
            <h2 className="text-5xl font-extrabold mt-2 tracking-tight">
                ₦{formatNumberToKMB(val, 2)}
            </h2>
            <div className="mt-6 flex gap-6 text-sm">
                <div className="flex flex-col">
                    <span className="text-slate-400 uppercase text-xs">Product Categories</span>
                    <span className="font-bold text-lg text-blue-400">{analytics.productCategories.total}</span>
                </div>
                <div className="h-10 w-px bg-slate-800" />
                <div className="flex flex-col">
                    <span className="text-slate-400 uppercase text-xs">Websites</span>
                    <span className="font-bold text-lg text-emerald-400">{analytics.websites.total}</span>
                </div>
                <div className="h-10 w-px bg-slate-800" />
                <div className="flex flex-col">
                    <span className="text-slate-400 uppercase text-xs">Website Templates</span>
                    <span className="font-bold text-lg text-purple-500">{analytics.websiteTemplates.total}</span>
                </div>
            </div>
        </div>
    );
};