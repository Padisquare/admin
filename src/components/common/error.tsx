"use client";

import { TriangleAlert } from "lucide-react";
import React from "react";
import { notFound } from "next/navigation";

const GlobalError = ({
  error,
  resetErrorBoundary,
}: {
  error: Error | { statusCode: number };
  resetErrorBoundary: () => void;
}) => {
  console.log("padisquare error", error);
  if ((error as { statusCode: number })?.statusCode === 404) {
    return notFound();
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
      <TriangleAlert className="w-10 h-10 text-red-500" />
      <h3 className="text-2xl font-semibold text-red-500">
        Oops! Something went wrong{" "}
        {(error as { statusCode: number })?.statusCode?.toString().charAt(0) ===
          "5" && "on the server. Please contact support."}
      </h3>
      <p className="text-gray-600">
        {(error as Error)?.message ||
          "We're having trouble loading this page. Please try again later."}
      </p>
      <button
        onClick={() => {
          resetErrorBoundary();
          window.location.reload();
        }}
        className="px-6 py-2 text-white cursor-pointer bg-brand-main hover:bg-brand-main/90 rounded-full"
      >
        Reload Page
      </button>
    </div>
  );
};

export default GlobalError;
