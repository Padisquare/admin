import React, { createContext, useContext, useState, ReactNode } from "react";

export type Filters = {
  sort?: string;
  condition?: string;
  state?: string;
  lga?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
};

type ProductFilterContextType = {
  filters: Filters;
  appliedFilters: Filters;
  setFilter: (key: keyof Filters, value: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
};

const ProductFilterContext = createContext<
  ProductFilterContextType | undefined
>(undefined);

type ProductFilterProviderProps = {
  children: ReactNode;
};

const initialFilters: Filters = {
  sort: "",
  condition: "",
  state: "",
  lga: "",
  startDate: "",
  endDate: "",
  search: "",
};

export const ProductFilterProvider: React.FC<ProductFilterProviderProps> = ({
  children,
}) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(initialFilters);

  const setFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
  };

  return (
    <ProductFilterContext.Provider
      value={{
        filters,
        appliedFilters,
        setFilter,
        applyFilters,
        resetFilters,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
};

export const useProductFilters = () => {
  const context = useContext(ProductFilterContext);
  if (!context) {
    throw new Error(
      "useProductFilters must be used within a ProductFilterProvider",
    );
  }
  return context;
};
