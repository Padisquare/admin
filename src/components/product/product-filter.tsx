"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

type Filters = {
  sort: string;
  condition: string;
  state: string;
  lga: string;
  startDate: string;
  endDate: string;
};

type ProductFiltersProps = {
  onChange: (filters: Filters) => void;
};

const ProductFilters: React.FC<ProductFiltersProps> = ({ onChange }) => {
  const [filters, setFilters] = useState<Filters>({
    sort: "",
    condition: "",
    state: "",
    lga: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (key: keyof Filters, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onChange(updated);
  };

  return (
    <div className="bg-white p-4 rounded-xl border flex flex-wrap gap-4">
      {/* Sort */}
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
      <input
        type="text"
        placeholder="State"
        className="border rounded-md p-2 text-sm"
        value={filters.state}
        onChange={(e) => handleChange("state", e.target.value)}
      />

      {/* LGA */}
      <input
        type="text"
        placeholder="LGA"
        className="border rounded-md p-2 text-sm"
        value={filters.lga}
        onChange={(e) => handleChange("lga", e.target.value)}
      />

      {/* Date Range */}
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
      <Button>
        <Search />
        Search
      </Button>
    </div>
  );
};

export default ProductFilters;
