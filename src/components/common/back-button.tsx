"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  href?: string;
  label?: string;
  className?: string;
};

const BackButton = ({
  href,
  label = "Back to Home",
  className,
}: BackButtonProps) => {
  const router = useRouter();

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "text-color-8 flex items-center gap-2 hover:text-brand-main transition-colors",
          className
        )}
      >
        <ArrowLeft className="w-4 h-4" />
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={cn(
        "text-color-8 flex items-center cursor-pointer gap-2 hover:text-brand-main transition-colors",
        className
      )}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  );
};

export default BackButton;
