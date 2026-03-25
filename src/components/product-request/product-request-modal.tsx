"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, User as UserIcon, Tag } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ProductRequest } from "@/app/(dashboard)/product-requests/page"
import { cn } from "@/lib/utils"
import { getStatusLabel, requestStatusStyles } from "@/utils/statusStyles"
import { formatOnlyDate } from "@/utils/formatDate"

interface ViewRequestModalProps {
    request: ProductRequest
    open: boolean
    onOpenChange: (open: boolean) => void
}
export default function ViewRequestModal({ request, open, onOpenChange }: ViewRequestModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-125 overflow-hidden p-0 border-none">
                <div className="relative h-64 w-full bg-muted">
                    <img
                        src={request.image}
                        alt={request.description}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                        <Badge
                            className={cn(
                                "capitalize font-semibold border",
                                requestStatusStyles[request.status]
                            )}
                        >
                            {getStatusLabel(request.status)}
                        </Badge>
                    </div>
                </div>
                <div className="p-6 space-y-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold leading-tight">
                            {request.description}
                        </DialogTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Tag className="h-3.5 w-3.5" />
                            <span>{request.category}</span>
                            <span>•</span>
                            <span className="capitalize">{request.condition.replace("-", " ")}</span>
                        </div>
                    </DialogHeader>
                    <Separator />
                    <div className="grid grid-cols-2 gap-6 pb-2">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                <MapPin className="h-3 w-3" /> Location
                            </p>
                            <p className="text-sm font-medium">
                                {request.lga}, {request.state}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                <UserIcon className="h-3 w-3" /> Requester
                            </p>
                            <p className="text-sm font-medium">
                                {request.user.firstname} {request.user.lastname}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                <CalendarDays className="h-3 w-3" /> Date Requested
                            </p>
                            <p className="text-sm font-medium">
                                {formatOnlyDate((request.createdAt))}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}