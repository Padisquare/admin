"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export interface Reel {
  id: number;
  caption: string;
  thumbnail: string;
  videoUrl?: string;

  views: number;
  likes: number;
  commentsCount: number;

  status: "published" | "draft" | "flagged";

  creatorId: number;
  creatorName: string;
  creatorEmail: string;
  creatorAvatar?: string;

  createdAt: string;
}

export const reelsTableColumns: ColumnDef<Reel>[] = [
  {
    accessorKey: "caption",
    header: "Reel",
    cell: ({ row }) => {
      const reel = row.original;

      return (
        <Link href={`/reels/${reel.id}`}>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 rounded-md">
              <AvatarImage src={reel.thumbnail} alt={reel.caption} />
              <AvatarFallback>🎬</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="font-medium line-clamp-1">{reel.caption}</span>
              <span className="text-muted-foreground text-xs">
                Reel ID: <strong>{reel.id}</strong>
              </span>
            </div>
          </div>
        </Link>
      );
    },
  },

  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.views}</span>
    ),
  },

  {
    accessorKey: "likes",
    header: "Likes",
    cell: ({ row }) => row.original.likes,
  },

  {
    accessorKey: "commentsCount",
    header: "Comments",
    cell: ({ row }) => row.original.commentsCount,
  },

  {
    accessorKey: "creatorName",
    header: "Creator",
    cell: ({ row }) => {
      const reel = row.original;

      return (
        <Link
          href={`/users/${reel.creatorId}`}
          className="flex items-center gap-2 hover:underline"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={reel.creatorAvatar} />
            <AvatarFallback>{reel.creatorName.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-medium">{reel.creatorName}</span>
            <span className="text-muted-foreground text-xs">
              {reel.creatorEmail}
            </span>
          </div>
        </Link>
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
              "bg-green-100 text-green-700": status === "published",
              "bg-yellow-100 text-yellow-700": status === "draft",
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
    header: "Date",
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
