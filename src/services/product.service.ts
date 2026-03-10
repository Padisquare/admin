import { UploadProductDto } from "@/types/product.type";
import { requestHandler } from "@/utils/requestHandler";
import { cache } from "react";

export const fetchProducts = cache(
  async (query: string, page: number, limit: number) => {
    return await requestHandler(
      "get",
      `/products?${query}&page=${page}&limit=${limit}`,
    );
  },
);

export const fetchProduct = cache(async (productId: string) => {
  return await requestHandler("get", `/products/${productId}`);
});

export const fetchProductRating = cache(async (productId: string) => {
  return await requestHandler("get", `/products/${productId}/reviews`);
});

export const fetchSimilarProducts = cache(async (productId: string) => {
  return await requestHandler("get", `/products/${productId}/similar?limit=4`);
});

export const createProduct = async (data: UploadProductDto) => {
  return await requestHandler("post", `/products/create`, data);
};

export const updateProduct = async (
  productId: string,
  data: UploadProductDto,
) => {
  return await requestHandler("patch", `/products/${productId}`, data);
};

export const deleteProduct = async (productId: string) => {
  return await requestHandler("delete", `/products/${productId}`);
};

export const closeProduct = async (productId: string) => {
  return await requestHandler("post", `/products/${productId}/close`);
};

export const reopenProduct = async (productId: string) => {
  return await requestHandler("post", `/products/${productId}/reopen`);
};
