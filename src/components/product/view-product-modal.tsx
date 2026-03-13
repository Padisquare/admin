"use client";

import React from "react";
import { Product } from "./columns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ViewProductModal = ({ product, open, onClose }: Props) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          {/* Product Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={product.image} alt={product.name} />
              <AvatarFallback>{product.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="text-lg font-semibold">{product.name}</span>
              <span className="text-sm text-muted-foreground">
                Product ID: {product.id}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground">Price</span>
              <span className="font-medium">{product.price}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-muted-foreground">Total Sold</span>
              <span className="font-medium">{product.totalSold}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-muted-foreground">Quantity In Stock</span>
              <span className="font-medium">{product.quantityInStock}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-muted-foreground">Stock Status</span>
              <Badge variant="secondary">{product.stockStatus}</Badge>
            </div>
          </div>

          {/* Vendor Info */}
          <div className="border-t pt-4">
            <p className="text-sm font-semibold mb-2">Vendor</p>

            <div className="flex flex-col text-sm">
              <span>{product.businessName}</span>
              <span className="text-muted-foreground">
                {product.ownerEmail}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProductModal;
