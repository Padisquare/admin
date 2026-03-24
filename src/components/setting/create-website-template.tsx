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

interface TemplateForm {
  name: string;
  image: string; // can later become File
  status: "active" | "inactive";
}

const CreateWebsiteTemplate = () => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<TemplateForm>({
    name: "",
    image: "",
    status: "active",
  });

  const handleChange = (field: keyof TemplateForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Creating template:", formData);

    // 🔥 future: API call (multipart/form-data if image is file)

    setOpen(false);

    // reset form
    setFormData({
      name: "",
      image: "",
      status: "active",
    });
  };

  const handleClose = () => {
    setOpen(false);

    setFormData({
      name: "",
      image: "",
      status: "active",
    });
  };

  const isDisabled = !formData.name || !formData.image;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button>Create Template</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Create Website Template</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Name */}
          <div className="grid gap-2">
            <Label>Template Name</Label>
            <Input
              placeholder="E-commerce Template"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Image URL (simple version) */}
          <div className="grid gap-2">
            <Label>Template Image URL</Label>
            <Input
              placeholder="https://example.com/template.png"
              value={formData.image}
              onChange={(e) => handleChange("image", e.target.value)}
            />
          </div>

          {/* Status */}
          <div className="grid gap-2">
            <Label>Status</Label>

            <select
              className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={formData.status}
              onChange={(e) =>
                handleChange("status", e.target.value as TemplateForm["status"])
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" type="button" onClick={handleClose}>
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={isDisabled}>
            Create Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWebsiteTemplate;
