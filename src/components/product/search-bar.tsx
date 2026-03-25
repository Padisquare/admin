import { useProductFilters } from "@/context/ProductFilterContext";
import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  const { setFilter, filters } = useProductFilters();

  return (
    <div className="relative w-full max-w-md">
      {/* Icon */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

      {/* Input */}
      <Input
        value={filters.search}
        placeholder="Search products..."
        onChange={(e) => setFilter("search", e.target.value)}
        className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 
                   focus:border-black focus:ring-2 focus:ring-black/10 
                   transition-all duration-200 shadow-sm"
      />
    </div>
  );
};

export default SearchBar;
