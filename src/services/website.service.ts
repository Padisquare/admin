import { WebsiteFormType } from "@/types/website.type";
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
