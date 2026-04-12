import { ColumnDef } from "@tanstack/react-table";
import ProductRequestActions from "./product-request-actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatOnlyDate } from "@/utils/formatDate";
import { ProductRequest } from "@/types/product-request.type";
import { Badge } from "../ui/badge";

export const requestColumns: ColumnDef<ProductRequest>[] = [
    {
        accessorKey: "packshots",
        header: "Product",
        cell: ({ row }) => (
            <div className="relative h-12 w-12 overflow-hidden rounded-lg border bg-muted">
                <img
                    src={row.original.packshots?.[0]}
                    alt={row.original.name}
                    className="h-full w-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=No+Image" }}
                />
            </div>
        ),
    },
    {
        accessorKey: "name",
        header: "Description",
        cell: ({ row }) => (
            <div className="max-w-75">
                <p className="truncate font-medium text-sm">{row.original.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{row.original.description}</p>
            </div>
        ),
    },
    {
        id: "requester",
        header: "Requester",
        cell: ({ row }) => {
            const user = row.original.requester;
            return (
                <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatarUrl} />
                        <AvatarFallback>
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col leading-none">
                        <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
                        <span className="text-[10px] text-muted-foreground">@{user?.username}</span>
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
        accessorKey: "createdAt",
        header: "Date Requested",
        cell: ({ row }) => (
            <span className="text-sm text-muted-foreground">
                {formatOnlyDate(row.original.createdAt)}
            </span>
        ),
    },
    {
        accessorKey: "closedAt",
        header: "Status",
        cell: ({ row }) => {
            const isClosed = !!row.original.closedAt;
            return (
                <Badge
                    variant={isClosed ? "destructive" : "outline"}
                    className={isClosed ? "" : "text-emerald-600 border-emerald-200 bg-emerald-50"}
                >
                    {isClosed ? "Closed" : "Active"}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <ProductRequestActions request={row.original} />,
    },
]