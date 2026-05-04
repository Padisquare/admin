import { ReelFilters } from "@/types/reels.type";
import { requestHandler } from "@/utils/requestHandler";

export const fetchAllReels = (filters: ReelFilters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, String(value));
  });
  return requestHandler("get", `/reels?${params.toString()}`);
};

export const fetchReelById = (id: string) => {
  return requestHandler("get", `/reels/${id}`);
};

export const DeleteReel = (id: string) => {
  return requestHandler("delete", `/reels/${id}`);
};
