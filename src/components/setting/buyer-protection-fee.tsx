"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import {
  buyerProtectionPricingSchema,
  BuyerProtectionPricingFormData,
  BuyerProtectionPricingFormInput,
} from "@/validation/settings.validation";
import {
  useBuyerProtectionPricing,
  useUpdateBuyerProtectionPricing,
} from "@/hooks/useSettings";
import {
  calculateBuyerProtectionFee,
  describeBuyerProtectionPricing,
} from "@/lib/buyer-protection";
import { formatNaira } from "@/lib/orders";
import { BuyerProtectionPricing } from "@/types/settings.type";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatOnlyDate } from "@/utils/formatDate";

const MAX_TIERS = 10;

const fieldClass =
  "flex items-center bg-gray-100 rounded-full px-4 py-3 text-sm focus-within:ring-2 focus-within:ring-green-600/30";
const inputClass = "bg-transparent outline-none w-full text-sm";

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-xs text-red-500 mt-1">{message}</p> : null;

const ScheduleSummary = ({ pricing }: { pricing: BuyerProtectionPricing }) => (
  <dl className="space-y-3">
    {describeBuyerProtectionPricing(pricing).map((tier) => (
      <div key={tier.range}>
        <dt className="text-xs font-semibold text-green-900">{tier.range}</dt>
        <dd className="text-sm text-gray-700">{tier.fee}</dd>
      </div>
    ))}
  </dl>
);

