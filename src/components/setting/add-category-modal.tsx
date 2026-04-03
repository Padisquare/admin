import React, { useEffect, useState } from "react";
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

interface Props {
  open: boolean;
  onClose: () => void;
  parentCategories: { _id: string; name: string }[];
  onCreate: (data: { name: string; description: string; parentCategoryId?: string }) => void;
  isSubmitting: boolean;
}

const AddCategoryModal: React.FC<Props> = ({
  open,
  onClose,
  parentCategories,
  onCreate,
  isSubmitting,
}) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    parentCategoryId: "",
  });
  useEffect(() => {
    if (!open) {
      setForm({
        name: "",
        description: "",
        parentCategoryId: "",
      });
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name) return;
    onCreate({
      name: form.name,
      description: form.description,
      ...(form.parentCategoryId && { parentCategoryId: form.parentCategoryId }),
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
              name="parentCategoryId"
              value={form.parentCategoryId}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            >
              <option value="">None</option>
              {parentCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}> {isSubmitting ? "Adding..." : "Add Category"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
