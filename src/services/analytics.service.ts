import { AnalyticsResponse } from "@/types/analytics.type";
import { requestHandler } from "@/utils/requestHandler";

export const fetchAnalytics = async (): Promise<AnalyticsResponse> => {
  return await requestHandler("get", "/admin/analytics");
};
