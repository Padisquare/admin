import { BuyerProtectionPricing } from "@/types/settings.type";

// Mirrors the backend's calculateBuyerProtectionFee
// (backend/src/modules/platform-settings/utils/buyer-protection-fee.util.ts).
// Only used here to preview a schedule while editing it — the backend is what
// actually charges orders.
export function calculateBuyerProtectionFee(
  amount: number,
  pricing: BuyerProtectionPricing,
): number {
  if (!Number.isFinite(amount) || amount <= 0) return 0;

  const amountKobo = Math.round(amount * 100);
  let lowerKobo = 0;
  let koboBasisPoints = 0;

  for (const tier of pricing.tiers) {
    const upperKobo =
      tier.upTo === null ? Infinity : Math.round(tier.upTo * 100);
    const portionKobo = Math.min(amountKobo, upperKobo) - lowerKobo;
    if (portionKobo <= 0) break;

    koboBasisPoints += portionKobo * Math.round(tier.rate * 100);
    lowerKobo = upperKobo;
  }

  const fee = Math.round(koboBasisPoints / 1_000_000);
  return Math.min(pricing.maxFee, Math.max(pricing.minFee, fee));
}

const naira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

// ₦700,000 → "₦700k", ₦3,000,000 → "₦3M"; anything that isn't round stays in full.
const shortNaira = (amount: number) => {
  if (amount >= 1_000_000 && amount % 100_000 === 0) {
    return `₦${amount / 1_000_000}M`;
  }
  if (amount >= 1_000 && amount % 1_000 === 0) return `₦${amount / 1_000}k`;
  return naira(amount);
};

export type BuyerProtectionTierSummary = { range: string; fee: string };

// The schedule in words, one line per tier, e.g.
// "₦700k – ₦3M" → "₦17,500 + 1.5% on the amount above ₦700k".
export function describeBuyerProtectionPricing(
  pricing: BuyerProtectionPricing,
): BuyerProtectionTierSummary[] {
  let from = 0;
  let baseFee = 0;

  return pricing.tiers.map((tier, index) => {
    const isFirst = index === 0;
    const isLast = tier.upTo === null;

    const range = isFirst
      ? isLast
        ? "Any amount"
        : `Up to ${shortNaira(tier.upTo as number)}`
      : isLast
        ? `Above ${shortNaira(from)}`
        : `${shortNaira(from)} – ${shortNaira(tier.upTo as number)}`;

    const notes = [
      isFirst && pricing.minFee > 0 ? `${naira(pricing.minFee)} min` : null,
      isLast ? `capped at ${naira(pricing.maxFee)}` : null,
    ].filter(Boolean);

    const fee =
      (isFirst
        ? `${tier.rate}%`
        : `${naira(Math.round(baseFee))} + ${tier.rate}% on the amount above ${shortNaira(from)}`) +
      (notes.length ? ` (${notes.join(", ")})` : "");

    if (tier.upTo !== null) {
      baseFee += ((tier.upTo - from) * tier.rate) / 100;
      from = tier.upTo;
    }

    return { range, fee };
  });
}
