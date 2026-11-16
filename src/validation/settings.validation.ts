import z from "zod";

// A blank input must read as "missing", not as 0.
const blankToUndefined = (value: unknown) => (value === "" ? undefined : value);

const tierSchema = z.object({
  // null marks the last, open-ended tier ("no upper limit").
  upTo: z.preprocess(
    blankToUndefined,
    z.coerce
      .number("Enter an amount")
      .positive("Must be more than ₦0")
      .nullable(),
  ),
  rate: z.preprocess(
    blankToUndefined,
    z.coerce
      .number("Enter a percentage")
      .min(0, "Can't be negative")
      .max(100, "Can't be more than 100%")
      .multipleOf(0.01, "Use at most 2 decimal places"),
  ),
});

const wholeNaira = z.preprocess(
  blankToUndefined,
  z.coerce
    .number("Enter an amount")
    .int("Use whole naira")
    .min(0, "Can't be negative"),
);

// Same rules the backend enforces, so a mistake is caught next to the field
// that caused it rather than as a failed save.
export const buyerProtectionPricingSchema = z
  .object({
    minFee: wholeNaira,
    maxFee: wholeNaira,
    tiers: z.array(tierSchema).min(1, "Add at least one tier").max(10),
  })
  .superRefine((pricing, ctx) => {
    if (pricing.maxFee < pricing.minFee) {
      ctx.addIssue({
        code: "custom",
        path: ["maxFee"],
        message: "The cap can't be lower than the minimum fee",
      });
    }

    let previousUpTo = 0;
    pricing.tiers.forEach((tier, index) => {
      const isLast = index === pricing.tiers.length - 1;
      if (isLast) {
        if (tier.upTo !== null) {
          ctx.addIssue({
            code: "custom",
            path: ["tiers", index, "upTo"],
            message: "The last tier can't have an upper limit",
          });
        }
        return;
      }
      if (tier.upTo === null) {
        ctx.addIssue({
          code: "custom",
          path: ["tiers", index, "upTo"],
          message: "Enter an amount",
        });
        return;
      }
      if (tier.upTo <= previousUpTo) {
        ctx.addIssue({
          code: "custom",
          path: ["tiers", index, "upTo"],
          message: "Must be higher than the tier above",
        });
      }
      previousUpTo = tier.upTo;
    });
  });

// Input: what the form fields hold before submit (strings from native inputs).
export type BuyerProtectionPricingFormInput = z.input<
  typeof buyerProtectionPricingSchema
>;
// Output: what the resolver hands to onSubmit after coercion/validation.
export type BuyerProtectionPricingFormData = z.infer<
  typeof buyerProtectionPricingSchema
>;
