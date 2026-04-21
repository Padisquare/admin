"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatOnlyDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import { Reel } from "@/types/reels.type";
import { MapPin, Tag, Calendar } from "lucide-react";

interface ReelDetailsModalProps {
    reel: Reel;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ReelDetailsModal({ reel, open, onOpenChange }: ReelDetailsModalProps) {
    const sellerInitials = `${reel.seller.firstName[0]}${reel.seller.lastName[0]}`.toUpperCase();
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-xl p-0 bg-slate-50 border border-slate-200 shadow-xl rounded-2xl overflow-hidden max-h-[90vh] flex flex-col  [&>button]:text-slate-300 [&>button]:hover:text-slate-600">
                <DialogHeader className="sr-only">
                    <DialogTitle>Reel Details</DialogTitle>
                </DialogHeader>
                <div className="bg-black w-full h-55 sm:h-65 shrink-0">
                    <video
                        src={reel.videoUrl}
                        controls
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 bg-white rounded-t-2xl -mt-4 relative z-10">
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold text-slate-900">
                            {reel.name}
                        </h2>
                        <p className="text-xl font-bold text-slate-900">
                            ₦{formatNumber(reel.unitPrice)}
                        </p>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        {reel.description || "No description provided."}
                    </p>
                    <div className="flex items-center gap-5 text-sm text-slate-600">
                        <div className="flex items-center gap-1.5">
                            <Tag className="size-4 text-slate-400" />
                            <span className="capitalize">
                                {reel.condition.replace("_", " ")}
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <MapPin className="size-4 text-slate-400" />
                            <span className="truncate">
                                {reel.lga}, {reel.state}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Avatar className="size-10 border border-slate-100 shadow-sm">
                            <AvatarImage src={reel.seller.avatarUrl} />
                            <AvatarFallback className="bg-slate-100 text-slate-600 font-medium">
                                {sellerInitials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-bold text-slate-900">
                                {reel.seller.firstName} {reel.seller.lastName}
                            </p>
                            <p className="text-xs text-slate-500">
                                @{reel.seller.username}
                            </p>
                        </div>
                    </div>
                    <div className="pt-3 border-t flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <div className="flex items-center gap-2">
                            <Calendar className="size-3" />
                            <span>Listed {formatOnlyDate(reel.createdAt)}</span>
                        </div>
                        <div className="hidden sm:block">
                            Updated {formatOnlyDate(reel.updatedAt)}
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
}