import React, { useState } from "react";
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
}

const AddTemplateModal: React.FC<Props> = ({ open, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tag: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Template</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input name="title" placeholder="Title" onChange={handleChange} />
          <Textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <Input name="tag" placeholder="Tag" onChange={handleChange} />
          <Input name="image" placeholder="Image URL" onChange={handleChange} />
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTemplateModal;
