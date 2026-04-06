"use client"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, UserCircle, Pencil, Ban, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ConfirmActionDialog } from "./confirmation-dialog"
import ViewProfileModal from "./users-profile"
import { UserType } from "@/types/user.type"
import { useDeactivateUser, useDeleteUser, useReactivateUser } from "@/hooks/useUser"


interface UsersActionsProps {
    user: UserType
}
type DialogType = "view" | "deactivate" | "delete" | "reactivate"

export default function UsersActions({ user }: UsersActionsProps) {
    const router = useRouter()
    const [activeDialog, setActiveDialog] = useState<DialogType | null>(null)
    const [isPending, startTransition] = useTransition()
    const deleteMutation = useDeleteUser();
    const deactivateMutation = useDeactivateUser();
    const reactivateMutation = useReactivateUser();

    const isActive = user.isActive === true;
    const isLoading =
        isPending ||
        deleteMutation.isPending ||
        deactivateMutation.isPending;

    const handleAction = (type: DialogType | "edit") => {
        if (type === "edit") {
            router.push(`/users/${user.id}/edit`);
            return
        }
        setActiveDialog(type)
    }
    const onConfirmAction = async (type: "delete" | "deactivate" | "reactivate") => {
        startTransition(async () => {
            try {
                if (type === "delete") {
                    await deleteMutation.mutateAsync(user.id);
                } else if (type === "deactivate") {
                    await deactivateMutation.mutateAsync(user.id);
                } else if (type === "reactivate") {
                    await reactivateMutation.mutateAsync(user.id);
                }
                setActiveDialog(null)
            } catch (error) {
                console.error(error)
            }
        })
    }

    return (
        <>
            <ViewProfileModal
                user={user}
                open={activeDialog === "view"}
                onOpenChange={(open) => !open && setActiveDialog(null)}
            />
            <ConfirmActionDialog
                open={activeDialog === "deactivate" || activeDialog === "reactivate"}
                onOpenChange={(open) => !open && setActiveDialog(null)}
                isLoading={isPending}
                title={isActive ? "Deactivate User" : "Reactivate User"}
                description={
                    <>
                        Are you sure you want to {isActive ? "deactivate" : "reactivate"}{" "}
                        <strong>{user.firstName} {user.lastName}</strong>?
                    </>
                }
                confirmText={isActive ? "Deactivate" : "Reactivate"}
                onConfirm={() => onConfirmAction(isActive ? "deactivate" : "reactivate")}
            />
            <ConfirmActionDialog
                open={activeDialog === "delete"}
                onOpenChange={(open) => !open && setActiveDialog(null)}
                isLoading={isPending}
                title="Delete User"
                variant="destructive"
                description={
                    <>
                        Are you sure you want to delete <strong>{user.firstName} {user.lastName}</strong>?
                    </>
                }
                confirmText="Delete User"
                onConfirm={() => onConfirmAction("delete")}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Open user actions"
                        disabled={isPending}
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onSelect={() => { handleAction("view") }}>
                        <UserCircle className="mr-2 h-4 w-4" />
                        View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => { handleAction("edit") }}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit User
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => { handleAction("deactivate") }}>
                        <Ban className="mr-2 h-4 w-4" />
                        {isActive ? "Deactivate" : "Reactivate"} User
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => { handleAction("delete") }}
                        className="text-red-600 focus:text-red-600 focus:bg-red-50">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}