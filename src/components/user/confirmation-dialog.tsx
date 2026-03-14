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
import { cn } from "@/lib/utils";

interface ConfirmActionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: React.ReactNode;
    confirmText: string;
    variant?: "default" | "destructive";
    onConfirm: () => Promise<void> | void;
}

export function ConfirmActionDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmText,
    variant = "destructive",
    onConfirm
}: ConfirmActionDialogProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onConfirm();
            onOpenChange(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange} >
            <AlertDialogContent className="space-y-2 max-w-75 sm:min-w-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter >
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleAction}
                        className={cn(
                            variant === "destructive" ? "bg-red-600 hover:bg-red-700 text-white" : "",
                            "min-w-25 mb-2"
                        )}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}