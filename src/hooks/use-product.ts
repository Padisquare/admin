import { fetchProducts } from "@/services/product.service";
import { ProductsResponse } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";

type UseGetProductsProps = {
  params?: {
    condition?: string;
    lga?: string;
    state?: string;
    search?: string;
  };
  page?: number;
  limit?: number;
};

export const useGetProducts = ({
  params = {},
  page = 1,
  limit = 10,
}: UseGetProductsProps) => {
  return useQuery<ProductsResponse>({
    queryKey: ["products", params, page, limit],
    queryFn: () => fetchProducts(params, page, limit),
  });
};
