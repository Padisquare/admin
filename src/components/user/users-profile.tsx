import { BadgeCheck } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatOnlyDate } from "@/utils/formatDate";
import {
    getVerificationBadgeVariant,
    formatVerificationStatus,
} from "@/utils/verification";
import { UserType } from "@/types/user.type";

interface ViewProfileModalProps {
    user: UserType;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ViewProfileModal({ user, open, onOpenChange }: ViewProfileModalProps) {
    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    const location = [user.lga, user.state].filter(Boolean).join(", ");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
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
                        <h2 className="text-xl font-bold flex items-center justify-center gap-1.5">
                            {user.firstName} {user.lastName}
                            {user.verified && (
                                <BadgeCheck className="h-5 w-5 text-blue-500 fill-blue-100" />
                            )}
                        </h2>
                        <p className="text-sm text-green-600 font-medium">@{user.username}</p>
                        <p className="text-muted-foreground">{user.email}</p>
                        {user.bio && (
                            <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                                {user.bio}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-6 text-center">
                        <div>
                            <p className="font-bold leading-none">{user.followerCount ?? 0}</p>
                            <p className="text-xs text-muted-foreground mt-1">Followers</p>
                        </div>
                        <div>
                            <p className="font-bold leading-none">{user.followingCount ?? 0}</p>
                            <p className="text-xs text-muted-foreground mt-1">Following</p>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4 mt-2 pt-4 border-t">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-bold">Status</p>
                            <p className={`capitalize font-medium ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                {user.isActive ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-bold">Verification</p>
                            <Badge
                                variant={getVerificationBadgeVariant(user.verificationStatus)}
                                className="capitalize mt-1"
                            >
                                {formatVerificationStatus(user.verificationStatus)}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-bold">Phone Number</p>
                            <p className="font-medium">{user.phoneNumber || "—"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-bold">WhatsApp</p>
                            <p className="font-medium">{user.whatsappNumber || "—"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-bold">Location</p>
                            <p className="font-medium">{location || "—"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-bold">Joined at</p>
                            <p className="font-medium">{formatOnlyDate(user.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
