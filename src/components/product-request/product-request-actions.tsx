"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ConfirmActionDialog } from "../user/confirmation-dialog"
import { ProductRequest } from "@/app/(dashboard)/product-requests/page"
import ViewRequestModal from "./product-request-modal"

interface RequestActionsProps {
    request: ProductRequest
}

type DialogType = "view" | "delete"

export default function RequestActions({ request }: RequestActionsProps) {
    const router = useRouter()
    const [activeDialog, setActiveDialog] = useState<DialogType | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleAction = (type: DialogType | "edit") => {
        if (type === "edit") {
            router.push(`/product-requests/${request.id}/edit`)
            return
        }
        setActiveDialog(type)
    }
    const onConfirmDelete = async () => {
        startTransition(async () => {
            try {
                // await deleteProductRequest(request.id)
                console.log("Deleted request:", request.id)
                setActiveDialog(null)
            } catch (error) {
                console.error(error)
            }
        })
    }

    return (
        <>
            <ViewRequestModal
                request={request}
                open={activeDialog === "view"}
                onOpenChange={(open) => !open && setActiveDialog(null)}
            />
            <ConfirmActionDialog
                open={activeDialog === "delete"}
                onOpenChange={(open) => !open && setActiveDialog(null)}
                isLoading={isPending}
                title="Delete Request"
                variant="destructive"
                description={
                    <>
                        Are you sure you want to delete the request for <strong>{request.description}</strong>?
                        This action cannot be undone.
                    </>
                }
                confirmText="Delete Request"
                onConfirm={onConfirmDelete}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        disabled={isPending}
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onSelect={() => handleAction("view")}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={() => handleAction("edit")}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Request
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onSelect={() => handleAction("delete")}
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Request
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}