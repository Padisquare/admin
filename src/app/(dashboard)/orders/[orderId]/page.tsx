import OrderDetail from "@/components/orders/order-detail";

const Page = async ({ params }: { params: Promise<{ orderId: string }> }) => {
  const { orderId } = await params;
  return <OrderDetail orderId={orderId} />;
};

export default Page;
