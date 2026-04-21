"use client";

import { Filters, useProductFilters } from "@/context/ProductFilterContext";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import CustomButton from "../common/custom-button";
import LGAs from "./LGAs";
import SearchBar from "./search-bar";
import States from "./states";

const ProductFilters = () => {
  const { filters, setFilter, applyFilters, resetFilters } =
    useProductFilters();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (key: keyof Filters, value: string) => {
    setFilter(key, value);
  };

  const handleSearch = () => {
    const { search, condition, maxPrice, lga, minPrice, state } = filters;

    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (condition) params.set("condition", condition);
    if (state) params.set("state", state);
    if (lga) params.set("lga", lga);
    if (maxPrice) params.set("maxPrice", String(maxPrice));
    if (minPrice) params.set("minPrice", String(minPrice));

    const queryString = params.toString();
    applyFilters();

    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== "" && value !== null && value !== undefined,
  );

  return (
    <div className="bg-white p-4 rounded-xl border flex justify-between gap-4">
      {/* Sort */}
      <div className="flex items-center justify-between gap-4">
        {/* Condition */}
        <select
          className="border rounded-md p-2 text-sm"
          value={filters.condition}
          onChange={(e) => handleChange("condition", e.target.value)}
        >
          <option value="">Condition</option>
          <option value="brand_new">Brand New</option>
          <option value="used">Used</option>
          <option value="fairly_used">Fairly Used</option>
          <option value="local_used">Local Used</option>
        </select>

        {/* State */}
        <States />
        <LGAs />
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex gap-1 items-center">
          {/* Min Price */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Min Price</label>
            <input
              type="number"
              placeholder="e.g. 1000"
              className="border rounded-md p-2 text-sm"
              value={filters.minPrice || ""}
              onChange={(e) => handleChange("minPrice", e.target.value)}
            />
          </div>

          {/* Max Price */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Max Price</label>
            <input
              type="number"
              placeholder="e.g. 50000"
              className="border rounded-md p-2 text-sm"
              value={filters.maxPrice || ""}
              onChange={(e) => handleChange("maxPrice", e.target.value)}
            />
          </div>
        </div>
        <SearchBar />
        <div className="flex flex-col gap-1">
          <CustomButton
            type="submit"
            leftIcon={<Search />}
            label="Search"
            onClick={handleSearch}
          />
          {hasActiveFilters && (
            <CustomButton
              type="button"
              label="Clear Filters"
              variant={"white"}
              onClick={() => resetFilters()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
