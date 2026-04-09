"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Website } from "@/types/website.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import WebsiteAction from "./website-actions";
import { formatOnlyDate } from "@/utils/formatDate";
import Link from "next/link";

export const websitTableColumns: ColumnDef<Website>[] = [
    {
        id: "website",
        header: "Website",
        cell: ({ row }) => {
            const site = row.original;
            const initial = site.title?.[0]?.toUpperCase();

            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={site.logo} alt={site.title} />
                        <AvatarFallback className="bg-gray-100 text-xs font-medium text-gray-600">
                            {initial}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <span className="font-medium text-sm leading-none">
                            {site.title}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                            @{site.subdomain}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "template",
        header: "Template",
        cell: ({ row }) => {
            return (
                <span className="text-gray-600">
                    {row.original.template}
                </span>
            );
        },
    },
    {
        accessorKey: "url",
        header: "Domain",
        cell: ({ row }) => {
            return (
                <Link
                    href={`https://${row.original.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                    <Globe className="size-3" />
                    {row.original.url}
                </Link>
            );
        },
    },
    {
        accessorKey: "deletedAt",
        header: "Status",
        cell: ({ row }) => {
            const isDeleted = row.original.deletedAt !== null;

            return (
                <Badge
                    variant={isDeleted ? "destructive" : "outline"}
                    className="capitalize"
                >
                    {isDeleted ? "archived" : "live"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
            return (
                <span className="text-gray-600">
                    {formatOnlyDate(row.original.createdAt)}
                </span>
            );
        },
    },
    {
        accessorKey: "updatedAt",
        header: "Updated",
        cell: ({ row }) => {
            return (
                <span className="text-gray-600">
                    {formatOnlyDate(row.original.updatedAt)}
                </span>
            );
        },
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => {
            return <WebsiteAction website={row.original} />;
        },
    },
];