import { ReusableBarChart } from "@/components/common/reusable-barchart";
import React from "react";

const ProductGrowthChart = () => {
const productData = [
  { month: "Jan", products: 45 },
  { month: "Feb", products: 78 },
  { month: "Mar", products: 102 },
  { month: "Apr", products: 150 },
  { month: "May", products: 200 },
  { month: "Jun", products: 240 },
  { month: "Jul", products: 275 },
  { month: "Aug", products: 310 },
  { month: "Sep", products: 350 },
  { month: "Oct", products: 395 },
  { month: "Nov", products: 430 },
  { month: "Dec", products: 480 },
];
  return (
    <ReusableBarChart
      title="Total Products Uploaded"
      data={productData}
      dataKey="products"
      barColor="#16A34A"
    />
  );
};

export default ProductGrowthChart;
