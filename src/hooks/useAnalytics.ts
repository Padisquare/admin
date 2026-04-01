"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchAnalytics } from "@/services/analytics.service";

export const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
    staleTime: 1000 * 60 * 5,
  });
};
