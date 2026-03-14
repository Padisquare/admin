"use client";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { User } from "@/app/(dashboard)/users/page";
import { EditUserSheet } from "./edit-user";
import { ConfirmActionDialog } from "./confirmation-dialog";

interface UsersActionsProps {
    user: User;
}
export default function UsersActions({ user }: UsersActionsProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deactivateOpen, setDeactivateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <EditUserSheet user={user} open={editOpen} onOpenChange={setEditOpen} />
            <ConfirmActionDialog
                open={deactivateOpen}
                onOpenChange={setDeactivateOpen}
                title="Deactivate User"
                description={<>Are you sure you want to deactivate <strong>{user.name}</strong>? This can be reversed later.</>}
                confirmText="Deactivate"
                onConfirm={async () => { }}
            />
            <ConfirmActionDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title="Delete User"
                description={<>Are you sure you want to delete <strong>{user.name}</strong>? This action is permanent.</>}
                confirmText="Delete User"
                variant="destructive"
                onConfirm={async () => { }}
            />
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                    // onClick={() => router.push(`/users/${user.id}`)}
                    >
                        View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setEditOpen(true); setDropdownOpen(false); }}>
                        Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setDeactivateOpen(true); setDropdownOpen(false); }}>
                        Deactivate User
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-600"
                        onSelect={(e) => { e.preventDefault(); setDeleteOpen(true); setDropdownOpen(false); }}>
                        Delete User
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}