import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatOnlyDate } from "@/utils/formatDate";
import { UserType } from "@/types/user.type";

interface ViewProfileModalProps {
    user: UserType;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ViewProfileModal({ user, open, onOpenChange }: ViewProfileModalProps) {
    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-6">
                    <Avatar className="h-24 w-24 border-2 border-green-50">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback className="text-2xl bg-green-100 text-green-700">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
                        <p className="text-sm text-green-600 font-medium">@{user.username}</p>
                        <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-bold">Joined at</p>
                            <p className="capitalize font-medium">{formatOnlyDate(user.createdAt)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-bold">Status</p>
                            <p className={`capitalize font-medium ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                {user.isActive ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}