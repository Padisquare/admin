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
  | "ready_for_pickup"
  | "shipment_pending"
  | "shipment_confirmed"
  | "picked_up"
  | "in_transit"
  | "completed"
  | "cancelled"
  | "failed";

export type PaymentStatus = "unpaid" | "paid" | "refunded" | string;

export type OrderParty = {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  image?: string;
  verified?: boolean;
  phoneNumber?: string;
};

export type SelectedCourier = {
  courierId: string;
  courierName?: string;
  serviceCode: string;
  total: number;
};

/** delivery: a courier is booked. pickup: the buyer collects from the seller. */
export type FulfilmentMethod = "delivery" | "pickup";

/** The seller's address on a pickup order. Street address and contact only once the order is paid. */
export type PickupAddress = {
  state: string;
  lga: string;
  city?: string;
  isComplete: boolean;
  address?: string;
  contactName?: string;
  contactPhone?: string;
};

export type OrderStatusHistoryEntry = {
  status: OrderStatus;
  at: string;
  source: string;
};

export type OrderType = {
  _id: string;
  status: OrderStatus;
  escrowStatus?: EscrowStatus;
  buyer?: OrderParty;
  seller?: OrderParty;
  fulfilmentMethod: FulfilmentMethod;
  pickupAddress?: PickupAddress;
  // total = subtotal + deliveryFee + buyerProtectionFee
  subtotal: number;
  deliveryFee?: number;
  buyerProtectionFee: number;
  total?: number;
  platformFeeAmount?: number;
  vendorPayoutAmount?: number;
  payoutTransferCode?: string;
  paymentStatus?: PaymentStatus;
  selectedCourier?: SelectedCourier;
  shipbubbleOrderId?: string;
  trackingUrl?: string;
  statusHistory?: OrderStatusHistoryEntry[];
  cancelledAt?: string;
  refundReference?: string;
  refundedAmount?: number;
  payoutFailureReason?: string;
  deliveryConfirmedAt?: string;
  pickupCodeAttempts?: number;
  createdAt?: string;
  updatedAt: string;
};

export type OrderFilters = {
  page?: number;
  limit?: number;
  search?: string;
  status?: OrderStatus;
  escrowStatus?: EscrowStatus;
};

export type OrdersPage = {
  items: OrderType[];
  total: number;
  page: number;
  pages: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type ShipbubbleWebhookLog = {
  _id: string;
  eventType: string;
  status?: string;
  receivedAt?: string;
  processed?: boolean;
  duplicate?: boolean;
  error?: string;
};

export type AdminOrderDetail = {
  order: OrderType;
  webhookLogs: ShipbubbleWebhookLog[];
};

export type FinalizePayoutResponse = ApiResponse<OrderType>;
export type OrderResponse = ApiResponse<OrderType>;
export type OrdersResponse = ApiResponse<OrdersPage>;
export type AdminOrderDetailResponse = ApiResponse<AdminOrderDetail>;

/** Statuses the backend accepts for POST /admin/orders/:id/simulate-shipment (sandbox only). */
export type SimulatedShipmentStatus =
  | "pending"
  | "confirmed"
  | "picked_up"
  | "in_transit"
  | "completed"
  | "cancelled";

export type SimulateShipmentPayload = {
  orderId: string;
  statusCode: SimulatedShipmentStatus;
};
