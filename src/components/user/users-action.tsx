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
import { DeactivateUserDialog } from "./deactivate-user-dialog";
import { EditUserSheet } from "./edit-user";

interface UsersActionsProps {
    user: User;
}
export default function UsersActions({ user }: UsersActionsProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    return (
        <>
            <EditUserSheet
                user={user}
                open={editOpen}
                onOpenChange={setEditOpen}
            />
            <DeactivateUserDialog
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                userName={user.name}
                onConfirm={async () => { }}
            />
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                    // onClick={() => router.push(`/users/${user.id}`)}
                    >
                        View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault();
                            setEditOpen(true);
                            setDropdownOpen(false);
                        }}
                    >
                        Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault();
                            setConfirmOpen(true);
                            setDropdownOpen(false);
                        }}
                        className="text-red-500"
                    >
                        Deactivate User
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}