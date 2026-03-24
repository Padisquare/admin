import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ProductRequest } from "@/app/(dashboard)/product-requests/page";
import ProductRequestActions from "./product-request-actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatOnlyDate } from "@/utils/formatDate";
import { getStatusLabel, requestStatusStyles } from "@/utils/statusStyles";
import { cn } from "@/lib/utils";

export const requestColumns: ColumnDef<ProductRequest>[] = [
    {
        accessorKey: "image",
        header: "Product",
        cell: ({ row }) => {
            const request = row.original
            return (
                <div className="relative h-12 w-12 overflow-hidden rounded-lg border bg-muted">
                    <img
                        src={request.image}
                        alt={request.description}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=No+Image"
                        }}
                    />
                </div>
            )
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="max-w-75">
                <p className="truncate font-medium text-sm">{row.getValue("description")}</p>
                <p className="text-xs text-muted-foreground capitalize">{row.original.category}</p>
            </div>
        ),
    },
    {
        id: "requester",
        header: "Requester",
        cell: ({ row }) => {
            const user = row.original.user
            return (
                <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-[10px]">
                            {user.firstname[0]}{user.lastname[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col leading-none">
                        <span className="text-sm font-medium">{user.firstname}</span>
                        <span className="text-[10px] text-muted-foreground">@{user.username}</span>
                    </div>
                </div>
            )
        },
    },
    {
        id: "location",
        header: "Location",
        cell: ({ row }) => (
            <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium">{row.original.state}</span>
                <span className="text-xs text-muted-foreground">{row.original.lga}</span>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status
            return (
                <Badge
                    className={cn(
                        "capitalize px-3 py-1 font-semibold border",
                        requestStatusStyles[status]
                    )}
                >
                    {getStatusLabel(status)}
                </Badge>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date Requested",
        cell: ({ row }) => (
            <span className="text-sm text-muted-foreground">
                {formatOnlyDate(row.original.createdAt)}
            </span>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <ProductRequestActions request={row.original} />,
    },
]