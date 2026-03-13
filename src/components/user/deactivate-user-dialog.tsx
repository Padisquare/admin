"use client";

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

interface DeactivateUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userName: string;
    onConfirm: () => Promise<void> | void;
}

export function DeactivateUserDialog({
    open,
    onOpenChange,
    userName,
    onConfirm
}: DeactivateUserDialogProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = async (e: React.MouseEvent) => {
        e.preventDefault(); // Keep dialog open until logic finishes
        setIsLoading(true);
        try {
            await onConfirm();
            onOpenChange(false);
        } catch (error) {
            console.error("Deactivation failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deactivate User</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to deactivate <strong>{userName}</strong>?
                        This action can be reversed later.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleAction}
                        className="bg-red-600 hover:bg-red-700 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Deactivate"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}