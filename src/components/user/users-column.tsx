"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import UsersActions from "./users-action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatOnlyDate } from "@/utils/formatDate";
import { UserType } from "@/types/user.type";


export const usersColumns: ColumnDef<UserType>[] = [
    {
        id: "name",
        header: "Name",
        cell: ({ row }) => {
            const user = row.original;
            const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
            const fullName = `${user.firstName} ${user.lastName}`;
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user?.avatarUrl} alt={fullName} />
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
            const status = row.original.isActive ? "active" : "inactive";
            return (
                <Badge
                    variant={status === "active" ? "outline" : "destructive"}
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
            return <span className="text-gray-600">{formatOnlyDate(row.original.createdAt)}</span>;

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