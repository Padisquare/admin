"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchOrder,
  fetchOrders,
  finalizePayoutRequest,
  retryShipmentRequest,
  simulateShipmentRequest,
  syncTrackingRequest,
} from "@/services/order.service";
import { toast } from "sonner";
import {
  AdminOrderDetailResponse,
  FinalizePayoutResponse,
  OrderFilters,
  OrdersResponse,
} from "@/types/order.type";

export const useFinalizePayout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: finalizePayoutRequest,
    onSuccess: (response: FinalizePayoutResponse) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(response?.message);
    },
    onError: (error: { message?: string }) => {
      toast.error(error?.message || "Failed to finalize payout");
    },
  });
};

export const useOrders = (filters: OrderFilters = {}) => {
  const { data, isLoading, isFetching, error } = useQuery<OrdersResponse>({
    queryKey: ["orders", "list", filters],
    queryFn: () => fetchOrders(filters),
  });

  const page = data?.entity;
  return {
    orders: page?.items ?? [],
    pagination: {
      total: page?.total ?? 0,
      pages: page?.pages ?? 1,
      page: page?.page ?? 1,
      hasNextPage: page?.hasNextPage,
      hasPrevPage: page?.hasPrevPage,
    },
    isLoading,
    isFetching,
    error,
  };
};

export const useOrder = (orderId: string) => {
  return useQuery<AdminOrderDetailResponse>({
    queryKey: ["orders", "detail", orderId],
    queryFn: () => fetchOrder(orderId),
    enabled: !!orderId,
  });
};

export const useSyncTracking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: syncTrackingRequest,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(response?.message);
    },
    onError: (error: { message?: string }) => {
      toast.error(error?.message || "Failed to sync tracking");
    },
  });
};

export const useRetryShipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: retryShipmentRequest,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(response?.message);
    },
    onError: (error: { message?: string }) => {
      toast.error(error?.message || "Failed to retry shipment");
    },
  });
};

export const useSimulateShipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: simulateShipmentRequest,
    onSuccess: (response) => {
      toast.success(response?.message);
      // ShipBubble calls our webhook asynchronously, so refetch shortly after.
      setTimeout(
        () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
        2500,
      );
    },
    onError: (error: { message?: string }) => {
      toast.error(error?.message || "Failed to simulate shipment update");
    },
  });
};
