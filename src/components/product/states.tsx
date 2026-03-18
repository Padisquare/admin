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

const States = () => {
  const { useGetAllStates } = useLocationHook();
  const { data, isPending } = useGetAllStates();
  const { setFilter, filters } = useProductFilters();

  if (isPending || !data) {
    return null; 
  }

  return (
    <Select
      value={filters.state ?? ""}
      onValueChange={(value) => {
        setFilter("state", value);
      }}
    >
      <SelectTrigger className="min-w-[100px] p-4">
        <SelectValue placeholder="Select State" />
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

export default States;
