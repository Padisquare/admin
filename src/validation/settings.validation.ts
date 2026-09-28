import z from "zod";

export const escrowPercentageSchema = z.object({
  escrowPercentage: z.coerce
    .number()
    .int("Must be a whole number")
    .min(1, "Must be at least 1%")
    .max(15, "Must be at most 15%"),
});

// Input: what the form field holds before submit (string from a native input).
export type EscrowPercentageFormInput = z.input<typeof escrowPercentageSchema>;
// Output: what the resolver hands to onSubmit after coercion/validation.
export type EscrowPercentageFormData = z.infer<typeof escrowPercentageSchema>;
