"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { CustomTable } from "@/components/common/custom-table";
import { reelsTableColumns } from "@/components/reels/reels-column";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useReels } from "@/hooks/useReels";
import CustomPagination from "@/components/common/custom-pagination";

const ReelsHomepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    reels, isLoading, isPlaceholderData, pagination, } = useReels({ page: currentPage, limit: 10, search: debouncedSearch });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (pagination?.hasNextPage) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (pagination?.hasPrevPage) setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section className="space-y-6 bg-white p-3 sm:p-6 rounded-lg">
      <div className="flex items-center justify-between gap-5 mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search Reels..."
            className="pl-10 h-11 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <CustomTable
        data={reels}
        loading={isLoading || isPlaceholderData}
        columns={reelsTableColumns}
        emptyState={{
          title: debouncedSearch ? "No matching reels" : "Inventory is empty",
          message: debouncedSearch
            ? `No results found for "${debouncedSearch}". Try a different term.`
            : "Product reels will appear here once they are uploaded.",
        }}
      />
      <div className="grid grid-cols-2 items-center border-t pt-3">
        <p className="text-sm text-muted-foreground">
          Showing page <span className="font-medium text-slate-950">{pagination?.page}</span> of{" "}
          <span className="font-medium text-slate-950">{pagination?.pages}</span>
        </p>
        <CustomPagination
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </div>
    </section >
  );
};

export default ReelsHomepage;