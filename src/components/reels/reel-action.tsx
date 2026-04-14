"use client";

import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useReels } from "@/hooks/useReels";
import { Reel } from "@/types/reels.type";
import { ConfirmActionDialog } from "../user/confirmation-dialog";
import { ReelDetailsModal } from "./reel-details-modal";

interface Props {
    reel: Reel;
}

export default function ReelActions({ reel }: Props) {
    const { Delete, isDeleting } = useReels();
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleDelete = async () => {
        Delete(reel._id, {
            onSuccess: () => {
                setDeleteOpen(false);
                setOpen(false);
            },
        });
    };

    return (
        <>
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 text-slate-500 hover:text-emerald-700 transition group"
                >
                    <div className="p-1.5 rounded-md bg-slate-50 group-hover:bg-emerald-50">
                        <Eye size={16} />
                    </div>
                    <span className="text-xs font-semibold">View</span>
                </button>

                <button
                    onClick={() => setDeleteOpen(true)}
                    className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                >
                    <Trash2 size={16} />
                </button>
            </div>
            <ReelDetailsModal
                reel={reel}
                open={open}
                onOpenChange={setOpen}
            />
            <ConfirmActionDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title="Delete Reel"
                description={`This action cannot be undone. Are you sure you want to delete "${reel.name}"?`}
                confirmText="Delete"
                variant="destructive"
                isLoading={isDeleting}
                onConfirm={handleDelete}
            />
        </>
    );
}