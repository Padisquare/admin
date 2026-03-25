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
import { User } from "@/app/(dashboard)/users/page"
import { ConfirmActionDialog } from "./confirmation-dialog"
import ViewProfileModal from "./users-profile"

interface UsersActionsProps {
    user: User
}
type DialogType = "view" | "deactivate" | "delete"

export default function UsersActions({ user }: UsersActionsProps) {
    const router = useRouter()
    const [activeDialog, setActiveDialog] = useState<DialogType | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleAction = (type: DialogType | "edit") => {
        if (type === "edit") {
            router.push(`/users/${user.id}/edit`)
            return
        }
        setActiveDialog(type)
    }
    const onConfirmAction = async (type: "delete" | "deactivate") => {
        startTransition(async () => {
            try {
                if (type === "delete") {
                    // await deleteUser(user.id)
                }
                if (type === "deactivate") {
                    // await deactivateUser(user.id)
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
                open={activeDialog === "deactivate"}
                onOpenChange={(open) => !open && setActiveDialog(null)}
                isLoading={isPending}
                title="Deactivate User"
                description={
                    <>
                        Are you sure you want to deactivate <strong>{user.firstname} {user.lastname}</strong>?
                    </>
                }
                confirmText="Deactivate"
                onConfirm={() => onConfirmAction("deactivate")}
            />
            <ConfirmActionDialog
                open={activeDialog === "delete"}
                onOpenChange={(open) => !open && setActiveDialog(null)}
                isLoading={isPending}
                title="Delete User"
                variant="destructive"
                description={
                    <>
                        Are you sure you want to delete <strong>{user.firstname} {user.lastname}</strong>?
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
                        Deactivate
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