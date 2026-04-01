"use client";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import AddTemplateModal from "./add-template-modal";
import CustomButton from "../common/custom-button";

interface Template {
  id: number;
  title: string;
  description: string;
  tag: string;
  image: string;
  active?: boolean;
}

const templates: Template[] = [
  {
    id: 1,
    title: "The Nordic Glasshouse",
    description:
      "A minimalist architectural layout featuring high-contrast photography.",
    tag: "PROFESSIONAL",
    image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800",
    active: true,
  },
  {
    id: 2,
    title: "Moss & Marale",
    description: "Deep forest greens and stone textures define this layout.",
    tag: "EDITORIAL",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800",
    active: true,
  },
  {
    id: 3,
    title: "Petal Portfolio",
    description: "An asymmetrical layout with bold color accents.",
    tag: "CREATIVE",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    active: false,
  },
  {
    id: 4,
    title: "The Sunlit Courtyard",
    description: "Warm earthy tones and soft shadows.",
    tag: "RESIDENTIAL",
    image: "https://images.unsplash.com/photo-1507089947367-19c1da9775ae?w=800",
    active: true,
  },
  {
    id: 5,
    title: "Flora & Frost",
    description: "A dreamy atmosphere with frost textures.",
    tag: "ARTISTIC",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800",
    active: true,
  },
];

const getInitials = (text: string) =>
  text
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const TemplateCard: React.FC<{ template: Template }> = ({ template }) => {
  return (
    <div className="transition-transform duration-200 hover:-translate-y-1">
      <div className="rounded-2xl shadow-md overflow-hidden bg-white">
        <div className="relative">
          <Avatar className="h-48 w-full rounded-none">
            <AvatarImage
              src={template.image}
              alt={template.title}
              className="object-cover"
            />
            <AvatarFallback className="rounded-none text-sm">
              {getInitials(template.title)}
            </AvatarFallback>
          </Avatar>

          <span className="absolute top-3 right-3 bg-white/80 backdrop-blur px-3 py-1 text-xs font-semibold rounded-full">
            {template.tag}
          </span>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{template.title}</h3>
            <Switch defaultChecked={template.active} />
          </div>

          <p className="text-sm text-gray-500">{template.description}</p>

          <div className="flex justify-end">
            <Button variant="secondary" size="sm">
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateGallery: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-end mb-6">
        <CustomButton
          variant={"primary"}
          label="+ Add Template"
          type="button"
          onClick={() => setOpen(true)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t) => (
          <TemplateCard key={t.id} template={t} />
        ))}

        <button
          onClick={() => setOpen(true)}
          className="border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-gray-500 cursor-pointer hover:bg-gray-50 transition"
        >
          <Plus className="mb-2" />
          <p className="font-medium">Create New</p>
          <span className="text-xs">Start from scratch</span>
        </button>
      </div>
      <AddTemplateModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default TemplateGallery;
