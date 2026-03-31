import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsSkeleton() {
    return (
        <div className="space-y-10 pb-20 max-w-7xl mx-auto p-6 animate-pulse">
            <Skeleton className="h-4 w-64 rounded-full mb-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-32 rounded-[2rem]" />
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-3 space-y-10">
                    <Skeleton className="h-96 rounded-[3rem]" /> {/* Marketplace Hero */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Skeleton className="h-80 rounded-[2rem]" />
                        <Skeleton className="h-80 rounded-[2rem]" />
                    </div>
                </div>
                <div className="space-y-8">
                    <Skeleton className="h-125 rounded-[2rem]" /> {/* Engagement Card */}
                </div>
            </div>
        </div>
    );
}