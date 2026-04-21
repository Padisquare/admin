import {
  deleteProduct,
  fetchProduct,
  fetchProducts,
} from "@/services/product.service";
import {
  ProductResponse,
  ProductsResponse,
  UseGetProductsProps,
} from "@/types/product.type";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useGetProductById = ({ productId }: { productId: string }) => {
  return useQuery<ProductResponse>({
    queryKey: ["product-Id", productId],
    queryFn: async () => fetchProduct(productId),
    enabled: !!productId,
  });
};

export const useDeleteProductById = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteProduct(id);
    },
  });
};
