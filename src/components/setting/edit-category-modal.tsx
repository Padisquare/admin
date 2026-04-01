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

import { Category } from "./category-column";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category;
  parentCategories: string[]; // available parent categories
}

const EditCategoryModal: React.FC<Props> = ({
  open,
  onOpenChange,
  category,
  parentCategories,
}) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    parentCategory: "",
    status: "active" as "active" | "in-active",
  });

  // Prefill form when modal opens or category changes
  useEffect(() => {
    if (category) {
      setForm({
        name: category.name,
        description: category.description,
        parentCategory:
          category.parentCategory === "None" ? "" : category.parentCategory,
        status: category.status,
      });
    }
  }, [category]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const updatedCategory: Category = {
      ...category,
      name: form.name,
      description: form.description,
      parentCategory: form.parentCategory || "None",
      status: form.status,
    };

    onOpenChange(false);
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
              name="parentCategory"
              value={form.parentCategory}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            >
              <option value="">None</option>
              {parentCategories
                .filter((cat) => cat !== category.name) // prevent selecting itself as parent
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
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
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            >
              <option value="active">Active</option>
              <option value="in-active">In-active</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