export default function BuyerProtectionFeeSettings() {
  const { data, isPending: isLoading } = useBuyerProtectionPricing();
  const { mutateAsync, isPending: isSubmitting } =
    useUpdateBuyerProtectionPricing();
  const saved = data?.entity;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<
    BuyerProtectionPricingFormInput,
    unknown,
    BuyerProtectionPricingFormData
  >({
    resolver: zodResolver(buyerProtectionPricingSchema),
    defaultValues: { minFee: "", maxFee: "", tiers: [{ upTo: null, rate: "" }] },
  });
  const { fields, insert, remove } = useFieldArray({ control, name: "tiers" });

  useEffect(() => {
    if (saved) {
      reset({ minFee: saved.minFee, maxFee: saved.maxFee, tiers: saved.tiers });
    }
  }, [saved, reset]);

  // What the form currently holds, if it adds up to a valid schedule.
  const draft = buyerProtectionPricingSchema.safeParse(useWatch({ control }));
  const draftPricing = draft.success ? draft.data : null;

  const [sampleAmount, setSampleAmount] = useState("250000");
  const sample = Number(sampleAmount);

  const onSubmit = async (values: BuyerProtectionPricingFormData) => {
    try {
      await mutateAsync(values);
    } catch {
      // The mutation's onError already shows the reason.
    }
  };

  return (
    <div className="p-8 bg-[#f4f7f5]">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Buyer Protection Fee</h1>
        <p className="text-gray-500 mt-2 max-w-2xl">
          The fee a buyer pays on top of an order&apos;s item subtotal. The
          seller is paid the full subtotal. Each rate applies only to the part
          of the subtotal that falls inside its tier, and the fee is charged
          per order, so a cart from two sellers pays it twice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          {isLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold mb-1">Tiers</legend>

                {fields.map((field, index) => {
                  const isLast = index === fields.length - 1;
                  const tierErrors = errors.tiers?.[index];

                  return (
                    <div
                      key={field.id}
                      className="grid grid-cols-[1fr_1fr_auto] items-start gap-3"
                    >
                      <div>
                        <Label
                          htmlFor={`tier-${index}-upTo`}
                          className="text-xs text-gray-500"
                        >
                          Subtotal up to
                        </Label>
                        {isLast ? (
                          <p
                            id={`tier-${index}-upTo`}
                            className="px-4 py-3 text-sm text-gray-500"
                          >
                            No upper limit
                          </p>
                        ) : (
                          <div className={fieldClass}>
                            <span className="text-gray-500 mr-2">₦</span>
                            <input
                              id={`tier-${index}-upTo`}
                              type="number"
                              inputMode="decimal"
                              min={0}
                              step="any"
                              placeholder="700000"
                              className={inputClass}
                              {...register(`tiers.${index}.upTo`)}
                            />
                          </div>
                        )}
                        <FieldError message={tierErrors?.upTo?.message} />
                      </div>

                      <div>
                        <Label
                          htmlFor={`tier-${index}-rate`}
                          className="text-xs text-gray-500"
                        >
                          Rate on that part
                        </Label>
                        <div className={fieldClass}>
                          <input
                            id={`tier-${index}-rate`}
                            type="number"
                            inputMode="decimal"
                            min={0}
                            max={100}
                            step="0.01"
                            placeholder="2.5"
                            className={inputClass}
                            {...register(`tiers.${index}.rate`)}
                          />
                          <span className="text-gray-500 ml-2">%</span>
                        </div>
                        <FieldError message={tierErrors?.rate?.message} />
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="mt-6"
                        disabled={isLast}
                        aria-label={`Remove tier ${index + 1}`}
                        onClick={() => remove(index)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  );
                })}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={fields.length >= MAX_TIERS}
                  // New tiers go above the open-ended one, which stays last.
                  onClick={() =>
                    insert(fields.length - 1, { upTo: "", rate: "" })
                  }
                >
                  <Plus />
                  Add tier
                </Button>
                <FieldError message={errors.tiers?.root?.message} />
              </fieldset>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minFee">Minimum fee</Label>
                  <div className={`${fieldClass} mt-2`}>
                    <span className="text-gray-500 mr-2">₦</span>
                    <input
                      id="minFee"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={1}
                      placeholder="500"
                      className={inputClass}
                      {...register("minFee")}
                    />
                  </div>
                  <FieldError message={errors.minFee?.message} />
                </div>

                <div>
                  <Label htmlFor="maxFee">Fee cap</Label>
                  <div className={`${fieldClass} mt-2`}>
                    <span className="text-gray-500 mr-2">₦</span>
                    <input
                      id="maxFee"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={1}
                      placeholder="75000"
                      className={inputClass}
                      {...register("maxFee")}
                    />
                  </div>
                  <FieldError message={errors.maxFee?.message} />
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Changes apply to orders created after you save. Orders already
                placed keep the fee they were quoted.
              </p>

              <Button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="w-full"
              >
                {isSubmitting ? "Saving…" : "Save Changes"}
              </Button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-[#eef3ef] rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-green-900 mb-4">
              Current Schedule
            </h2>
            {isLoading || !saved ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              <>
                <ScheduleSummary pricing={saved} />
                {saved.updatedAt && (
                  <p className="text-xs text-gray-500 mt-4">
                    Last updated {formatOnlyDate(saved.updatedAt)}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold mb-1">Preview</h2>
            <p className="text-xs text-gray-500 mb-4">
              How the schedule in the form reads, before you save it.
            </p>
            {draftPricing ? (
              <>
                <ScheduleSummary pricing={draftPricing} />

                <div className="mt-5 border-t pt-4">
                  <Label htmlFor="sampleAmount" className="text-xs">
                    Try an order subtotal
                  </Label>
                  <div className={`${fieldClass} mt-2`}>
                    <span className="text-gray-500 mr-2">₦</span>
                    <input
                      id="sampleAmount"
                      type="number"
                      inputMode="decimal"
                      min={0}
                      className={inputClass}
                      value={sampleAmount}
                      onChange={(e) => setSampleAmount(e.target.value)}
                    />
                  </div>
                  <dl className="mt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Buyer Protection fee</dt>
                      <dd className="font-semibold">
                        {formatNaira(
                          calculateBuyerProtectionFee(sample, draftPricing),
                        )}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Seller receives</dt>
                      <dd className="font-semibold">
                        {formatNaira(sample > 0 ? sample : 0)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500">
                Fill in every field to see the preview.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
