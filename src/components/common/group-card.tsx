"use client";
import { satoshi } from "@/fonts";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useModalContext } from "@/contexts/ModalContext";

export const GroupCard = () => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("clicked");
  };
  return (
    <Link
      href="/padis/group-name"
      className={cn("flex items-center gap-2", satoshi.className)}
    >
      <span className="bg-password-toggle-btn flex h-10 w-10 items-center justify-center shrink-0 text-brand-main rounded-full p-2">
        <Image
          src="/LogoIcon.svg"
          alt="Group"
          width={18}
          height={18}
          className="w-full h-full object-cover"
        />
      </span>
      <span>
        <span className="text-base font-bold text-color-11">
          Car Padi Group
        </span>
        <button
          className="text-xs font-[900] flex items-center cursor-pointer text-brand-main"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick(e)}
        >
          <Plus strokeWidth={3.5} className="w-3 h-3" />
          <span>Join Group</span>
        </button>
      </span>
    </Link>
  );
};

export const CreateGroupCard = () => {
  const { handleToggle } = useModalContext();

  return (
    <button
      type="button"
      className={cn(
        "flex items-center cursor-pointer gap-2",
        satoshi.className
      )}
      onClick={() =>
        handleToggle?.({
          name: "CREATE_GROUP_MODAL",
          data: null,
          state: true,
          type: "modal",
        })
      }
    >
      <span className="bg-password-toggle-btn text-brand-main rounded-full p-2">
        <Plus strokeWidth={2.5} />
      </span>
      <span className="text-base font-bold text-auth-or-text">
        Create New Group
      </span>
    </button>
  );
};

export const GroupCardWithDescription = () => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("clicked");
  };

  return (
    <Link
      href="/padis/group-name"
      className={cn(
        "py-3 border-b hover:bg-slate-50 cursor-pointer",
        satoshi.className
      )}
    >
      <div className="flex items-center justify-between gap-3 mb-3 py-3">
        <div className="flex items-start gap-3">
          <Avatar className={cn("w-10 h-10")}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className="bg-green-200 border-[0.4px] text-black text-base font-[900] border-green-300">
              CN
            </AvatarFallback>
          </Avatar>
          <div className="">
            <h5 className={cn("font-[900] text-[20px] text-color-11 mb-1")}>
              Footwear College
            </h5>
            <div className="flex items-center gap-1">
              <span className="text-[13px] font-medium">Followers</span>
              <span className="h-1 w-1 rounded-full bg-color-41" />
              <span className="text-base font-[900]">10,204</span>
            </div>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick(e)}
          className={cn(
            "bg-color-24 text-xs font-[900] border hover:bg-brand-main hover:text-white border-brand-main text-brand-main h-[45px] w-fit min-w-[105px] rounded-full",
            satoshi.className
          )}
        >
          <Plus strokeWidth={3.5} size={9} />
          <span>Join Group</span>
        </Button>
      </div>
      <div className="pl-4 border-l-2 border-brand-main">
        <h6 className="text-xs font-bold mb-2">GROUP DESCRIPTION</h6>
        <p className="text-sm text-color-8 line-clamp-1">
          Lorem ipsum dolor sit amet consectetur. A et elementum enim pulvinar
          ac fringilla. Volutpat odio morbi sit gravida posuere et imp er diet
          lectus ut. Vel ornare tincidunt justo aliquam donec quisque aliquam.
          Proin consectetur eget pretium pharetra nulla felis id. Integer amet
          amet in tellus amet. Lectus egestas aliquam blandit sem sed. View More
          Diam etiam a amet eget dignissim condimentum phasellus tincidunt.
        </p>
      </div>
    </Link>
  );
};
