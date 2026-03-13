"use client";

import React, { useState, useEffect } from "react";
import { Product } from "./columns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const EditProductModal = ({ product, open, onClose }: Props) => {
  const [formData, setFormData] = useState<Product | null>(product);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  if (!formData) return null;

  const handleChange = (field: keyof Product, value: string | number) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSubmit = () => {
    console.log("Updated product:", formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Product Name */}
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Price */}
          <div className="grid gap-2">
            <Label>Price</Label>
            <Input
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
          </div>

          {/* Quantity */}
          <div className="grid gap-2">
            <Label>Quantity In Stock</Label>
            <Input
              type="number"
              value={formData.quantityInStock}
              onChange={(e) =>
                handleChange("quantityInStock", Number(e.target.value))
              }
            />
          </div>

          {/* Stock Status */}
          <div className="grid gap-2">
            <Label>Stock Status</Label>
            <Input
              value={formData.stockStatus}
              onChange={(e) => handleChange("stockStatus", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
