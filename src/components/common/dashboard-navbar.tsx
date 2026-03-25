"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AdminProfile from "./admin-profile";
import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";

const DashboardNavbar = () => {
  const pathname = usePathname();
  const pageName = pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, " ");
  return (
    <header className="w-full h-16 border-b bg-white flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-semibold tracking-tight capitalize">
          {pageName ? pageName : "Dashboard"}
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden md:flex">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search users, products..."
            className="pl-9 w-[250px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg hover:bg-muted transition">
            <Bell className="size-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full" />
          </button>

          <div className="hidden md:block">
            <AdminProfile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
