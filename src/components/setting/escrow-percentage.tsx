"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Percent } from "lucide-react";
import {
  escrowPercentageSchema,
  EscrowPercentageFormData,
  EscrowPercentageFormInput,
} from "@/validation/settings.validation";
import { useEscrowPercentage, useUpdateEscrowPercentage } from "@/hooks/useSettings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatOnlyDate } from "@/utils/formatDate";

export default function EscrowPercentageSettings() {
  const { data, isPending: isLoading } = useEscrowPercentage();
  const { mutateAsync, isPending: isSubmitting } = useUpdateEscrowPercentage();
  const settings = data?.entity;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EscrowPercentageFormInput, unknown, EscrowPercentageFormData>({
    resolver: zodResolver(escrowPercentageSchema),
    defaultValues: { escrowPercentage: 10 },
  });

  useEffect(() => {
    if (settings) reset({ escrowPercentage: settings.escrowPercentage });
  }, [settings, reset]);

  const onSubmit = async (values: EscrowPercentageFormData) => {
    await mutateAsync(values);
  };

  return (
    <div className="p-8 bg-[#f4f7f5]">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Escrow Percentage</h1>
        <p className="text-gray-500 mt-2 max-w-xl">
          The commission cut deducted from a vendor&apos;s payout before
          escrow funds are released. Must be an integer between 1 and 15.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          {isLoading ? (
            <Skeleton className="h-12 w-full" />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="escrowPercentage">Escrow Percentage</Label>
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
                  <Percent className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
                  <input
                    id="escrowPercentage"
                    type="number"
                    min={1}
                    max={15}
                    step={1}
                    placeholder="10"
                    className="bg-transparent outline-none w-full text-sm"
                    {...register("escrowPercentage")}
                  />
                </div>
                {errors.escrowPercentage && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.escrowPercentage.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Saving…" : "Save Changes"}
              </Button>
            </form>
          )}
        </div>

        <div className="bg-[#eef3ef] rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-green-900 mb-4">
            Current Setting
          </h2>
          {isLoading ? (
            <Skeleton className="h-16 w-full" />
          ) : (
            <div className="space-y-1">
              <p className="text-3xl font-semibold text-green-900">
                {settings?.escrowPercentage ?? "—"}%
              </p>
              {settings?.updatedAt && (
                <p className="text-xs text-gray-500">
                  Last updated {formatOnlyDate(settings.updatedAt)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
