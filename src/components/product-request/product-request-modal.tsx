"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    CalendarDays,
    MapPin,
    MessageSquare,
    ThumbsUp,
    Share2,
    Clock,
    CheckCircle2,
} from "lucide-react"
import { formatOnlyDate } from "@/utils/formatDate"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ProductRequest } from "@/types/product-request.type"

interface Props {
    request: ProductRequest | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function ViewRequestModal({ request, open, onOpenChange }: Props) {
    if (!request) return null
    const { packshots, name, description, condition, closedAt, requester } = request

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-100 p-0 overflow-hidden">
                <div className="relative">
                    <ScrollArea className="w-full">
                        <div className="flex gap-2 p-2">
                            {packshots?.length ? (
                                packshots.map((img, i) => (
                                    <div
                                        key={i}
                                        className="relative h-60 min-w-full overflow-hidden rounded-lg bg-muted"
                                    >
                                        <img
                                            src={img}
                                            alt={name}
                                            className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />
                                    </div>
                                ))
                            ) : (
                                <div className="h-60 w-full flex items-center justify-center text-muted-foreground bg-muted rounded-lg">
                                    No images available
                                </div>
                            )}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    <div className="absolute top-3 left-3 flex gap-2">
                        {closedAt ? (
                            <Badge variant="destructive" className="flex items-center gap-1 text-xs">
                                <Clock className="h-3 w-3" /> Closed
                            </Badge>
                        ) : (
                            <Badge className="flex items-center gap-1 text-xs bg-emerald-500/10 text-emerald-600 border border-emerald-200">
                                <Clock className="h-3 w-3" /> Active
                            </Badge>
                        )}
                        <Badge
                            variant={condition === "brand_new" ? "default" : "secondary"}
                            className="text-xs capitalize"
                        >
                            {condition.replace("_", " ")}
                        </Badge>
                    </div>
                    {packshots?.length > 1 && (
                        <div className="absolute bottom-3 right-3 text-xs bg-black/60 text-white px-2 py-1 rounded-md">
                            {packshots.length} photos
                        </div>
                    )}
                </div>
                <div className="px-5 pb-7 space-y-5 overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            {name}
                        </DialogTitle>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </DialogHeader>
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex gap-4">
                            <span className="flex items-center gap-1">
                                <ThumbsUp size={16} className={`${request.isLiked ? "fill-blue-500 text-blue-500" : ""}`} />
                                {request.likeCount}
                            </span>
                            <span className="flex items-center gap-1">
                                <MessageSquare size={16} />
                                {request.commentCount}
                            </span>
                            <span className="flex items-center gap-1">
                                <Share2 size={16} />
                                {request.repostCount}
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin size={12} /> Location
                            </p>
                            <p>{request.lga}, {request.state}</p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <CalendarDays className="h-3 w-3" /> Date
                            </p>
                            <p>{formatOnlyDate(request.createdAt)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                            {requester?.avatarUrl ? (
                                <img src={requester.avatarUrl} className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                                    {requester?.firstName?.[0]}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                                <p className="text-sm font-medium truncate">
                                    {requester?.firstName} {requester?.lastName}
                                </p>
                                {requester?.verified && (
                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                                @{requester?.username}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}