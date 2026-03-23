"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export interface Website {
  id: number;
  title: string;
  logo: string;
  url: string;

  template: string;

  ownerId: number;
  ownerName: string;
  ownerEmail: string;
  ownerAvatar?: string;

  productsCount: number;
  visits: number;

  status: "active" | "inactive" | "flagged";

  createdAt: string;
}

export const websitesTableColumns: ColumnDef<Website>[] = [
  {
    accessorKey: "title",
    header: "Website",
    cell: ({ row }) => {
      const website = row.original;

      return (
        <Link href={`/website/${website.id}`}>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 rounded-md">
              <AvatarImage src={website.logo} alt={website.title} />
              <AvatarFallback>{website.title.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="font-medium">{website.title}</span>
              <span className="text-muted-foreground text-xs">
                ID: <strong>{website.id}</strong>
              </span>
            </div>
          </div>
        </Link>
      );
    },
  },

  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      const url = row.original.url;

      return (
        <a
          href={url}
          target="_blank"
          className="text-blue-600 hover:underline text-sm"
        >
          {url.replace("https://", "")}
        </a>
      );
    },
  },

  {
    accessorKey: "template",
    header: "Template",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.template}</span>
    ),
  },

  {
    accessorKey: "ownerName",
    header: "Owner",
    cell: ({ row }) => {
      const website = row.original;

      return (
        <Link
          href={`/users/${website.ownerId}`}
          className="flex items-center gap-2 hover:underline"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={website.ownerAvatar} />
            <AvatarFallback>{website.ownerName.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-medium">{website.ownerName}</span>
            <span className="text-muted-foreground text-xs">
              {website.ownerEmail}
            </span>
          </div>
        </Link>
      );
    },
  },

  {
    accessorKey: "productsCount",
    header: "Products",
    cell: ({ row }) => row.original.productsCount,
  },

  {
    accessorKey: "visits",
    header: "Visits",
    cell: ({ row }) => {
      const visits = row.original.visits;

      return (
        <span className="font-medium">
          {Intl.NumberFormat("en", {
            notation: "compact",
          }).format(visits)}
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
              "bg-red-100 text-red-700": status === "flagged",
            },
          )}
        >
          {status}
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
];
