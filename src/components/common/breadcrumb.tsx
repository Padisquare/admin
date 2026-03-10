"use client";
import { satoshi } from "@/fonts";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
const Breadcrumb = ({
  className,
  section,
}: {
  className?: string;
  section: string | React.ReactNode;
}) => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <div
      className={cn(
        "h-[58px] py-2 max-w-fit w-full flex gap-3 items-center relative overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        className
      )}
    >
      <button
        className={cn(
          "flex items-center gap-2 cursor-pointer h-[44px] w-fit text-black",
          satoshi.className
        )}
        type="button"
        onClick={goBack}
      >
        <ArrowLeft className="w-[25px] h-[25px]" />
        <span className="text-[17px] leading-5 font-[700] whitespace-nowrap">
          Go back
        </span>
      </button>

      <span
        className={cn(
          "text-sm leading-5 font-[700] text-color-8 underline whitespace-nowrap underline-offset-3",
          satoshi.className
        )}
      >
        {section}
      </span>
    </div>
  );
};

export default Breadcrumb;
