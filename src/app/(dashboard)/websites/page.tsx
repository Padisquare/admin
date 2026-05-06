"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CustomTable } from "@/components/common/custom-table";
import CustomPagination from "@/components/common/custom-pagination";
import { useWebsites } from "@/hooks/useWebsites";
import { useDebounce } from "@/hooks/useDebounce";
import { websitTableColumns } from "@/components/website/websit-column";

const WebsiteHomepage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);

    const {
        websites,
        isLoading,
        pagination,
        isFetching,
    } = useWebsites({
        page: currentPage, limit: 10,
        search: debouncedSearch,
    });

    const handleNextPage = () => {
        if (pagination.hasNextPage) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (pagination.hasPrevPage) {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
        }
    };

    return (
        <div className="bg-white pt-2 rounded-lg border px-5 py-3 ">
            <div className="px-5 py-3 ">
                <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search Website..."
                        className="pl-10 h-11 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>

            <div className="p-5 space-y-4">
                <CustomTable
                    data={websites}
                    loading={isLoading || isFetching}
                    columns={websitTableColumns}
                    emptyState={{
                        title: debouncedSearch ? "No Results Found" : "No Websites Found",
                        message: debouncedSearch
                            ? `We couldn't find any websites matching "${debouncedSearch}"`
                            : "The website list is currently empty."
                    }}
                />

                <div className="grid grid-cols-2 items-center border-t pt-3">
                    <p className="text-sm">
                        Showing page <b>{pagination.page}</b> of <b>{pagination.pages}</b>
                    </p>
                    <CustomPagination
                        handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default WebsiteHomepage;