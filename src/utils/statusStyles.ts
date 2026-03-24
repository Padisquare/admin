import { RequestStatus } from "@/app/(dashboard)/product-requests/page";

export const requestStatusStyles: Record<RequestStatus, string> = {
  pending: "bg-amber-100 text-amber-700 hover:bg-amber-100 border-transparent",
  "in-progress":
    "bg-blue-100 text-blue-700 hover:bg-blue-100 border-transparent",
  fulfilled:
    "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-transparent",
  canceled: "bg-red-100 text-red-700 hover:bg-red-100 border-transparent",
};
export const getStatusLabel = (status: RequestStatus) => {
  return status.replace("-", " ");
};
