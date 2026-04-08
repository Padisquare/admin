"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product.type";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <Link href={`/products/${product._id}`}>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={product.packshots[0]} alt={product.name} />
              <AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="font-medium">{product.name}</span>
              <span className="text-muted-foreground text-xs">
                Product ID: <strong>{product._id}</strong>
              </span>
            </div>
          </div>
        </Link>
      );
    },
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.unitPrice}</span>
    ),
  },

  {
    accessorKey: "likeCount",
    header: "Total Like",
    cell: ({ row }) => row.original.likeCount,
  },

  {
    accessorKey: "ratingCount",
    header: "Rating count",
    cell: ({ row }) => row.original.ratingCount,
  },

  {
    accessorKey: "seller",
    header: "Seller",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <Link
          href={`/vendors/${product.seller._id}`}
          className="flex items-center gap-2 hover:underline"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {product.seller.firstName.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-medium">{product.seller.firstName}</span>
            <span className="text-muted-foreground text-xs">
              {product.seller.email}
            </span>
          </div>
        </Link>
      );
    },
  },

  {
    accessorKey: "stockStatus",
    header: "Status",
    cell: ({ row }) => (
      <span className={cn("font-semibold capitalize")}>
        {/* {row.original.stockStatus.replace("_", " ")} */}
        status
      </span>
    ),
  },
];
