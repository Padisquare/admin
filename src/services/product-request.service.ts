import { UploadProductRequestDto } from "@/types/product.type";
import { requestHandler } from "@/utils/requestHandler";
import { cache } from "react";

export const fetchProductRequest = cache(async (productId: string) => {
  return await requestHandler("get", `/product-requests/${productId}`);
});

export const createProductRequest = async (data: UploadProductRequestDto) => {
  return await requestHandler("post", `/product-requests/create`, data);
};

export const deleteProductRequest = async (productRequestId: string) => {
  return await requestHandler(
    "delete",
    `/product-requests/${productRequestId}`
  );
};

export const editProductRequest = async (
  productRequestId: string,
  data: UploadProductRequestDto
) => {
  return await requestHandler(
    "patch",
    `/product-requests/${productRequestId}`,
    data
  );
};
