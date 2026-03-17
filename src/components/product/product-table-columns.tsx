"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export interface Product {
  id: number;
  name: string;
  image: string;
  totalSold: number;
  description?: string;
  price: string;
  quantityInStock: number;
  stockStatus: string;
  businessId: number;
  businessName: string;
  ownerEmail: string;
  condition?: string;
  lga?: string;
  state?: string;
  category?: string;
  subCategory?: string;
}

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <Link
          href={`/products/${product.id}`}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={product.image} alt={product.name} />
              <AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="font-medium">{product.name}</span>
              <span className="text-muted-foreground text-xs">
                Product ID: <strong>{product.id}</strong>
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
      <span className="font-medium">{row.original.price}</span>
    ),
  },

  {
    accessorKey: "totalSold",
    header: "Total Sold",
    cell: ({ row }) => row.original.totalSold,
  },

  {
    accessorKey: "quantityInStock",
    header: "Stock",
    cell: ({ row }) => row.original.quantityInStock,
  },

  {
    accessorKey: "businessName",
    header: "Vendor",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <Link
          href={`/vendors/${product.businessId}`}
          className="flex items-center gap-2 hover:underline"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback>{product.businessName.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-medium">{product.businessName}</span>
            <span className="text-muted-foreground text-xs">
              {product.ownerEmail}
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
        {row.original.stockStatus.replace("_", " ")}
      </span>
    ),
  },
];
