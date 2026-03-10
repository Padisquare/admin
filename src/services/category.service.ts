import { requestHandler } from "@/utils/requestHandler";
import { cache } from "react";

export const fetchCategoriesRequest = cache(async () => {
  return await requestHandler("get", `/product-categories/root`);
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
