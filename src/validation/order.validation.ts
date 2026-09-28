import z from "zod";

export const finalizePayoutSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  otp: z.string().regex(/^\d{6}$/, "Enter the 6-digit OTP"),
});

export type FinalizePayoutFormData = z.infer<typeof finalizePayoutSchema>;
