import { requestHandler } from "@/utils/requestHandler";

export const fetchEscrowPercentageRequest = async () => {
  return await requestHandler("get", "/admin/settings/escrow-percentage");
};

export const updateEscrowPercentageRequest = async (data: {
  escrowPercentage: number;
}) => {
  return await requestHandler(
    "put",
    "/admin/settings/escrow-percentage",
    data,
  );
};
