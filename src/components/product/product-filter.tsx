"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import States from "./states";
import LGAs from "./LGAs";
import SearchBar from "./search-bar";
import { Filters, useProductFilters } from "@/context/ProductFilterContext";
import { usePathname, useRouter } from "next/navigation";

const ProductFilters = () => {
  const { filters, setFilter } = useProductFilters();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (key: keyof Filters, value: string) => {
    setFilter(key, value);
  };

 const handleSearch = () => {
   const { search, condition, endDate, lga, sort, startDate, state } = filters;

   const params = new URLSearchParams();

   if (search) params.set("search", search);
   if (condition) params.set("condition", condition);
   if (sort) params.set("sort", sort);
   if (state) params.set("state", state);
   if (lga) params.set("lga", lga);
   if (startDate) params.set("startDate", startDate);
   if (endDate) params.set("endDate", endDate);

   const queryString = params.toString();

   router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
 };

  return (
    <div className="bg-white p-4 rounded-xl border flex justify-between gap-4">
      {/* Sort */}
      <div className="flex items-center justify-between gap-4">
        <select
          className="border rounded-md p-2 text-sm"
          value={filters.sort}
          onChange={(e) => handleChange("sort", e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="low_to_high">Low → High</option>
          <option value="high_to_low">High → Low</option>
        </select>

        {/* Condition */}
        <select
          className="border rounded-md p-2 text-sm"
          value={filters.condition}
          onChange={(e) => handleChange("condition", e.target.value)}
        >
          <option value="">Condition</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>

        {/* State */}
        <States />
        <LGAs />
      </div>

      <div className="flex gap-4">
        <input
          type="date"
          className="border rounded-md p-2 text-sm"
          value={filters.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
        />

        <input
          type="date"
          className="border rounded-md p-2 text-sm"
          value={filters.endDate}
          onChange={(e) => handleChange("endDate", e.target.value)}
        />
        <SearchBar />
        <Button onClick={handleSearch}>
          <Search />
          Search
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;
