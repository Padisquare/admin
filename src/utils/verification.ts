export const getVerificationBadgeVariant = (
  status?: string,
): "outline" | "destructive" | "secondary" => {
  switch (status) {
    case "approved":
      return "outline";
    case "declined":
    case "expired":
    case "abandoned":
      return "destructive";
    default:
      return "secondary";
  }
};

export const formatVerificationStatus = (status?: string) => {
  if (!status) return "Not started";
  return status.replace(/_/g, " ");
};
