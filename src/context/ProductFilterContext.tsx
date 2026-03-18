import React, { createContext, useContext, useState, ReactNode } from "react";

export type Filters = {
  sort: string;
  condition: string;
  state: string;
  lga: string;
  startDate: string;
  endDate: string;
  search: string;
};

type ProductFilterContextType = {
  filters: Filters;
  setFilter: (key: keyof Filters, value: string) => void;
  resetFilters: () => void;
};

const ProductFilterContext = createContext<
  ProductFilterContextType | undefined
>(undefined);

type ProductFilterProviderProps = {
  children: ReactNode;
};

export const ProductFilterProvider: React.FC<ProductFilterProviderProps> = ({
  children,
}) => {
  const [filters, setFilters] = useState<Filters>({
    sort: "",
    condition: "",
    state: "",
    lga: "",
    startDate: "",
    endDate: "",
    search: "",
  });

  const setFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      sort: "",
      condition: "",
      state: "",
      lga: "",
      startDate: "",
      endDate: "",
      search: "",
    });
  };

  return (
    <ProductFilterContext.Provider value={{ filters, setFilter, resetFilters }}>
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

export default ProductFilterContext;
