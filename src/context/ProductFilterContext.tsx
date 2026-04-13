import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Filters = {
  condition?: string;
  state?: string;
  lga?: string;
  maxPrice?: number;
  minPrice?: number;
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
  condition: "",
  state: "",
  lga: "",
  search: "",
};

export const ProductFilterProvider: React.FC<ProductFilterProviderProps> = ({
  children,
}) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(initialFilters);
  const router = useRouter();
  const pathname = usePathname();

  const setFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
    router.replace(pathname);
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
