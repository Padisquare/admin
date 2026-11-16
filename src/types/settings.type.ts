export interface ApiResponse<T> {
  title: string;
  message: string;
  entity: T;
}

export type BuyerProtectionTier = {
  /** Upper bound of the tier in Naira; null on the last, open-ended tier. */
  upTo: number | null;
  /** Percentage charged on the part of the amount inside this tier (2.5 = 2.5%). */
  rate: number;
};

/** The Buyer Protection fee schedule — the fee a buyer pays on top of an order's subtotal. */
export type BuyerProtectionPricing = {
  minFee: number;
  maxFee: number;
  tiers: BuyerProtectionTier[];
};

export type BuyerProtectionPricingSettings = BuyerProtectionPricing & {
  updatedAt?: string;
};

export type BuyerProtectionPricingResponse =
  ApiResponse<BuyerProtectionPricingSettings>;
