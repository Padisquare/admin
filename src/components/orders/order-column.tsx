"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { OrderType } from "@/types/order.type";
import { formatNaira, humanize } from "@/lib/orders";
import { formatOnlyDate } from "@/utils/formatDate";
import OrderStatusBadge from "./order-status-badge";

export const orderTableColumns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => (
      <Link
        href={`/orders/${row.original._id}`}
        className="font-mono text-xs text-blue-600 hover:underline"
      >
        {row.original._id}
      </Link>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <OrderStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "escrowStatus",
    header: "Escrow",
    cell: ({ row }) => (
      <span className="capitalize text-gray-600">
        {humanize(row.original.escrowStatus)}
      </span>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => (
      <span className="text-gray-600">
        {formatNaira(row.original.total ?? row.original.subtotal)}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => (
      <span className="text-gray-600">
        {row.original.updatedAt ? formatOnlyDate(row.original.updatedAt) : "—"}
      </span>
    ),
  },
];
