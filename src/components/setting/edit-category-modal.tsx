"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useCategories } from "@/hooks/useCategories";
import { CategoryType } from "@/types/category.type";
import { Loader2Icon } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: CategoryType;
  parentCategories: { _id: string; name: string }[]; // available parent categories
}

const EditCategoryModal: React.FC<Props> = ({
  open,
  onOpenChange,
  category,
  parentCategories,
}) => {
  type FormState = {
    name: string;
    description: string;
    parentCategoryId: string;
    isActive: boolean;
  };

  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    parentCategoryId: "",
    isActive: category.isActive ?? true,
  });
  const { updateCategory, isUpdating } = useCategories();

  // Prefill form when modal opens or category changes
  useEffect(() => {
    if (category && open) {
      setForm({
        name: category.name || "",
        description: category.description || "",
        parentCategoryId:
          typeof category.parentCategory === "object"
            ? category.parentCategory?._id ?? ""
            : category.parentCategory ?? "",
        isActive: category.isActive ?? true,
      });
    }
  }, [category, open]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      name: form.name,
      description: form.description,
      parentCategoryId: form.parentCategoryId || null, // API usually prefers null or empty string for root
      isActive: form.isActive,
    };
    updateCategory(
      { id: category._id, data: payload },
      {
        onSuccess: () => onOpenChange(false),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="name"
            placeholder="Category Name"
            value={form.name}
            onChange={handleChange}
          />
          <Textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          {/* Parent Category Select */}
          <div className="flex flex-col">
            <label
              htmlFor="parentCategory"
              className="text-sm font-medium mb-1"
            >
              Parent Category
            </label>
            <select
              id="parentCategory"
              name="parentCategoryId"
              value={form.parentCategoryId}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            >
              <option value="">Parent Category (None)</option>
              {parentCategories
                .filter((cat) => cat._id !== category._id)
                .map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Status Select */}
          <div className="flex flex-col">
            <label htmlFor="status" className="text-sm font-medium mb-1">
              Status
            </label>
            <select
              id="status"
              name="isActive"
              value={form.isActive.toString()}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isUpdating}>
            {isUpdating ? <Loader2Icon className="animate-spin" /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
