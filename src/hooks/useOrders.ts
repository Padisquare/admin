"use client";

import { useMutation } from "@tanstack/react-query";
import { finalizePayoutRequest } from "@/services/order.service";
import { toast } from "sonner";
import { FinalizePayoutResponse } from "@/types/order.type";

export const useFinalizePayout = () => {
  return useMutation({
    mutationFn: finalizePayoutRequest,
    onSuccess: (response: FinalizePayoutResponse) => {
      toast.success(response?.message);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to finalize payout");
    },
  });
};
