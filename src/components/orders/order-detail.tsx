"use client";

import { RefreshCw } from "lucide-react";
import BackButton from "@/components/common/back-button";
import CustomLoader from "@/components/common/custom-loader";
import { Button } from "@/components/ui/button";
import { useOrder, useRetryShipment, useSyncTracking } from "@/hooks/useOrders";
import { formatNaira, humanize } from "@/lib/orders";
import { OrderParty } from "@/types/order.type";
import { formatDateDashTime } from "@/utils/formatDate";
import OrderStatusBadge from "./order-status-badge";
import ShipmentSimulator from "./shipment-simulator";

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between gap-4 text-sm">
    <dt className="text-gray-500">{label}</dt>
    <dd className="font-medium text-right">{value}</dd>
  </div>
);

const Party = ({ title, party }: { title: string; party?: OrderParty }) => (
  <div className="rounded-2xl border p-5 space-y-2">
    <h2 className="text-sm font-semibold">{title}</h2>
    {party ? (
      <dl className="space-y-2">
        <Row label="Name" value={party.name} />
        <Row label="Username" value={party.username ? `@${party.username}` : "—"} />
        <Row label="Phone" value={party.phoneNumber ?? "—"} />
      </dl>
    ) : (
      <p className="text-sm text-gray-500">Not available.</p>
    )}
  </div>
);

const OrderDetail = ({ orderId }: { orderId: string }) => {
  const { data, isPending, isError } = useOrder(orderId);
  const sync = useSyncTracking();
  const retry = useRetryShipment();

  if (isPending) return <CustomLoader />;

  const order = data?.entity?.order;
  const webhookLogs = data?.entity?.webhookLogs ?? [];
  if (isError || !order) {
    return (
      <div className="bg-white p-10 text-center space-y-4 rounded-lg border">
        <h2 className="text-xl font-semibold">Order not found</h2>
        <BackButton href="/orders" label="Back to Orders" className="justify-center" />
      </div>
    );
  }

  return (
    <section className="bg-white p-6 space-y-6 rounded-lg border">
      <BackButton href="/orders" label="Back to Orders" />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Order</h1>
          <p className="font-mono text-xs text-muted-foreground">{order._id}</p>
          <div className="flex items-center gap-2">
            <OrderStatusBadge status={order.status} />
            <span className="text-sm text-gray-500 capitalize">
              Escrow: {humanize(order.escrowStatus)}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {order.shipbubbleOrderId && (
            <Button
              variant="outline"
              size="sm"
              disabled={sync.isPending}
              onClick={() => sync.mutate(order._id)}
            >
              <RefreshCw className={sync.isPending ? "animate-spin" : ""} />
              Sync tracking
            </Button>
          )}
          {order.status === "paid" && (
            <Button
              variant="outline"
              size="sm"
              disabled={retry.isPending}
              onClick={() => retry.mutate(order._id)}
            >
              {retry.isPending ? "Retrying…" : "Retry shipment"}
            </Button>
          )}
        </div>
      </div>

      <ShipmentSimulator order={order} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Party title="Buyer" party={order.buyer} />
        <Party title="Seller" party={order.seller} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border p-5 space-y-2">
          <h2 className="text-sm font-semibold">Payment</h2>
          <dl className="space-y-2">
            <Row label="Subtotal" value={formatNaira(order.subtotal)} />
            <Row label="Delivery fee" value={formatNaira(order.deliveryFee)} />
            <Row label="Total" value={formatNaira(order.total)} />
            <Row label="Payment status" value={humanize(order.paymentStatus)} />
            <Row label="Platform fee" value={formatNaira(order.platformFeeAmount)} />
            <Row label="Vendor payout" value={formatNaira(order.vendorPayoutAmount)} />
            {order.refundedAmount !== undefined && (
              <Row label="Refunded" value={formatNaira(order.refundedAmount)} />
            )}
          </dl>
        </div>

        <div className="rounded-2xl border p-5 space-y-2">
          <h2 className="text-sm font-semibold">Shipment</h2>
          <dl className="space-y-2">
            <Row label="Courier" value={order.selectedCourier?.courierId ?? "—"} />
            <Row label="ShipBubble ID" value={order.shipbubbleOrderId ?? "—"} />
            <Row
              label="Tracking"
              value={
                order.trackingUrl ? (
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Open tracking
                  </a>
                ) : (
                  "—"
                )
              }
            />
          </dl>
        </div>
      </div>

      <div className="rounded-2xl border p-5 space-y-3">
        <h2 className="text-sm font-semibold">Status history</h2>
        {order.statusHistory?.length ? (
          <ol className="space-y-2">
            {order.statusHistory.map((entry, index) => (
              <li key={`${entry.status}-${index}`} className="flex items-center justify-between text-sm">
                <OrderStatusBadge status={entry.status} />
                <span className="text-gray-500">
                  {formatDateDashTime(entry.at)} · {entry.source}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-gray-500">No history recorded.</p>
        )}
      </div>

      {order.shipbubbleOrderId && (
        <div className="rounded-2xl border p-5 space-y-3">
          <h2 className="text-sm font-semibold">ShipBubble webhook log</h2>
          {webhookLogs.length ? (
            <ul className="space-y-2">
              {webhookLogs.map((log) => (
                <li
                  key={log._id}
                  className="flex flex-wrap items-center justify-between gap-2 text-sm"
                >
                  <span className="font-medium">
                    {log.eventType}
                    {log.status ? ` · ${humanize(log.status)}` : ""}
                  </span>
                  <span className="text-gray-500">
                    {log.receivedAt ? formatDateDashTime(log.receivedAt) : "—"}
                    {log.duplicate ? " · duplicate" : ""}
                    {log.error ? ` · error: ${log.error}` : ""}
                    {!log.processed && !log.error ? " · unprocessed" : ""}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No webhooks received yet.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default OrderDetail;
