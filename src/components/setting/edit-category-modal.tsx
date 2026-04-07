import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, CategoryFormData } from "@/validation/category.validation";
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
  parentCategories: { _id: string; name: string }[];
}

const EditCategoryModal: React.FC<Props> = ({
  open,
  onOpenChange,
  category,
  parentCategories,
}) => {
  const { updateCategory, isUpdating } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (category && open) {
      reset({
        name: category.name || "",
        description: category.description || "",
        parentCategoryId:
          typeof category.parentCategory === "object"
            ? category.parentCategory?._id ?? ""
            : (category.parentCategory as string) ?? "",
        isActive: category.isActive ?? true,
      });
    }
  }, [category, open, reset]);

  const onFormSubmit = (data: CategoryFormData) => {
    const payload = {
      ...data,
      name: data.name.trim(),
      description: data.description || "",
      parentCategoryId: data.parentCategoryId || null || "",
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

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <Input {...register("name")} placeholder="Category Name" />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Textarea {...register("description")} placeholder="Description" />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Parent Category</label>
            <select {...register("parentCategoryId")} className="border rounded px-2 py-1 bg-white">
              <option value="">Parent Category (None)</option>
              {parentCategories
                .filter((cat) => cat._id !== category._id)
                .map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
            {errors.parentCategoryId && (
              <p className="text-xs text-red-500 mt-1">{errors.parentCategoryId.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Status</label>
            <select
              {...register("isActive", { setValueAs: (v) => v === "true" })}
              className="border rounded px-2 py-1 bg-white"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            {errors.isActive && (
              <p className="text-xs text-red-500 mt-1">{errors.isActive.message}</p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? <Loader2Icon className="animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;