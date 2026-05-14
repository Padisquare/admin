import { useQuery } from "@tanstack/react-query";
import { WaitlistApiResponse, WaitlistFilters } from "@/types/waitlist.type";
import {
  fetchAllWaitlistRequests,
  fetchWaitlistStats,
} from "@/services/waitlist.service";

export const useWaitlist = (filters: WaitlistFilters = {}) => {
  return useQuery<WaitlistApiResponse>({
    queryKey: ["waitlist", filters],
    queryFn: () => fetchAllWaitlistRequests(filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const useWaitlistStats = () => {
  return useQuery({
    queryKey: ["waitlist-stats"],
    queryFn: fetchWaitlistStats,
    staleTime: 5 * 60 * 1000,
  });
};
