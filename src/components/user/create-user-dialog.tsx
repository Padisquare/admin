"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import CustomButton from "@/components/common/custom-button"
import CreateUserForm from "./create-user-form"

export default function CreateUserDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <CustomButton
                    type="button"
                    leftIcon={<Plus className="h-4 w-4" />}
                    label="Create User"
                />
            </DialogTrigger>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                </DialogHeader>
                <CreateUserForm />
            </DialogContent>
        </Dialog>
    )
}