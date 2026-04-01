"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { ConfirmActionDialog } from "../user/confirmation-dialog";
import { Category } from "./category-column";
import EditCategoryModal from "./edit-category-modal";

interface Props {
  category: Category;
}

const CategoryQuickAction = ({ category }: Props) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      setDeleteOpen(false);
    } finally {
      setIsLoading(false);
    }
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
        isLoading={isLoading}
        onConfirm={handleDelete}
      />

      <EditCategoryModal
        category={category}
        open={editOpen}
        onOpenChange={setEditOpen}
        parentCategories={["Electronics", "Cosmetics"]}
      />
    </>
  );
};

export default CategoryQuickAction;
