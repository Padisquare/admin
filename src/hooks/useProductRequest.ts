import { useQuery } from "@tanstack/react-query";
import { fetchProductRequests } from "@/services/product-request.service";
import {
  ProductRequestFilters,
  ProductRequestResponse,
} from "@/types/product-request.type";

export const useProductRequests = (filters: ProductRequestFilters) => {
  const { data, isLoading, isFetching, error } =
    useQuery<ProductRequestResponse>({
      queryKey: ["product-requests", filters],
      queryFn: () => fetchProductRequests(filters),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

  const entity = data?.entity;

  return {
    requests: entity?.items ?? [],
    pagination: {
      total: entity?.total ?? 0,
      pages: entity?.pages ?? 0,
      page: Number(entity?.page ?? 1),
      hasNextPage: entity?.hasNextPage ?? false,
      hasPrevPage: entity?.hasPrevPage ?? false,
    },
    isLoading,
    isFetching,
    error,
  };
};
