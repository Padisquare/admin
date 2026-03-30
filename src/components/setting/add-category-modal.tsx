import React, { useState } from "react";
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

interface Category {
  name: string;
  description: string;
  noOfSubcategories: number;
  parentCategory: string;
  status: "active" | "in-active";
}

interface Props {
  open: boolean;
  onClose: () => void;
  parentCategories: string[];
  onAddCategory: (category: Category) => void;
}

const AddCategoryModal: React.FC<Props> = ({
  open,
  onClose,
  parentCategories,
  onAddCategory,
}) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    parentCategory: "",
    status: "active" as "active" | "in-active",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newCategory: Category = {
      name: form.name,
      description: form.description,
      parentCategory: form.parentCategory || "None",
      status: form.status,
      noOfSubcategories: 0,
    };

    onAddCategory(newCategory);
    onClose();
    setForm({
      name: "",
      description: "",
      parentCategory: "",
      status: "active",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
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

          {/* Parent Category Native Select */}
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
              {parentCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Native Select */}
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
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
