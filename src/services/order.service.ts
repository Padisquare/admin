import { requestHandler } from "@/utils/requestHandler";

export const finalizePayoutRequest = async ({
  orderId,
  otp,
}: {
  orderId: string;
  otp: string;
}) => {
  return await requestHandler(
    "put",
    `/admin/orders/${orderId}/finalize-payout`,
    { otp },
  );
};
