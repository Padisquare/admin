import { OrderStatus, SimulatedShipmentStatus } from "@/types/order.type";

export const isStagingEnv = process.env.NEXT_PUBLIC_APP_ENV === "staging";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  draft: "Draft",
  pending_payment: "Pending payment",
  paid: "Paid",
  shipment_pending: "Shipment pending",
  shipment_confirmed: "Shipment confirmed",
  picked_up: "Picked up",
  in_transit: "In transit",
  completed: "Completed",
  cancelled: "Cancelled",
  failed: "Failed",
};

export const ORDER_STATUS_STYLES: Record<OrderStatus, string> = {
  draft: "bg-gray-100 text-gray-700",
  pending_payment: "bg-amber-100 text-amber-800",
  paid: "bg-blue-100 text-blue-800",
  shipment_pending: "bg-blue-100 text-blue-800",
  shipment_confirmed: "bg-indigo-100 text-indigo-800",
  picked_up: "bg-violet-100 text-violet-800",
  in_transit: "bg-violet-100 text-violet-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  failed: "bg-red-100 text-red-800",
};

// Shipment events the sandbox simulator can fire, in the order a shipment moves.
export const SHIPMENT_STEPS: {
  statusCode: SimulatedShipmentStatus;
  label: string;
}[] = [
  { statusCode: "confirmed", label: "Confirmed" },
  { statusCode: "picked_up", label: "Picked up" },
  { statusCode: "in_transit", label: "In transit" },
  { statusCode: "completed", label: "Delivered" },
  { statusCode: "cancelled", label: "Cancelled" },
];

export const formatNaira = (amount?: number) =>
  amount === undefined || amount === null
    ? "—"
    : new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(amount);

export const humanize = (value?: string) =>
  value ? value.replace(/_/g, " ") : "—";
