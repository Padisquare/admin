import { requestHandler } from "@/utils/requestHandler";
import { cache } from "react";
import {
  CreateTemplatePayload,
  WebsiteTemplate,
} from "@/types/website-template.type";

export const fetchAllWebsiteTemplates = cache(async () => {
  return await requestHandler("get", "/website-templates");
});

export const fetchWebsiteTemplateById = async (id: string) => {
  return await requestHandler("get", `/website-templates/${id}`);
};

export const createWebsiteTemplate = async (data: CreateTemplatePayload) => {
  return await requestHandler("post", "/website-templates", data);
};

export const updateWebsiteTemplate = async (
  id: string,
  data: Partial<WebsiteTemplate>,
) => {
  return await requestHandler("patch", `/website-templates/${id}`, data);
};

export const deleteWebsiteTemplate = async (id: string) => {
  return await requestHandler("delete", `/website-templates/${id}`);
};
