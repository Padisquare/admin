"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { satoshi } from "@/fonts";
import {
  MessageCircle,
  Phone,
  UserPlus,
  UserCheck,
  Heart,
  Users,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";
import { getInitials } from "@/utils/getInitials";
import { UserType } from "@/types/user.type";
import { useFollowUser, useUnfollowUser } from "@/hooks/useUser.hook";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface ProfileHoverCardProps {
  userData?: Partial<UserType>;
  children: React.ReactNode;
  className?: string;
}

const ProfileHoverCard: React.FC<ProfileHoverCardProps> = ({
  userData,
  children,
  className,
}) => {
  const { username } = useAuthContext();
  const [isFollowing, setIsFollowing] = useState(userData?.isFollowing);
  const { mutateAsync: followUser, isPending: isFollowingPending } =
    useFollowUser(userData?._id as string, userData?.username as string);
  const { mutateAsync: unfollowUser, isPending: isUnfollowingPending } =
    useUnfollowUser(userData?._id as string, userData?.username as string);
  const { token } = useAuthContext();
  const isAuthenticated = !!token;
  const router = useRouter();
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounceFollow = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(async () => {
        if (isFollowing) {
          await unfollowUser();
        } else {
          await followUser();
        }
      }, 500);
    },
    [followUser, isFollowing, unfollowUser]
  );

  const handleFollowToggle = useCallback(
    async (e: React.MouseEvent) => {
      if (isAuthenticated) {
        setIsFollowing((prev) => !prev);
        debounceFollow(e);
      } else {
        router.push("/login");
      }
    },
    [debounceFollow, isAuthenticated, router]
  );

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={cn("cursor-pointer", className)}>{children}</div>
      </HoverCardTrigger>
      <HoverCardContent
        className={cn(
          "w-80 p-0 bg-white border-0 shadow-2xl rounded-2xl overflow-hidden",
          satoshi.className
        )}
        align="start"
        sideOffset={8}
      >
        {/* Header with gradient background */}
        <div className="relative h-16 bg-gradient-to-br from-brand-main via-brand-main/90 to-brand-main/80">
          {/* Decorative elements */}
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white/20 rounded-full"></div>
          <div className="absolute top-4 right-4 w-0.5 h-0.5 bg-white/30 rounded-full"></div>

          {/* Avatar positioned over the header */}
          <div className="absolute -bottom-6 left-4">
            <Avatar className="w-12 h-12 border-3 rounded-[15px] border-white shadow-lg ring-2 ring-white/20">
              <AvatarImage
                src={userData?.avatarUrl}
                className="object-cover"
                alt={`${userData?.firstName} ${userData?.lastName}`}
              />
              <AvatarFallback className="bg-gradient-to-br rounded-[15px] from-green-200 to-green-300 border-2 text-black text-sm font-[900] border-green-400">
                {getInitials(`${userData?.firstName} ${userData?.lastName}`)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Content area */}
        <div className="pt-8 pb-3 px-4">
          {/* User header info */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className={cn(
                    "text-base font-[900] text-gray-900",
                    satoshi.className
                  )}
                >
                  {userData?.firstName} {userData?.lastName}
                </h3>
              </div>
              <p className="text-xs lowercase text-gray-600 mb-2">
                @{userData?.username}
              </p>
            </div>
          </div>

          {/* Stats section */}
          <div className="flex items-center justify-evenly mb-3 py-2 border-y border-gray-100">
            <div className="text-center w-full">
              <div className="flex items-center gap-1 justify-center mb-0.5">
                <Users className="w-2.5 h-2.5 text-gray-400" />
                <p className="text-sm font-[900] text-gray-900">
                  {userData?.followingCount}
                </p>
              </div>
              <p className="text-xs text-gray-600">Followers</p>
            </div>

            <div className="text-center w-full">
              <div className="flex items-center gap-1 justify-center mb-0.5">
                <Heart className="w-2.5 h-2.5 text-gray-400" />
                <p className="text-sm font-[900] text-gray-900">
                  {userData?.followerCount}
                </p>
              </div>
              <p className="text-xs text-gray-600">Following</p>
            </div>
          </div>

          {/* Action buttons */}
          <div
            className={cn(
              "flex gap-2 mb-2",
              userData?.username === username && "justify-center"
            )}
          >
            {userData?.username !== username && (
              <Button
                onClick={handleFollowToggle}
                disabled={isFollowingPending || isUnfollowingPending}
                variant={isFollowing ? "outline" : "default"}
                size="sm"
                className={cn(
                  "flex-1 group/follow-button h-8 text-xs font-[900] rounded-full transition-all duration-200",
                  isFollowing
                    ? "border-brand-main text-brand-main hover:bg-red-50 hover:border-red-500 hover:text-red-500"
                    : "bg-brand-main hover:bg-brand-main/90 shadow-sm"
                )}
              >
                {isFollowingPending || isUnfollowingPending ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : isFollowing ? (
                  <>
                    <UserCheck className="w-3 h-3 mr-1" />
                    <span className="inline group-hover/follow-button:hidden">
                      Following
                    </span>
                    <span className="hidden group-hover/follow-button:inline">
                      Unfollow
                    </span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3 h-3 mr-1" />
                    Follow
                  </>
                )}
              </Button>
            )}
            <Link href={`/messages/${userData?._id}`}>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 rounded-full border-gray-300 hover:bg-gray-50 hover:border-brand-main/30 transition-all duration-200"
              >
                <MessageCircle className="w-3 h-3" />
              </Button>
            </Link>

            {userData?.phoneNumber && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 rounded-full border-gray-300 hover:bg-gray-50 hover:border-brand-main/30 transition-all duration-200"
                onClick={() =>
                  window.open(`tel:${userData?.phoneNumber}`, "_blank")
                }
              >
                <Phone className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* View profile link */}
          <Link href={`/${userData?.username}`}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-7 text-xs text-brand-main hover:bg-brand-main/5 rounded-full transition-all duration-200"
            >
              View Full Profile
            </Button>
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfileHoverCard;
