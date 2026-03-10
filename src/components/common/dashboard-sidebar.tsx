"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import {
  ClipboardList,
  Film,
  Globe,
  LayoutDashboard,
  Package,
  Settings,
  Users
} from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  // {
  //   title: "Analytics",
  //   url: "/analytics",
  //   icon: BarChart3,
  // },
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Product Requests",
    url: "/product-requests",
    icon: ClipboardList,
  },
  {
    title: "Reels",
    url: "/reels",
    icon: Film,
  },
  {
    title: "Website",
    url: "/website",
    icon: Globe,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="py-5">
        <Image
          src="/padisquare-logo.svg"
          width={200}
          height={40}
          alt="Padisquare Logo"
          className="opacity-90"
        />
      </SidebarHeader>

      <div className="px-4 py-2">
        <SidebarSeparator className="opacity-10 text-[#5D6B68]" />
      </div>

      <SidebarContent>
        <SidebarGroupContent>
          <SidebarGroup>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "py-6",
                      pathname === item.url && "!bg-brand-blue !text-black",
                    )}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon className="!size-8" />
                      <span className="text-xl font-medium tracking-tight">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
