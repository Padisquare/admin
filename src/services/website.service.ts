import { WebsiteFilters, WebsiteFormType } from "@/types/website.type";
import { requestHandler } from "@/utils/requestHandler";
import { cache } from "react";

export const fetchWebsite = cache(async (domain: string) => {
  return await requestHandler("get", `/website/deleted/${domain}`);
});

export const createWebsite = async (data: WebsiteFormType) => {
  return await requestHandler("post", `/website`, data);
};

export const updateWebsite = async (id: string, data: WebsiteFormType) => {
  return await requestHandler("patch", `/website/${id}`, data);
};

export const deleteWebsite = async (id: string) => {
  return await requestHandler("delete", `/website/${id}`);
};

export const restoreWebsite = async (id: string) => {
  return await requestHandler("post", `/website/${id}/restore`, {});
};

export const fetchAllWebsites = (filters: WebsiteFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.search) params.append("search", filters.search);
  if (filters.category) params.append("category", filters.category);
  if (filters.state) params.append("state", filters.state);
  if (filters.lga) params.append("lga", filters.lga);
  return requestHandler(
    "get",
    `/website${params.toString() ? `?${params.toString()}` : ""}`,
  );
};
