import { ProductsQuery, UploadProductDto } from "@/types/product.type";
import { requestHandler } from "@/utils/requestHandler";
import { cache } from "react";

export const fetchProducts = cache(
  async (params: ProductsQuery, page: number, limit: number) => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });

    searchParams.append("page", String(page));
    searchParams.append("limit", String(limit));

    return await requestHandler("get", `/products?${searchParams.toString()}`);
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
  return await requestHandler("delete", `/products/${productId}/admin`);
};

export const closeProduct = async (productId: string) => {
  return await requestHandler("post", `/products/${productId}/close`);
};

export const reopenProduct = async (productId: string) => {
  return await requestHandler("post", `/products/${productId}/reopen`);
};
