"use client";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/app/(dashboard)/users/page";
import { Badge } from "../ui/badge";
import UsersActions from "./users-action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";

export const usersColumns: ColumnDef<User>[] = [
    {
        id: "name",
        header: "Name",
        cell: ({ row }) => {
            const user = row.original;
            const initials = `${user.firstname?.[0] || ""}${user.lastname?.[0] || ""}`.toUpperCase();
            const fullName = `${user.firstname} ${user.lastname}`;
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={fullName} />
                        <AvatarFallback className="bg-gray-100 text-xs font-medium text-gray-600">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium text-sm leading-none">
                            {fullName}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                            @{user.username}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: "Email",
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