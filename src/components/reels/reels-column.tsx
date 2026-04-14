"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatOnlyDate } from "@/utils/formatDate";
import { Reel } from "@/types/reels.type";
import { PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import ViewReelModal from "./reel-action";
import ReelActions from "./reel-action";

export const reelsTableColumns: ColumnDef<Reel>[] = [
  {
    accessorKey: "name",
    header: "Product Reel",
    cell: ({ row }) => {
      const reel = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-sm leading-none">{reel.name}</span>
          <span className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {reel.category?.name}
          </span>
        </div>
      );
    },
  },
  {
    id: "seller",
    header: "Seller",
    cell: ({ row }) => {
      const seller = row.original.seller;
      const fullName = `${seller.firstName} ${seller.lastName}`;
      const initials = `${seller.firstName?.[0]}${seller.lastName?.[0]}`.toUpperCase();

      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={seller.avatarUrl} alt={fullName} />
            <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{fullName}</span>
            <span className="text-[10px] text-muted-foreground italic">@{seller.username}</span>
          </div>
        </div>
      );
    },
  },
  {
    id: "location",
    header: "Location",
    cell: ({ row }) => {
      return (
        <span className="text-sm text-slate-600">
          {row.original.lga}, {row.original.state}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isClosed = !!row.original.closedAt;
      return (
        <Badge
          variant={isClosed ? "destructive" : "outline"}
          className={cn("capitalize", !isClosed && "border-green-500 text-green-600 bg-green-50")}
        >
          {isClosed ? "Closed" : "Active"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Posted Date",
    cell: ({ row }) => {
      return (
        <span className="text-sm text-gray-500">
          {formatOnlyDate(row.original.createdAt)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const reel = row.original;
      return <ReelActions reel={reel} />;
    },
  },
];