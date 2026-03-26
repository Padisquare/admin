"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomButton from "../common/custom-button";

interface PasswordForm {
  adminEmail: string;
  newPassword: string;
  confirmPassword: string;
}

const EditAdminPassword = () => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<PasswordForm>({
    adminEmail: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field: keyof PasswordForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const passwordsMatch =
    formData.newPassword &&
    formData.confirmPassword &&
    formData.newPassword === formData.confirmPassword;

  const isDisabled =
    !formData.adminEmail ||
    !formData.newPassword ||
    !formData.confirmPassword ||
    !passwordsMatch;

  const handleSubmit = () => {
    if (!passwordsMatch) return;

    console.log("Updating password for:", formData.adminEmail);

    setOpen(false);

    setFormData({
      adminEmail: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleClose = () => {
    setOpen(false);

    setFormData({
      adminEmail: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CustomButton label="Rest Admin password" type="button" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Reset Admin Password</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Admin Email */}
          <div className="grid gap-2">
            <Label>Admin Email</Label>
            <Input
              type="email"
              placeholder="admin@example.com"
              value={formData.adminEmail}
              onChange={(e) => handleChange("adminEmail", e.target.value)}
            />
          </div>

          {/* New Password */}
          <div className="grid gap-2">
            <Label>New Password</Label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="grid gap-2">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />

            {/* Validation Message */}
            {formData.confirmPassword && !passwordsMatch && (
              <span className="text-xs text-red-600">
                Passwords do not match
              </span>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" type="button" onClick={handleClose}>
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={isDisabled}>
            Update Password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAdminPassword;
