"use client";
import React, { HTMLInputTypeAttribute, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { UseFormRegister } from "react-hook-form";

type TCustomInput = {
  label?: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  name: string;
  icon?: React.ReactElement;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  error?: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CustomInput = ({
  label,
  placeholder,
  type,
  name,
  icon,
  className,
  labelClassName,
  inputClassName,
  error,
  register,
  required,
  ...properties
}: TCustomInput) => {
  const [show, setShow] = useState(false);
  const handleToggleShow = () => setShow((prev) => !prev);

  return (
    <div className={className}>
      {label && (
        <Label
          id={name}
          className={cn(
            "font-bold mb-[10px] block text-black text-[15px]",
            labelClassName,
          )}
        >
          {label}
          {required && <span>*</span>}
        </Label>
      )}
      <div className="relative">
        <div className="absolute top-4.5 left-3.5 text-base text-gray-500">
          {icon}
        </div>
        <Input
          type={type === "password" ? (show ? "text" : type) : type}
          id={name}
          name={name}
          placeholder={placeholder}
          {...register?.(name)}
          className={cn(
            icon ? "pl-9" : "pl-auto",
            `animate text-base tracking-wide bg-white text-black !placeholder-gray-500 selection:bg-brand-main/70 rounded-[6px] h-[50px] border-slate-300 focus:text-black !focus:border-brand-main focus:ring-1 focus:ring-offset-0 !focus:ring-offset-brand-main/40 !focus:ring-brand-main/20`,
            inputClassName,
          )}
          {...properties}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={handleToggleShow}
            className="absolute right-2 top-4 h-[18px] w-[43px] bg-password-toggle-btn text-password-toggle-text text-[10px] font-medium px-1 rounded-[5px] capitalize cursor-pointer"
          >
            {show ? "hide" : "show"}
          </button>
        )}
      </div>
      {error && (
        <p className="font-semibold mt-1 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default CustomInput;
