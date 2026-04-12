"use client";

import { useState } from "react";
import ProductRequestHeader from "@/components/product-request/product-request-header";
import CustomPagination from "@/components/common/custom-pagination";
import { ProductRequestFilters } from "@/types/product-request.type";
import { useProductRequests } from "@/hooks/useProductRequest";
import { CustomTable } from "@/components/common/custom-table";
import { requestColumns } from "@/components/product-request/product-request-column";

const ProductRequestsHomepage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState<ProductRequestFilters>({
    page: 1,
    limit: 10,
    search: "",
  });

  const { requests, pagination, isLoading, isFetching } = useProductRequests({
    ...filters,
    page: currentPage,
  });

  const handleFilterChange = (newFilters: Partial<ProductRequestFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };
  const hasSearch = !!filters.search;
  return (
    <div className="space-y-6 bg-white p-3 sm:p-6 rounded-lg">

      <ProductRequestHeader
        onFilterChange={handleFilterChange}
        currentSearch={filters.search}
      />

      <div className="space-y-4">
        <CustomTable
          data={requests}
          columns={requestColumns}
          loading={isLoading || isFetching}
          emptyState={{
            title: hasSearch ? "No Results Found" : "No Requests Yet",
            message: hasSearch
              ? `No requests match "${filters.search}"`
              : "There are no product requests available.",
          }}
        />

        <div className="grid grid-cols-2 items-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Showing page <b>{pagination.page}</b> of <b>{pagination.pages}</b>
          </p>
          <CustomPagination
            handleNextPage={() =>
              pagination.hasNextPage && setCurrentPage((p) => p + 1)
            }
            handlePreviousPage={() =>
              pagination.hasPrevPage && setCurrentPage((p) => Math.max(p - 1, 1))
            }
          />
        </div>
      </div>
    </div>
  );
};
export default ProductRequestsHomepage;