"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchEscrowPercentageRequest,
  updateEscrowPercentageRequest,
} from "@/services/settings.service";
import { toast } from "sonner";
import { EscrowSettingsResponse } from "@/types/settings.type";

export const useEscrowPercentage = () => {
  return useQuery<EscrowSettingsResponse>({
    queryKey: ["settings", "escrow-percentage"],
    queryFn: fetchEscrowPercentageRequest,
  });
};

export const useUpdateEscrowPercentage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEscrowPercentageRequest,
    onSuccess: (response: EscrowSettingsResponse) => {
      toast.success(response?.message);
      queryClient.invalidateQueries({
        queryKey: ["settings", "escrow-percentage"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update escrow percentage");
    },
  });
};
