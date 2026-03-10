"use client";
import React, { forwardRef, memo } from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { UseFormRegister } from "react-hook-form";

type CustomTextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  name: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  optional?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
};

const CustomTextArea = forwardRef<HTMLTextAreaElement, CustomTextAreaProps>(
  (
    {
      label,
      name,
      className,
      labelClassName,
      inputClassName,
      value,
      onChange,
      error,
      required,
      register,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn(className)}>
        {label && (
          <Label
            id={name}
            className={cn(
              "font-bold mb-[10px] block text-black text-[15px]",
              labelClassName
            )}
          >
            {label}
            {required && <span>*</span>}
          </Label>
        )}
        <div className="relative h-fit w-full">
          <Textarea
            className={cn(
              "w-full h-[128px] px-4 bg-white animate text-sm tracking-wide  text-black !placeholder-gray-500 selection:bg-brand-main/70 rounded-[6px] border-slate-300 focus:text-black !focus:border-brand-main focus:ring-1 focus:ring-offset-0 !focus:ring-offset-brand-main/40 !focus:ring-brand-main/20 py-3 border border-mid-gray-450 focus:outline-none",
              inputClassName
            )}
            id={name}
            name={name}
            title={name}
            min={0}
            step=".001"
            defaultValue={value}
            onChange={onChange}
            ref={ref}
            {...register?.(name)}
            {...props}
          />
        </div>
        {error && (
          <p className="font-semibold mt-1 text-red-500 text-sm">{error}</p>
        )}
      </div>
    );
  }
);

CustomTextArea.displayName = "CustomTextArea";

export default memo(CustomTextArea);
