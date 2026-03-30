"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { ConfirmActionDialog } from "../user/confirmation-dialog";
import { Admin } from "./admin-column";
import EditAdminDialog from "./edit-admin-dialog";

interface Props {
  admin: Admin;
}

const QuickAction = ({ admin }: Props) => {
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

  const handleEditSave = async (updatedAdmin: Admin) => {
    console.log("Updated:", updatedAdmin);
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
        title="Delete Admin"
        description={`Are you sure you want to delete ${admin.name}?`}
        confirmText="Delete"
        variant="destructive"
        isLoading={isLoading}
        onConfirm={handleDelete}
      />

      <EditAdminDialog
        admin={admin}
        onSave={handleEditSave}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
};

export default QuickAction;
