"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { WebsiteTemplate } from "@/types/website-template.type";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { formatOnlyDate } from "@/utils/formatDate";
import { TemplateActions } from "./website-template-actions";

export const websitesTableColumns: ColumnDef<WebsiteTemplate>[] = [
  {
    accessorKey: "name",
    header: "Template",
    cell: ({ row }) => {
      const template = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-20 rounded-md border">
            <AvatarImage
              src={template.image}
              alt={template.name}
              className="object-cover"
            />
            <AvatarFallback className="rounded-md">
              {template.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{template.name}</span>
            <span className="text-muted-foreground text-xs line-clamp-1 max-w-20">
              {template.description}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => (
      <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
        /{row.original.slug}
      </code>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const category = row.original;
      const [isActive, setIsActive] = useState(category.isActive);
      return (
        <Switch
          checked={isActive}
          onCheckedChange={(checked) => {
            setIsActive(checked);
            console.log(
              `${category.name} is now ${checked ? "active" : "in-active"}`,
            );
          }}
        />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      const date = (row.original.createdAt);
      return (
        <span className="text-sm text-muted-foreground">
          {formatOnlyDate(date)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <TemplateActions template={row.original} />,
  },
];