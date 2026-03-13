"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ResponsiveDialogProps {
  title: string;
  description: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  requireConfirmation?: boolean; // optional flag to use AlertDialog
}

export function ResponsiveDialog({
  title,
  description,
  children,
  open,
  onOpenChange,
  requireConfirmation = false,
  className,
}: ResponsiveDialogProps) {
  const isMobile = useIsMobile();

  // Mobile: always use drawer
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle className="sr-only">{title}</DrawerTitle>
            <DrawerDescription className="sr-only">
              {description}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop
  if (requireConfirmation) {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="py-10">
          <AlertDialogHeader>
            <AlertDialogTitle className="sr-only">{title}</AlertDialogTitle>
            <AlertDialogDescription className="sr-only">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>{children}</div>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // Default: regular dialog
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={cn("sm:max-w-2xl", className)}>
          <DialogHeader>
            <DialogTitle className="sr-only">{title}</DialogTitle>
            <DialogDescription className="sr-only">
              {description}
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
