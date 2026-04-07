import { requestHandler } from "@/utils/requestHandler";
import { cache } from "react";

export const fetchCategoriesRequest = cache(async () => {
  return await requestHandler("get", `/product-categories/root`);
});
export const fetchAllCategoriesRequest = cache(async () => {
  return await requestHandler("get", `/product-categories`);
});

export const fetchCategoryRequest = cache(async (categoryId: string) => {
  return await requestHandler("get", `/product-categories/${categoryId}`);
});

export const fetchCategoryPriceRangeRequest = cache(
  async (categoryId: string) => {
    return await requestHandler(
      "get",
      `/product-categories/${categoryId}/price-range`,
    );
  },
);

export const createCategoryRequest = async (data: {
  name: string;
  description: string;
  parentCategoryId: string;
}) => {
  return await requestHandler("post", "/product-categories/create", data);
};

export const deleteCategoryRequest = async (id: string) => {
  return await requestHandler("delete", `/product-categories/${id}`);
};

export const updateCategoryRequest = async ({
  id,
  data,
}: {
  id: string;
  data: {
    name: string;
    description: string;
    parentCategoryId: string | null;
    isActive: boolean;
  };
}) => {
  return await requestHandler("patch", `/product-categories/${id}`, data);
};
