import React from "react";
import { useLocationHook } from "@/hooks/use-location";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 
import { useProductFilters } from "@/context/ProductFilterContext";

const LGAs = () => {
  const { useGetLGAByState } = useLocationHook();
  const { setFilter, filters } = useProductFilters();
  const { data, isPending } = useGetLGAByState(filters.state);

  if (isPending || !data) {
    return null;
  }

  return (
    <Select
      value={filters.lga ?? ""}
      onValueChange={(value) => {
        setFilter("lga", value);
      }}
    >
      <SelectTrigger className="min-w-[100px]">
        <SelectValue placeholder="Select Lga" />
      </SelectTrigger>
      <SelectContent>
        {data.map((state: string) => (
          <SelectItem key={state} value={state}>
            {state}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LGAs;
