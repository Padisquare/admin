"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ReelsDetailsPage = () => {
  const [play, setPlay] = useState(false);

  const reel = {
    id: 1,
    caption: "How I edit my reels in 30 seconds 🚀",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1508704019882-f9cf40e475b4?w=800",
    views: 125000,
    likes: 32000,
    comments: 1200,
    status: "published",
    creator: {
      name: "David Tech",
      email: "david@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    createdAt: "2026-03-20T10:30:00Z",
  };

  const formatNumber = (num: number) =>
    Intl.NumberFormat("en", { notation: "compact" }).format(num);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold">Reel Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 🎥 Video Section */}
        <div className="space-y-4">
          <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
            {!play ? (
              <div
                className="w-full h-full cursor-pointer relative"
                onClick={() => setPlay(true)}
              >
                <img
                  src={reel.thumbnail}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 p-4 rounded-full">▶</div>
                </div>
              </div>
            ) : (
              <video
                src={reel.videoUrl}
                controls
                autoPlay
                className="w-full h-full"
              />
            )}
          </div>

          {/* Caption */}
          <p className="text-lg font-medium">{reel.caption}</p>

          {/* Stats */}
          <div className="flex gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {formatNumber(reel.views)} views
            </div>

            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {formatNumber(reel.likes)} likes
            </div>

            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {formatNumber(reel.comments)} comments
            </div>
          </div>
        </div>

        {/* 👤 Details Section */}
        <div className="space-y-6">
          {/* Creator */}
          <div className="p-5 border rounded-xl bg-white">
            <h3 className="text-lg font-medium mb-4">Creator</h3>

            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={reel.creator.avatar} />
                <AvatarFallback>{reel.creator.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">{reel.creator.name}</p>
                <p className="text-sm text-muted-foreground">
                  {reel.creator.email}
                </p>
              </div>
            </div>
          </div>

          {/* Reel Info */}
          <div className="p-5 border rounded-xl bg-white space-y-3">
            <h3 className="text-lg font-medium">Reel Info</h3>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Reel ID</span>
              <span>{reel.id}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span
                className={cn(
                  "px-2 py-1 rounded-md text-xs font-semibold capitalize",
                  {
                    "bg-green-100 text-green-700": reel.status === "published",
                    "bg-yellow-100 text-yellow-700": reel.status === "draft",
                    "bg-red-100 text-red-700": reel.status === "flagged",
                  },
                )}
              >
                {reel.status}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Created At</span>
              <span>{new Date(reel.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelsDetailsPage;
