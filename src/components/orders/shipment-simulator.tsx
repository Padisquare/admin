"use client";

import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSimulateShipment } from "@/hooks/useOrders";
import { isStagingEnv, SHIPMENT_STEPS } from "@/lib/orders";
import { OrderType } from "@/types/order.type";

const ShipmentSimulator = ({ order }: { order: OrderType }) => {
  const { mutate, isPending, variables } = useSimulateShipment();

  if (!isStagingEnv) return null;

  return (
    <div className="rounded-2xl border border-dashed border-amber-400 bg-amber-50 p-5 space-y-3">
      <h2 className="text-sm font-semibold text-amber-900 flex items-center gap-2">
        <Truck size={16} />
        Shipment simulator (staging only)
      </h2>

      {!order.shipbubbleOrderId ? (
        <p className="text-sm text-amber-800">
          This order has no ShipBubble shipment yet. It needs to be paid and
          have its shipment created first.
        </p>
      ) : (
        <>
          <p className="text-sm text-amber-800">
            Asks ShipBubble to fire a webhook for{" "}
            <code>{order.shipbubbleOrderId}</code>. The order updates a moment
            after it arrives. Delivering it sends the buyer their confirmation
            code.
          </p>
          <div className="flex flex-wrap gap-2">
            {SHIPMENT_STEPS.map((step) => (
              <Button
                key={step.statusCode}
                size="sm"
                variant="outline"
                disabled={isPending}
                onClick={() =>
                  mutate({ orderId: order._id, statusCode: step.statusCode })
                }
              >
                {isPending && variables?.statusCode === step.statusCode
                  ? "Sending…"
                  : step.label}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShipmentSimulator;
