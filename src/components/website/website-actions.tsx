import { RotateCcw, Trash2 } from "lucide-react";
import { ConfirmActionDialog } from "../user/confirmation-dialog";
import { useState } from "react";
import { useWebsites } from "@/hooks/useWebsites";
import { Website } from "@/types/website.type";

const WebsiteAction = ({ website }: { website: Website }) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [recoverOpen, setRecoverOpen] = useState(false);

    const {
        removeWebsite,
        recoverWebsite,
        isDeleting,
        isRestoring,
    } = useWebsites();

    const isDeleted = website.deletedAt !== null;

    return (
        <>
            <div className="flex gap-4">
                {isDeleted ? (
                    <RotateCcw
                        className="size-4 cursor-pointer text-green-600"
                        onClick={() => setRecoverOpen(true)}
                    />
                ) : (
                    <Trash2
                        className="size-4 cursor-pointer text-red-600"
                        onClick={() => setDeleteOpen(true)}
                    />
                )}
            </div>

            <ConfirmActionDialog
                open={recoverOpen}
                onOpenChange={setRecoverOpen}
                title="Recover Website"
                description={`Recover "${website.title}"?`}
                confirmText="Recover"
                isLoading={isRestoring}
                onConfirm={() =>
                    recoverWebsite(website.id).then(() => setRecoverOpen(false))
                }
            />

            <ConfirmActionDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title="Delete Website"
                description={`Delete "${website.title}"?`}
                confirmText="Delete"
                variant="destructive"
                isLoading={isDeleting}
                onConfirm={() =>
                    removeWebsite(website.id).then(() => setDeleteOpen(false))
                }
            />
        </>
    );
};
export default WebsiteAction;