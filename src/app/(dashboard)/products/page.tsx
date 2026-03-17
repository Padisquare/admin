"use client";

import { useState } from "react";
import CustomPagination from "@/components/common/custom-pagination";
import { CustomTable } from "@/components/common/custom-table";
import { productTableColumns } from "@/components/product/product-table-columns";
import { productsData } from "@/constants/data";
import ProductFilters from "@/components/product/product-filter";

const ITEMS_PER_PAGE = 5;

const ProductHomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(productsData.length / ITEMS_PER_PAGE);

  const paginatedData = productsData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <section className="bg-white px-5 pb-10 pt-5">
      <ProductFilters onChange={() => {}} />
      <CustomTable
        data={paginatedData}
        columns={productTableColumns}
        loading={false}
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
