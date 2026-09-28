"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PackageCheck } from "lucide-react";
import {
  finalizePayoutSchema,
  FinalizePayoutFormData,
} from "@/validation/order.validation";
import { useFinalizePayout } from "@/hooks/useOrders";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OrderType } from "@/types/order.type";

export default function FinalizePayoutTool() {
  const { mutateAsync, isPending } = useFinalizePayout();
  const [result, setResult] = useState<OrderType | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FinalizePayoutFormData>({
    resolver: zodResolver(finalizePayoutSchema),
    defaultValues: { orderId: "", otp: "" },
  });

  const onSubmit = async (values: FinalizePayoutFormData) => {
    setResult(null);
    try {
      const response = await mutateAsync(values);
      setResult(response?.entity ?? null);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 bg-[#f4f7f5]">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Finalize Payout</h1>
        <p className="text-gray-500 mt-2 max-w-xl">
          Only needed when a vendor&apos;s escrow release came back from
          Paystack as awaiting a business-phone OTP (the order&apos;s escrow
          status is <code>release_pending_otp</code>). Enter the order ID and
          the OTP Paystack sent to complete the transfer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="orderId">Order ID</Label>
              <Input
                id="orderId"
                placeholder="e.g. 6aa90ab618a55509b4a49829"
                {...register("orderId")}
              />
              {errors.orderId && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.orderId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp">OTP</Label>
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <InputOTP
                    id="otp"
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              {errors.otp && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Finalizing…" : "Finalize Payout"}
            </Button>
          </form>
        </div>

        <div className="bg-[#eef3ef] rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-green-900 mb-4 flex items-center gap-2">
            <PackageCheck size={16} />
            Result
          </h2>
          {result ? (
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Order</dt>
                <dd className="font-medium">{result._id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Escrow Status</dt>
                <dd className="font-medium capitalize">
                  {result.escrowStatus?.replace(/_/g, " ") ?? "—"}
                </dd>
              </div>
              {result.vendorPayoutAmount !== undefined && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Vendor Payout</dt>
                  <dd className="font-medium">{result.vendorPayoutAmount}</dd>
                </div>
              )}
            </dl>
          ) : (
            <p className="text-sm text-gray-500">
              No payout finalized yet in this session.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
