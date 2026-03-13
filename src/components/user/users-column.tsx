"use client";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/app/(dashboard)/users/page";
import { Badge } from "../ui/badge";
import UsersActions from "./users-action";
import { cn } from "@/lib/utils";

export const usersColumns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.original.role;
            return (
                <Badge variant="secondary" className="capitalize">
                    {role}
                </Badge>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge
                    variant={status === "active" ? "active" : "destructive"}
                    className="capitalize"
                >
                    {status}
                </Badge >
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Joined",
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => {
            return <UsersActions user={row.original} />;
        },
    },
];