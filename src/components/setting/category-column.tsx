import { ColumnDef } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch"; // assuming you have a Switch component
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useState } from "react";
import CategoryQuickAction from "./category-quick-action";

export interface Category {
  name: string;
  description: string;
  noOfSubcategories: number;
  parentCategory: string;
  status: "active" | "in-active";
}

export const categoriesTableColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{category.name}</span>
          <span className="text-xs text-muted-foreground">
            {category.noOfSubcategories} subcategories
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.description}
      </span>
    ),
  },

  {
    accessorKey: "parentCategory",
    header: "Parent Category",
    cell: ({ row }) => (
      <Badge className="text-sm font-semibold text-[#3E4A3E] bg-[#EAEFEC]">
        {row.original.parentCategory || "None"}
      </Badge>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const category = row.original;
      const [isActive, setIsActive] = useState(category.status === "active");

      return (
        <Switch
          checked={isActive}
          onCheckedChange={(checked) => {
            setIsActive(checked); // update local state
            console.log(
              `${category.name} is now ${checked ? "active" : "in-active"}`,
            );
          }}
        />
      );
    },
  },

  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const category = row.original;
      return <CategoryQuickAction category={category} />;
    },
  },
];
