"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { formatOnlyDate } from "@/utils/formatDate";
import { Waitlist } from "@/types/waitlist.type";

export const waitlistTableColumns: ColumnDef<Waitlist>[] = [
    {
        id: "name",
        header: "Name",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex items-center gap-3">
                    <div className="flex flex-col leading-none">
                        <span className="text-sm font-medium">
                            {user.fullname}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <span className="text-sm text-muted-foreground">
                {row.original.email}
            </span>
        )
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.original.role;
            const isVendor = role === "vendor";
            return (
                <Badge
                    variant="outline"
                    className={`capitalize font-semibold ${isVendor
                        ? "border-blue-200 bg-blue-50 text-blue-600 shadow-none"
                        : "border-emerald-200 bg-emerald-50 text-emerald-600 shadow-none"
                        }`}
                >
                    {role}
                </Badge>
            );
        },
    },
    {
        accessorKey: "whatsapp_number",
        header: "WhatsApp",
        cell: ({ row }) => (
            <span className="text-sm font-medium text-gray-700">
                {row.original.whatsapp_number}
            </span>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ row }) => (
            <span className="text-sm text-muted-foreground">
                {formatOnlyDate(row.original.createdAt)}
            </span>
        ),
    },
];