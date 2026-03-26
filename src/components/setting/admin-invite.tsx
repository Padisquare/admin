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

interface InviteForm {
  name: string;
  email: string;
  role: "super_admin" | "admin" | "moderator";
}

const AdminInvite = () => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<InviteForm>({
    name: "",
    email: "",
    role: "admin",
  });

  const handleChange = (field: keyof InviteForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Inviting admin:", formData);

    setOpen(false);

    setFormData({
      name: "",
      email: "",
      role: "admin",
    });
  };

  const handleClose = () => {
    setOpen(false);

    // optional reset
    setFormData({
      name: "",
      email: "",
      role: "admin",
    });
  };

  const isDisabled = !formData.name || !formData.email;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CustomButton label="Invite Admin" type="button" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Invite Admin</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Name */}
          <div className="grid gap-2">
            <Label>Full Name</Label>
            <Input
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* Role */}
          <div className="grid gap-2">
            <Label>Role</Label>

            <select
              className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={formData.role}
              onChange={(e) =>
                handleChange("role", e.target.value as InviteForm["role"])
              }
            >
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" type="button" onClick={handleClose}>
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={isDisabled}>
            Send Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminInvite;
