import { requestHandler } from "@/utils/requestHandler";
import { BuyerProtectionPricing } from "@/types/settings.type";

export const fetchBuyerProtectionPricingRequest = async () => {
  return await requestHandler("get", "/admin/settings/buyer-protection-fee");
};

export const updateBuyerProtectionPricingRequest = async (
  data: BuyerProtectionPricing,
) => {
  return await requestHandler(
    "put",
    "/admin/settings/buyer-protection-fee",
    data,
  );
};
