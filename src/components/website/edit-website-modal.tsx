"use client";

import React, { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface Website {
  id: number;
  title: string;
  url: string;
  template: string;

  ownerName?: string;
  ownerEmail?: string;

  productsCount: number;
  status: string;
}

interface Props {
  website: Website | null;
  open: boolean;
  onClose: () => void;
}

const EditWebsiteModal = ({ website, open, onClose }: Props) => {
  const [formData, setFormData] = useState<Website | null>(website);

  useEffect(() => {
    setFormData(website);
  }, [website]);

  if (!formData) return null;

  const handleChange = (field: keyof Website, value: string | number) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSubmit = () => {
    console.log("Updated website:", formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Website</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] py-4">
          <div className="grid gap-4 py-4">
            {/* Title */}
            <div className="grid gap-2">
              <Label>Website Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            {/* URL */}
            <div className="grid gap-2">
              <Label>Website URL</Label>
              <Input
                value={formData.url}
                onChange={(e) => handleChange("url", e.target.value)}
              />
            </div>

            {/* Template */}
            <div className="grid gap-2">
              <Label>Template</Label>
              <Input
                value={formData.template}
                onChange={(e) => handleChange("template", e.target.value)}
              />
            </div>

            {/* Owner Name */}
            <div className="grid gap-2">
              <Label>Owner Name</Label>
              <Input
                value={formData.ownerName}
                onChange={(e) => handleChange("ownerName", e.target.value)}
              />
            </div>

            {/* Owner Email */}
            <div className="grid gap-2">
              <Label>Owner Email</Label>
              <Input
                value={formData.ownerEmail}
                onChange={(e) => handleChange("ownerEmail", e.target.value)}
              />
            </div>

            {/* Products Count */}
            <div className="grid gap-2">
              <Label>Products Count</Label>
              <Input
                type="number"
                value={formData.productsCount}
                onChange={(e) =>
                  handleChange("productsCount", Number(e.target.value))
                }
              />
            </div>

            {/* Status */}
            <div className="grid gap-2">
              <Label>Status</Label>

              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="archive">Archive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditWebsiteModal;
