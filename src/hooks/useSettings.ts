"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchBuyerProtectionPricingRequest,
  updateBuyerProtectionPricingRequest,
} from "@/services/settings.service";
import { toast } from "sonner";
import { BuyerProtectionPricingResponse } from "@/types/settings.type";

const BUYER_PROTECTION_PRICING_KEY = ["settings", "buyer-protection-fee"];

export const useBuyerProtectionPricing = () => {
  return useQuery<BuyerProtectionPricingResponse>({
    queryKey: BUYER_PROTECTION_PRICING_KEY,
    queryFn: fetchBuyerProtectionPricingRequest,
  });
};

export const useUpdateBuyerProtectionPricing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBuyerProtectionPricingRequest,
    onSuccess: (response: BuyerProtectionPricingResponse) => {
      toast.success(response?.message);
      queryClient.invalidateQueries({
        queryKey: BUYER_PROTECTION_PRICING_KEY,
      });
    },
    onError: (error: { message?: string }) => {
      toast.error(
        error?.message || "Failed to update the Buyer Protection fee",
      );
    },
  });
};
