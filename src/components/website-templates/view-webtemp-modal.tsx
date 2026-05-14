"use client";

import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { WebsiteTemplate } from "@/types/website-template.type";
import { Calendar, Info } from "lucide-react";
import { formatOnlyDate } from "@/utils/formatDate";

interface ViewTemplateModalProps {
    template: WebsiteTemplate;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ViewTemplateModal = ({
    template,
    open,
    onOpenChange,
}: ViewTemplateModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl overflow-hidden p-0">
                <DialogDescription className="sr-only">
                    Detailed view of the {template.name} website template.
                </DialogDescription>

                <DialogHeader className="p-6 pb-2">
                    <div className="flex flex-col gap-2 pr-8">
                        <div className="flex items-center gap-3 flex-wrap">
                            <DialogTitle className="text-2xl font-bold leading-none">
                                {template.name}
                            </DialogTitle>
                            <Badge
                                variant={template.isActive ? "default" : "secondary"}
                                className={template.isActive ? "bg-brand-main hover:bg-brand-main/90" : ""}
                            >
                                {template.isActive ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">
                            {template.slug}
                        </p>
                    </div>
                </DialogHeader>

                <div className="space-y-6 p-6 pt-0">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                        <Image
                            src={template.image}
                            alt={template.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div>
                                <h4 className="flex items-center text-sm font-semibold text-slate-500 mb-1.5">
                                    <Info className="mr-2 h-4 w-4" /> Description
                                </h4>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    {template.description}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-3 rounded-lg bg-slate-50 p-4 border border-slate-100">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center text-xs font-medium text-slate-500">
                                    <Calendar className="mr-2 h-3.5 w-3.5" /> Created
                                </span>
                                <span className="text-xs font-semibold text-slate-700">
                                    {formatOnlyDate(template.createdAt)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                                <span className="flex items-center text-xs font-medium text-slate-500">
                                    <Calendar className="mr-2 h-3.5 w-3.5" /> Last Updated
                                </span>
                                <span className="text-xs font-semibold text-slate-700">
                                    {formatOnlyDate(template.updatedAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};