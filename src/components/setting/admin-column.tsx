"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import QuickAction from "./quick-action";

export interface Admin {
  id: number;
  name: string;
  email: string;
  avatar?: string;

  role: "super_admin" | "admin" | "editor" | "viewer";

  status: "active" | "inactive" | "suspended";
  lastLogin?: string;
}

export const adminsTableColumns: ColumnDef<Admin>[] = [
  // Avatar column
  {
    accessorKey: "avatar",
    header: "",
    cell: ({ row }) => {
      const admin = row.original;

      return (
        <Avatar className="h-10 w-10">
          <AvatarImage src={admin.avatar} />
          <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
        </Avatar>
      );
    },
  },

  // Name column
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const admin = row.original;

      return (
        <Link
          href={`/admin/${admin.id}`}
          className="font-medium hover:underline"
        >
          {admin.name}
        </Link>
      );
    },
  },

  // Email column
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <span className="text-sm text-muted-foreground">
          {row.original.email}
        </span>
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
              "bg-green-900 text-green-100": role === "super_admin",
              "bg-green-700 text-white": role === "admin",
              "bg-green-500 text-white": role === "editor",
              "bg-green-100 text-green-700": role === "viewer",
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
    header: "Last Active",
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
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const admin = row.original;
      return <QuickAction admin={admin} />;
    },
  },
];
