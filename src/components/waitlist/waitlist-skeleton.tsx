import { Skeleton } from "@/components/ui/skeleton";

const base = "bg-slate-200 dark:bg-slate-800 animate-pulse";

const WaitlistStatsSkeleton = () => {
    return (
        <div className="space-y-4 mb-6">
            {/* Header */}
            <div className="flex items-end justify-between gap-3">
                <div className="space-y-2">
                    <Skeleton className={`h-7 w-56 rounded ${base}`} />
                    <Skeleton className={`h-4 w-80 rounded ${base}`} />
                </div>

                <div className="flex items-center gap-2">
                    <Skeleton className={`h-4 w-12 rounded ${base}`} />
                    <Skeleton className={`h-9 w-20 rounded-lg ${base}`} />
                </div>
            </div>
            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4"
                    >
                        <div className="space-y-2">
                            <Skeleton className={`h-5 w-32 rounded ${base}`} />
                            <Skeleton className={`h-4 w-44 rounded ${base}`} />
                        </div>
                        <Skeleton className={`h-10 w-20 rounded ${base}`} />
                        <div className="grid grid-cols-2 gap-2">
                            {[...Array(2)].map((_, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2"
                                >
                                    <Skeleton
                                        className={`h-3 w-10 mx-auto rounded ${base}`}
                                    />
                                    <Skeleton
                                        className={`h-4 w-12 mx-auto rounded ${base}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WaitlistStatsSkeleton;