import React from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type CustomLoader = {
  height?: string;
  width?: string;
  className?: string;
};
const CustomLoader: React.FC<CustomLoader> = ({ height, width, className }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        height ?? "h-full min-h-52",
        width ?? "w-full",
        className
      )}
    >
      <LoaderCircle className="animate-spin h-8 w-8 text-gray-400" />
    </div>
  );
};

export default CustomLoader;
