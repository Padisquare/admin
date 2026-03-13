"use client"
import { ProductsTable } from "@/components/product/products-table";
import { productsData } from "@/constants/data";
import React from "react";

const ProductHomePage = () => {
  return (
    <section className="">
      <ProductsTable data={productsData} loading={false} />
    </section>
  );
};

export default ProductHomePage;
