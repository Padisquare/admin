"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { ConfirmActionDialog } from "../user/confirmation-dialog";
import EditCategoryModal from "./edit-category-modal";
import { useCategories } from "@/hooks/useCategories";
import { CategoryType } from "@/types/category.type";

interface Props {
  category: CategoryType;
}

const CategoryQuickAction = ({ category }: Props) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { deleteCategory, isDeleting, categories, createCategory } = useCategories();

  const handleDelete = async () => {
    deleteCategory(category._id, {
      onSuccess: () => setDeleteOpen(false),
    });
  };

  return (
    <>
      <div className="flex gap-4">
        <Pencil
          className="size-4 cursor-pointer"
          color="#006B2C"
          onClick={() => setEditOpen(true)}
        />

        <Trash2
          className="size-4 cursor-pointer"
          color="#BA1A1A"
          onClick={() => setDeleteOpen(true)}
        />
      </div>

      <ConfirmActionDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Category"
        description={`Are you sure you want to delete "${category.name}"?`}
        confirmText="Delete"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={handleDelete}
      />

      <EditCategoryModal
        category={category}
        open={editOpen}
        onOpenChange={setEditOpen}
        parentCategories={categories}
      />
    </>
  );
};

export default CategoryQuickAction;
