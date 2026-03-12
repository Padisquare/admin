import DashboardNavbar from "@/components/common/dashboard-navbar";
import DashboardSidebar from "@/components/common/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

interface Props {
  children: React.ReactNode;
  analytics: React.ReactNode;
}

const DashboardRootLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col gap-5 min-h-screen w-screen bg-muted">
        <DashboardNavbar />
        <div className="px-5 flex-1 pt-5 pb-10">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardRootLayout;
