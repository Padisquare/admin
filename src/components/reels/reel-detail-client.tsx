"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchReelById } from "@/services/reels.service";
import { ReelDetailResponse } from "@/types/reels.type";
import CustomLoader from "@/components/common/custom-loader";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatOnlyDate } from "@/utils/formatDate";
import { cn } from "@/lib/utils";

export default function ReelDetailClient({ reelId }: { reelId: string }) {
  const { data, isPending, error } = useQuery<ReelDetailResponse>({
    queryKey: ["reel", reelId],
    queryFn: () => fetchReelById(reelId),
    enabled: !!reelId,
  });

  if (isPending) {
    return <CustomLoader />;
  }

  const reel = data?.entity;

  if (error || !reel) {
    return (
      <div className="p-6 space-y-4">
        <p className="text-muted-foreground">This reel could not be loaded.</p>
        <Button asChild variant="outline">
          <Link href="/reels">Back to reels</Link>
        </Button>
      </div>
    );
  }

  const seller = reel.seller;
  const fullName = `${seller.firstName} ${seller.lastName}`.trim();
  const initials = `${seller.firstName?.[0] ?? ""}${seller.lastName?.[0] ?? ""}`.toUpperCase();
  const isClosed = !!reel.closedAt;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Reel details</h1>
        <Button asChild variant="outline">
          <Link href="/reels">Back to reels</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
            <video src={reel.videoUrl} controls className="h-full w-full" playsInline />
          </div>

          <div>
            <p className="text-lg font-medium">{reel.name}</p>
            <p className="text-muted-foreground text-sm mt-1">{reel.description}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>
              <span className="font-medium text-foreground">Price: </span>
              {reel.unitPrice}
            </span>
            <span>
              <span className="font-medium text-foreground">Condition: </span>
              {reel.condition.replace(/_/g, " ")}
            </span>
            <span>
              <span className="font-medium text-foreground">Location: </span>
              {reel.lga}, {reel.state}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-5 border rounded-xl bg-white">
            <h3 className="text-lg font-medium mb-4">Seller</h3>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={seller.avatarUrl} alt={fullName} />
                <AvatarFallback>{initials || "?"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{fullName}</p>
                <p className="text-sm text-muted-foreground">@{seller.username}</p>
              </div>
            </div>
          </div>

          <div className="p-5 border rounded-xl bg-white space-y-3">
            <h3 className="text-lg font-medium">Reel info</h3>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Reel ID</span>
              <span className="font-mono text-xs">{reel._id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Category</span>
              <span>{reel.category?.name ?? "—"}</span>
            </div>
            <div className="flex justify-between text-sm items-center">
              <span className="text-muted-foreground">Status</span>
              <Badge
                variant={isClosed ? "destructive" : "outline"}
                className={cn(
                  "capitalize",
                  !isClosed && "border-green-500 text-green-600 bg-green-50",
                )}
              >
                {isClosed ? "Closed" : "Active"}
              </Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Posted</span>
              <span>{formatOnlyDate(reel.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
