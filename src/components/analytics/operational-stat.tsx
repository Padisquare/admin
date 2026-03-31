import { MessageCircle, Star, ShieldCheck, Clock } from "lucide-react";

export const OperationalStats = ({ analytics }: any) => {
    const items = [
        { label: "Messages", val: analytics.messaging.messages, icon: MessageCircle, color: "text-blue-500" },
        { label: "Ratings", val: analytics.productRatings.total, icon: Star, color: "text-yellow-500" },
        { label: "Waitlist", val: analytics.waitlist.total, icon: Clock, color: "text-slate-500" },
        { label: "Admins", val: analytics.admins.total, icon: ShieldCheck, color: "text-rose-500" },
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {items.map((item) => (
                <div key={item.label} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <item.icon className={`h-4 w-4 ${item.color} mb-3`} />
                    <p className="text-[10px] uppercase font-semibold text-slate-400">{item.label}</p>
                    <p className="text-xl font-bold text-slate-800">{item.val}</p>
                </div>
            ))}
        </div>
    );
};