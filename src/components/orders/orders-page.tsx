"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { CustomTable } from "@/components/common/custom-table";
import CustomPagination from "@/components/common/custom-pagination";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useOrders } from "@/hooks/useOrders";
import { orderTableColumns } from "./order-column";

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { orders, isLoading, isFetching, pagination } = useOrders({
    page: currentPage,
    limit: 10,
    search: debouncedSearch.trim(),
  });

  return (
    <div className="bg-white pt-2 rounded-lg border px-5 py-3">
      <div className="px-5 py-3">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Order ID, ShipBubble ID or payment reference..."
            className="pl-10 h-11 border-slate-200 rounded-xl"
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
          data={orders}
          loading={isLoading || isFetching}
          columns={orderTableColumns}
          emptyState={{
            title: debouncedSearch ? "No Results Found" : "No Orders Found",
            message: debouncedSearch
              ? `We couldn't find any orders matching "${debouncedSearch}"`
              : "There are no orders yet.",
          }}
        />

        <div className="grid grid-cols-2 items-center border-t pt-3">
          <p className="text-sm">
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

export default OrdersPage;
