import { ColumnDef } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import CategoryQuickAction from "./category-quick-action";
import { ChevronsDownIcon, ChevronsRightIcon } from "lucide-react";
import { CategoryType } from "@/types/category.type";

export const categoriesTableColumns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => {
      const { name, childCategories } = row.original;
      return (
        <div
          className="flex items-end-safe gap-2"
          style={{ paddingLeft: `${row.depth * 40}px` }}
        >
          {row.getCanExpand() && (
            <button
              type="button"
              onClick={row.getToggleExpandedHandler()}
              className="cursor-pointer"
            >
              {row.getIsExpanded() ? <ChevronsDownIcon size={20} /> : <ChevronsRightIcon size={20} />}
            </button>
          )}
          <div className="flex flex-col">
            <span className="font-medium">{name}</span>
            {childCategories?.length > 0 && (
              <span className="text-[10px] text-muted-foreground">
                {childCategories.length} subcategories
              </span>
            )}
          </div>
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const category = row.original;
      const [isActive, setIsActive] = useState(category.isActive);

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
