import { requestHandler } from "@/utils/requestHandler";
import {
  WaitlistApiResponse,
  WaitlistFilters,
  WaitlistStats,
} from "@/types/waitlist.type";

export const fetchAllWaitlistRequests = (
  filters: WaitlistFilters = {},
): Promise<WaitlistApiResponse> => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.append(key, String(value));
    }
  });
  return requestHandler("get", `/waitlist?${params.toString()}`);
};

export const fetchWaitlistStats = (): Promise<WaitlistStats> => {
  return requestHandler("get", "/waitlist/stats");
};
