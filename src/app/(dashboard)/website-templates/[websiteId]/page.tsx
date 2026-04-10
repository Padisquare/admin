"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EditWebsiteModal from "@/components/website/edit-webtemp-page";

const WebsiteDetailsPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const website = {
    id: 1,
    title: "TechStore",
    logo: "https://logo.clearbit.com/apple.com",
    url: "https://techstore.shop",
    template: "Modern Store",
    owner: {
      id: 101,
      name: "David Tech",
      email: "david@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    productsCount: 45,
    visits: 120000,
    status: "active",
    createdAt: "2026-03-10T10:00:00Z",
  };

  const formatNumber = (num: number) =>
    Intl.NumberFormat("en", { notation: "compact" }).format(num);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{website.title}</h1>
        <Button onClick={() => setOpenModal(true)}>Edit Website</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Website Info */}
        <div className="space-y-4 p-6 border rounded-2xl bg-white">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 rounded-md">
              <AvatarImage src={website.logo} alt={website.title} />
              <AvatarFallback>{website.title.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-lg font-medium">{website.title}</p>
              <a
                href={website.url}
                target="_blank"
                className="text-blue-600 hover:underline text-sm"
              >
                {website.url.replace("https://", "")}
              </a>
              <p className="text-muted-foreground text-sm">
                Template: {website.template}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-muted-foreground text-sm">Products</p>
              <p className="font-medium">{website.productsCount}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Visits</p>
              <p className="font-medium">{formatNumber(website.visits)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Status</p>
              <span
                className={cn(
                  "px-2 py-1 rounded-md text-xs font-semibold capitalize",
                  {
                    "bg-green-100 text-green-700": website.status === "active",
                    "bg-gray-100 text-gray-700": website.status === "inactive",
                    "bg-red-100 text-red-700": website.status === "flagged",
                  },
                )}
              >
                {website.status}
              </span>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Created</p>
              <p className="font-medium">
                {new Date(website.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Owner Info */}
        <div className="p-6 border rounded-2xl bg-white space-y-4">
          <h3 className="text-lg font-medium">Owner</h3>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={website.owner.avatar} />
              <AvatarFallback>{website.owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{website.owner.name}</p>
              <p className="text-sm text-muted-foreground">
                {website.owner.email}
              </p>
            </div>
          </div>
        </div>
      </div>
      <EditWebsiteModal
        website={{
          ...website,
          ownerEmail: "CasManny",
          ownerName: "cas@gmail.com",
        }}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default WebsiteDetailsPage;
