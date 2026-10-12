import { requestHandler } from "@/utils/requestHandler";
import {
  AdminOrderDetailResponse,
  ApiResponse,
  OrderFilters,
  OrderResponse,
  OrdersResponse,
  SimulateShipmentPayload,
} from "@/types/order.type";

export const finalizePayoutRequest = async ({
  orderId,
  otp,
}: {
  orderId: string;
  otp: string;
}) => {
  return await requestHandler(
    "put",
    `/admin/orders/${orderId}/finalize-payout`,
    { otp },
  );
};

export const fetchOrders = async (filters: OrderFilters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, String(value));
  });
  return (await requestHandler(
    "get",
    `/admin/orders${params.toString() ? `?${params.toString()}` : ""}`,
  )) as OrdersResponse;
};

export const fetchOrder = async (orderId: string) => {
  return (await requestHandler(
    "get",
    `/admin/orders/${orderId}`,
  )) as AdminOrderDetailResponse;
};

export const syncTrackingRequest = async (orderId: string) => {
  return (await requestHandler(
    "post",
    `/admin/orders/${orderId}/sync-tracking`,
    {},
  )) as OrderResponse;
};

export const retryShipmentRequest = async (orderId: string) => {
  return (await requestHandler(
    "post",
    `/admin/orders/${orderId}/retry-shipment`,
    {},
  )) as OrderResponse;
};

// Sandbox only: the API asks ShipBubble to fire the webhook for this order.
export const simulateShipmentRequest = async ({
  orderId,
  statusCode,
}: SimulateShipmentPayload) => {
  return (await requestHandler(
    "post",
    `/admin/orders/${orderId}/simulate-shipment`,
    { statusCode },
  )) as ApiResponse<unknown>;
};
