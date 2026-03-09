import React, { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { satoshi } from "@/fonts";
import { Loader2 } from "lucide-react";

type TCustomButton = HTMLAttributes<HTMLButtonElement> & {
  label?: string;
  type: "button" | "reset" | "submit";
  className?: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  onClick?: () => void;
  attributes?: React.ComponentProps<typeof Button>;
  isLoading?: boolean;
  disabled?: boolean;
};

const buttonClass = cva(
  `rounded-full flex items-center justify-center gap-3 animate cursor-pointer text-[17px] font-[900] ${satoshi.className}`,
  {
    variants: {
      variant: {
        primary:
          "bg-brand-main hover:bg-brand-main/90 text-white hover:border-2 hover:border-brand-main/70 hover:ring-4 hover:ring-offset-0 hover:ring-offset-brand-main/40 hover:ring-brand-main/20",
        white:
          "bg-white hover:bg-gray-100 text-gray-600 border-[1px] border-gray-300 hover:border-2 hover:border-gray-300/70 hover:ring-4 hover:ring-offset-0 hover:ring-offset-gray-300/40 hover:ring-gray-300/20",
        red: "bg-color-18 hover:bg-color-18/70 text-white border-[1px] border-color-18 hover:border-2 hover:border-color-18/70 hover:ring-4 hover:ring-offset-0 hover:ring-offset-color-18/40 hover:ring-color-18/20",
        black:
          "bg-black hover:bg-gray-900 text-white border-[1px] border-black hover:border-2 hover:border-gray-900 hover:ring-4 hover:ring-offset-0 hover:ring-offset-gray-300/40 hover:ring-gray-300/20",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

const CustomButton = ({
  label,
  type,
  variant,
  className,
  leftIcon,
  rightIcon,
  onClick,
  isLoading,
  disabled,
  ...attributes
}: TCustomButton & VariantProps<typeof buttonClass>) => {
  return (
    <Button
      type={type}
      className={cn(
        buttonClass({
          variant,
          className,
        })
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...attributes}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {leftIcon}
          {label}
          {rightIcon}
        </>
      )}
    </Button>
  );
};

export default CustomButton;
