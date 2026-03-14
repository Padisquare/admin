"use client";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/app/(dashboard)/users/page";
import { Badge } from "../ui/badge";
import UsersActions from "./users-action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";

export const usersColumns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const user = row.original;
            const initials = user.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
            return (
                <div className="flex items-center gap-2">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gray-100 text-xs font-medium">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                </div>
            );
        },
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
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt);
            return <span className="text-gray-600">{format(date, "MMM dd, yyyy")}</span>;

        },
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => {
            return <UsersActions user={row.original} />;
        },
    },
];