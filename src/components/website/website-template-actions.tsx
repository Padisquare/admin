"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { WebsiteTemplate } from "@/types/website-template.type";
import { useWebsiteTemplates } from "@/hooks/useWebTemplates";
import { ConfirmActionDialog } from "../user/confirmation-dialog";
import { toast } from "sonner";
import { ViewTemplateModal } from "./view-webtemp-modal";

interface TemplateActionsProps {
    template: WebsiteTemplate;
}

export const TemplateActions: React.FC<TemplateActionsProps> = ({ template }) => {
    const router = useRouter();
    const { deleteTemplate, isDeleting } = useWebsiteTemplates();
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteTemplate(template.id);
            setShowDeleteDialog(false);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`Failed to delete template: ${error.message}`);
            } else {
                toast.error("An unexpected error occurred while deleting.");
            }
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={() => setShowViewModal(true)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Template
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={() => router.push(`/website/${template.id}/edit`)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Template
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                        onSelect={() => setShowDeleteDialog(true)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Template
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ViewTemplateModal
                template={template}
                open={showViewModal}
                onOpenChange={setShowViewModal}
            />
            <ConfirmActionDialog
                open={showDeleteDialog}
                onOpenChange={(open) => !open && setShowDeleteDialog(false)}
                onConfirm={handleDelete}
                isLoading={isDeleting}
                title={`Delete Website Template`}
                variant="destructive"
                description={
                    <>
                        Are you sure you want to delete <strong>{template.name}</strong>?
                    </>
                }
                confirmText="Delete Template"
            />
        </>
    );
};