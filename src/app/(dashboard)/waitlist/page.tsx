"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CustomTable } from "@/components/common/custom-table";
import CustomPagination from "@/components/common/custom-pagination";
import { useWaitlist } from "@/hooks/useWaitlist";
import { useDebounce } from "@/hooks/useDebounce";
import { waitlistTableColumns } from "@/components/waitlist/waitlist-column";
import { WaitlistStatsSection } from "@/components/waitlist/waitlist-stat-section";

const WaitlistPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);

    const { data, isLoading, isFetching } = useWaitlist({
        page: currentPage,
        limit: 10,
        search: debouncedSearch,
    });
    const waitlist = data?.entity?.data ?? [];
    const pagination = data?.entity;

    const handleNextPage = () => {
        if (pagination && pagination.page < pagination.totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };
    const handlePreviousPage = () => {
        if (pagination && pagination.page > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="pb-10 space-y-5">
            <WaitlistStatsSection />
            <div className="bg-white pt-5 rounded-lg border px-5 space-y-5">
                <div className="py-3">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search waitlist..."
                            className="pl-10 h-11 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>
                <CustomTable
                    data={waitlist}
                    loading={isLoading || isFetching}
                    columns={waitlistTableColumns}
                    emptyState={{
                        title: debouncedSearch ? "No Results Found" : "No Waitlist Data",
                        message: debouncedSearch
                            ? `No users found for "${debouncedSearch}"`
                            : "No one has joined the waitlist yet.",
                    }}
                />
                {pagination && (
                    <div className="grid grid-cols-2 items-center border-t pt-3">
                        <p className="text-sm">
                            Showing page <b>{pagination.page}</b> of{" "}
                            <b>{pagination.totalPages}</b>
                        </p>
                        <CustomPagination
                            handleNextPage={handleNextPage}
                            handlePreviousPage={handlePreviousPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default WaitlistPage;