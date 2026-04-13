"use client";

import React, { useState, useEffect } from "react";

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
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { Product } from "@/types/product.type";
import CategoryList from "./category-list";

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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] py-4">
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
                value={formData.unitPrice}
                onChange={(e) => handleChange("unitPrice", e.target.value)}
              />
            </div>

            {/* State  */}
            <div className="grid gap-2">
              <Label>State</Label>
              <Input
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </div>

            {/* LGA  */}
            <div className="grid gap-2">
              <Label>LGA</Label>
              <Input
                value={formData.lga}
                onChange={(e) => handleChange("lga", e.target.value)}
              />
            </div>

            {/* Category  */}
            <div className="grid gap-2">
              <Label>Category</Label>
              <Input
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
              />
            </div>
            {/* Subcategory  */}
            <div className="grid gap-2">
              <Label>SubCategory</Label>
              <Input
                value={formData.subCategory}
                onChange={(e) => handleChange("subCategory", e.target.value)}
              />
            </div>

            {/* Descriptioon */}
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
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
              <Label>Condition</Label>
              <Input
                value={formData.stockStatus}
                onChange={(e) => handleChange("stockStatus", e.target.value)}
              />
            </div>
            <CategoryList />
          </div>
        </ScrollArea>

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
