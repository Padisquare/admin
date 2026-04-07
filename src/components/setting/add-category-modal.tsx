import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCategorySchema, AddCategoryFormData } from "@/validation/category.validation";
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
  onCreate: (data: AddCategoryFormData) => void;
  isSubmitting: boolean;
}

const AddCategoryModal: React.FC<Props> = ({
  open,
  onClose,
  parentCategories,
  onCreate,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCategoryFormData>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      parentCategoryId: "",
    },
  });
  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
          <div>
            <Input {...register("name")} placeholder="Category Name" />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Textarea {...register("description")} placeholder="Description" />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="parentCategory" className="text-sm font-medium mb-1">
              Parent Category
            </label>
            <select
              {...register("parentCategoryId")}
              className="border rounded px-2 py-1 bg-white"
            >
              <option value="">None</option>
              {parentCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.parentCategoryId && (
              <p className="text-xs text-red-500 mt-1">{errors.parentCategoryId.message}</p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;