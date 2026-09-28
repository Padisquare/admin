export interface ApiResponse<T> {
  title: string;
  message: string;
  entity: T;
}

export type EscrowStatus =
  | "held"
  | "awaiting_delivery_confirmation"
  | "release_pending_otp"
  | "release_failed"
  | "released"
  | "refund_pending"
  | "refunded"
  | "refund_failed";

export type OrderStatus =
  | "draft"
  | "pending_payment"
  | "paid"
  | "shipment_pending"
  | "shipment_confirmed"
  | "picked_up"
  | "in_transit"
  | "completed"
  | "cancelled"
  | "failed";

export type OrderType = {
  _id: string;
  status: OrderStatus;
  escrowStatus?: EscrowStatus;
  subtotal: number;
  total?: number;
  platformFeeAmount?: number;
  vendorPayoutAmount?: number;
  payoutTransferCode?: string;
  updatedAt: string;
};

export type FinalizePayoutResponse = ApiResponse<OrderType>;
