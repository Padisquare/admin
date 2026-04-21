"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Eye } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import ViewRequestModal from "./product-request-modal"
import { ProductRequest } from "@/types/product-request.type"

interface RequestActionsProps {
    request: ProductRequest
}

type DialogType = "view" | "delete"

export default function RequestActions({ request }: RequestActionsProps) {
    const router = useRouter()
    const [activeDialog, setActiveDialog] = useState<DialogType | null>(null)

    const handleAction = (type: DialogType | "edit") => {
        if (type === "edit") {
            router.push(`/product-requests/${request._id}/edit`)
            return
        }
        setActiveDialog(type)
    }
    return (
        <>
            <ViewRequestModal
                request={request}
                open={activeDialog === "view"}
                onOpenChange={(open) => !open && setActiveDialog(null)}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onSelect={() => handleAction("view")}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}