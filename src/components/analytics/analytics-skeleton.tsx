import { Skeleton } from "@/components/ui/skeleton";

const base = "bg-slate-200 dark:bg-slate-800 animate-pulse";

const AnalyticsSkeleton = () => {
    return (
        <div className="space-y-10 pb-20 max-w-7xl mx-auto px-4">
            <div className="space-y-2">
                <Skeleton className={`h-6 w-72 rounded ${base}`} />
                <Skeleton className={`h-4 w-56 rounded ${base}`} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="p-6 rounded-3xl border border-slate-100 bg-white space-y-6"
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <Skeleton className={`h-3 w-20 ${base}`} />
                                <Skeleton className={`h-7 w-24 ${base}`} />
                            </div>
                            <Skeleton className={`h-10 w-10 rounded-2xl ${base}`} />
                        </div>
                        <Skeleton className={`h-3 w-32 ${base}`} />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                <div className="xl:col-span-2 space-y-8">
                    <div className="p-8 rounded-3xl bg-slate-900 space-y-6">
                        <Skeleton className={`h-4 w-40 ${base}`} />
                        <Skeleton className={`h-12 w-48 ${base}`} />
                        <div className="flex gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className={`h-3 w-24 ${base}`} />
                                    <Skeleton className={`h-5 w-12 ${base}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <section className="space-y-5">
                        <div className="flex items-center gap-4">
                            <Skeleton className={`h-3 w-32 ${base}`} />
                            <div className="h-px w-full bg-slate-200" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Skeleton className={`h-72 rounded-[2rem] ${base}`} />
                            <Skeleton className={`h-72 rounded-[2rem] ${base}`} />
                        </div>
                    </section>
                    <section className="space-y-5">
                        <div className="flex items-center gap-4">
                            <Skeleton className={`h-3 w-32 ${base}`} />
                            <div className="h-px w-full bg-slate-200" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Skeleton className={`h-72 rounded-[2rem] ${base}`} />
                            <Skeleton className={`h-72 rounded-[2rem] ${base}`} />
                        </div>
                    </section>
                </div>
                <aside className="space-y-8">
                    <div className="space-y-8 xl:sticky xl:top-10">
                        <div className="p-5 rounded-3xl bg-white border border-slate-100 space-y-6">
                            <Skeleton className={`h-5 w-40 ${base}`} />
                            <Skeleton className={`h-3 w-48 ${base}`} />
                            <Skeleton className={`h-40 w-full rounded-full ${base}`} />
                            <div className="space-y-2">
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} className={`h-4 w-full ${base}`} />
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="p-4 bg-white border border-slate-100 rounded-2xl space-y-3"
                                >
                                    <Skeleton className={`h-4 w-4 ${base}`} />
                                    <Skeleton className={`h-3 w-16 ${base}`} />
                                    <Skeleton className={`h-5 w-10 ${base}`} />
                                </div>
                            ))}
                        </div>

                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AnalyticsSkeleton;