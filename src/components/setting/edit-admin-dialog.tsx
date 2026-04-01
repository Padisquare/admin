"use client";

import React, { useState, useMemo } from "react";
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
import { Admin } from "./admin-column";

interface EditAdminDialogProps {
  admin: Admin;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: Admin) => Promise<void>;
}

const EditAdminDialog = ({
  admin,
  open,
  onOpenChange,
  onSave,
}: EditAdminDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<Admin>(admin);

  // reset form ONLY when dialog opens
  React.useEffect(() => {
    if (open) setFormData(admin);
  }, [open, admin]);

  const handleChange = <K extends keyof Admin>(field: K, value: Admin[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isDisabled = useMemo(() => {
    return !formData.name || !formData.email;
  }, [formData]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await onSave?.(formData);
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Edit Admin</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Name */}
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* Role */}
          <div className="grid gap-2">
            <Label>Role</Label>
            <select
              value={formData.role}
              onChange={(e) =>
                handleChange("role", e.target.value as Admin["role"])
              }
              className="h-10 rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          {/* Status */}
          <div className="grid gap-2">
            <Label>Status</Label>
            <select
              value={formData.status}
              onChange={(e) =>
                handleChange("status", e.target.value as Admin["status"])
              }
              className="h-10 rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={isDisabled || isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAdminDialog;
