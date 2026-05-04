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

  const handleTextChange = (
    field: "name" | "description" | "state" | "lga",
    value: string,
  ) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleUnitPriceChange = (value: string) => {
    const n = Number(value);
    setFormData((prev) =>
      prev ? { ...prev, unitPrice: Number.isFinite(n) ? n : prev.unitPrice } : prev,
    );
  };

  const handleConditionChange = (value: string) => {
    if (value !== "brand_new" && value !== "used") return;
    setFormData((prev) => (prev ? { ...prev, condition: value } : prev));
  };

  const parentCategoryName =
    formData.category?.parentCategory &&
    typeof formData.category.parentCategory === "object"
      ? formData.category.parentCategory.name
      : "";

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
                onChange={(e) => handleTextChange("name", e.target.value)}
              />
            </div>

            {/* Price */}
            <div className="grid gap-2">
              <Label>Price</Label>
              <Input
                type="number"
                value={formData.unitPrice}
                onChange={(e) => handleUnitPriceChange(e.target.value)}
              />
            </div>

            {/* State  */}
            <div className="grid gap-2">
              <Label>State</Label>
              <Input
                value={formData.state}
                onChange={(e) => handleTextChange("state", e.target.value)}
              />
            </div>

            {/* LGA  */}
            <div className="grid gap-2">
              <Label>LGA</Label>
              <Input
                value={formData.lga}
                onChange={(e) => handleTextChange("lga", e.target.value)}
              />
            </div>

            {/* Category (from API object) */}
            <div className="grid gap-2">
              <Label>Category</Label>
              <Input value={formData.category?.name ?? ""} readOnly disabled />
            </div>
            {parentCategoryName ? (
              <div className="grid gap-2">
                <Label>Parent category</Label>
                <Input value={parentCategoryName} readOnly disabled />
              </div>
            ) : null}

            {/* Descriptioon */}
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleTextChange("description", e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Condition</Label>
              <Input
                value={formData.condition}
                onChange={(e) => handleConditionChange(e.target.value)}
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
