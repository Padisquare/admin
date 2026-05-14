"use client";

import { useState } from "react";
import { CustomTable } from "@/components/common/custom-table";
import CustomPagination from "@/components/common/custom-pagination";
import { useWaitlist } from "@/hooks/useWaitlist";
import { waitlistTableColumns } from "@/components/waitlist/waitlist-column";
import { WaitlistStatsSection } from "@/components/waitlist/waitlist-stat-section";
import WaitlistHeader from "@/components/waitlist/waitlist-header";
import { WaitlistFilters } from "@/types/waitlist.type";

const WaitlistPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<WaitlistFilters>({
    search: "",
    role: undefined,
  });

  const { data, isLoading, isFetching } = useWaitlist({
    ...filters,
    page: currentPage,
    limit: 10,
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
  const handleFilterChange = (newFilters: Partial<WaitlistFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setCurrentPage(1);
  };

  return (
    <div className="pb-10 space-y-5">
      <WaitlistStatsSection />
      <div className="bg-white rounded-lg border px-10 pt-10 pb-5 space-y-5">
        <WaitlistHeader
          onFilterChange={handleFilterChange}
          currentSearch={filters.search}
        />
        <div className="space-y-4 pb-3">
          <CustomTable
            data={waitlist}
            loading={isLoading || isFetching}
            columns={waitlistTableColumns}
            emptyState={{
              title: filters.search ? "No Results Found" : "No Waitlist Data",
              message: filters.search
                ? `No users found for "${filters.search}"`
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
    </div>
  );
};

export default WaitlistPage;
