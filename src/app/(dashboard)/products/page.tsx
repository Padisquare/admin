"use client";

import CustomPagination from "@/components/common/custom-pagination";
import { CustomTable } from "@/components/common/custom-table";
import ProductFilters from "@/components/product/product-filter";
import { productTableColumns } from "@/components/product/product-table-columns";
import { useProductFilters } from "@/context/ProductFilterContext";
import { useGetProducts } from "@/hooks/use-product";
import { useState } from "react";

const ProductHomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    appliedFilters: { condition, state, lga, search, minPrice, maxPrice },
  } = useProductFilters();

  const { data, isPending } = useGetProducts({
    params: { condition, search, state, lga, minPrice, maxPrice },
    page: currentPage,
    limit: 10,
  });
  const products = data ? data.entity.items : [];
  const pagination = data?.entity;

  const handleNextPage = () => {
    if (pagination?.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pagination?.hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <section className="bg-white px-5 pb-10 pt-5">
      <ProductFilters />
      <CustomTable
        data={products}
        columns={productTableColumns}
        loading={isPending}
        emptyState={{
          title: "No Products",
          message: "There are no products available",
        }}
      />

      <CustomPagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </section>
  );
};

export default ProductHomePage;
