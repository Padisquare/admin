import { UploadProductDto } from "@/types/product.type";
import { requestHandler } from "@/utils/requestHandler";
import { cache } from "react";

export type ProductsQuery = {
  condition?: string;
  lga?: string;
  state?: string;
  search?: string;
};

export const fetchProducts = cache(
  async (params: ProductsQuery, page: number, limit: number) => {
    const queryString = new URLSearchParams({
      ...params,
      page: String(page),
      limit: String(limit),
    }).toString();

    return await requestHandler("get", `/products?${queryString}`);
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
