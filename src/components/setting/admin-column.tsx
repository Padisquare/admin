"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import EditAdminPassword from "./edit-admin-password";

export interface Admin {
  id: number;
  name: string;
  email: string;
  avatar?: string;

  role: "super_admin" | "admin" | "moderator";

  status: "active" | "inactive" | "suspended";

  lastLogin?: string;
  createdAt: string;
}

export const adminsTableColumns: ColumnDef<Admin>[] = [
  {
    accessorKey: "name",
    header: "Admin",
    cell: ({ row }) => {
      const admin = row.original;

      return (
        <Link href={`/admin/${admin.id}`}>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={admin.avatar} />
              <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="font-medium">{admin.name}</span>
              <span className="text-muted-foreground text-xs">
                {admin.email}
              </span>
            </div>
          </div>
        </Link>
      );
    },
  },

  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;

      return (
        <span
          className={cn(
            "px-2 py-1 rounded-md text-xs font-semibold capitalize",
            {
              "bg-purple-100 text-purple-700": role === "super_admin",
              "bg-blue-100 text-blue-700": role === "admin",
              "bg-yellow-100 text-yellow-700": role === "moderator",
            },
          )}
        >
          {role.replace("_", " ")}
        </span>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span
          className={cn(
            "px-2 py-1 rounded-md text-xs font-semibold capitalize",
            {
              "bg-green-100 text-green-700": status === "active",
              "bg-gray-100 text-gray-700": status === "inactive",
              "bg-red-100 text-red-700": status === "suspended",
            },
          )}
        >
          {status}
        </span>
      );
    },
  },

  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: ({ row }) => {
      const lastLogin = row.original.lastLogin;

      if (!lastLogin) {
        return <span className="text-xs text-muted-foreground">Never</span>;
      }

      const date = new Date(lastLogin);

      return (
        <span className="text-sm text-muted-foreground">
          {date.toLocaleDateString()}
        </span>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);

      return (
        <span className="text-sm text-muted-foreground">
          {date.toLocaleDateString()}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const admin = row.original;

      return <EditAdminPassword />;
    },
  },
];
