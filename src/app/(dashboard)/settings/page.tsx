"use client";
import CustomPagination from "@/components/common/custom-pagination";
import { CustomTable } from "@/components/common/custom-table";
import { Admin, adminsTableColumns } from "@/components/setting/admin-column";
import AdminInvite from "@/components/setting/admin-invite";
import CreateWebsiteTemplate from "@/components/setting/create-website-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

export const adminsData: Admin[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "super_admin",
    status: "active",
    lastLogin: "2026-03-20T10:15:30Z",
    createdAt: "2025-01-10T08:00:00Z",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "admin",
    status: "active",
    lastLogin: "2026-03-22T14:22:10Z",
    createdAt: "2025-02-18T11:30:00Z",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    avatar: "https://i.pravatar.cc/150?img=8",
    role: "moderator",
    status: "inactive",
    lastLogin: "2026-02-10T09:00:00Z",
    createdAt: "2025-03-05T09:45:00Z",
  },
  {
    id: 4,
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    role: "admin",
    status: "suspended",
    lastLogin: "2026-01-25T18:10:00Z",
    createdAt: "2025-04-12T13:20:00Z",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@example.com",
    avatar: "https://i.pravatar.cc/150?img=15",
    role: "moderator",
    status: "active",
    lastLogin: "2026-03-23T07:50:00Z",
    createdAt: "2025-05-01T10:10:00Z",
  },
  {
    id: 6,
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    avatar: "https://i.pravatar.cc/150?img=20",
    role: "admin",
    status: "active",
    lastLogin: "2026-03-21T16:45:00Z",
    createdAt: "2025-06-14T15:00:00Z",
  },
  {
    id: 7,
    name: "James Anderson",
    email: "james.anderson@example.com",
    avatar: "https://i.pravatar.cc/150?img=25",
    role: "moderator",
    status: "inactive",
    lastLogin: "2025-12-30T12:00:00Z",
    createdAt: "2025-07-22T09:00:00Z",
  },
  {
    id: 8,
    name: "Olivia Thomas",
    email: "olivia.thomas@example.com",
    avatar: "https://i.pravatar.cc/150?img=30",
    role: "super_admin",
    status: "active",
    lastLogin: "2026-03-24T09:10:00Z",
    createdAt: "2025-08-05T14:40:00Z",
  },
  {
    id: 9,
    name: "Daniel Taylor",
    email: "daniel.taylor@example.com",
    avatar: "https://i.pravatar.cc/150?img=35",
    role: "admin",
    status: "suspended",
    lastLogin: "2026-02-01T08:25:00Z",
    createdAt: "2025-09-11T17:15:00Z",
  },
  {
    id: 10,
    name: "Isabella Moore",
    email: "isabella.moore@example.com",
    avatar: "https://i.pravatar.cc/150?img=40",
    role: "moderator",
    status: "active",
    lastLogin: "2026-03-23T20:05:00Z",
    createdAt: "2025-10-19T12:30:00Z",
  },
];

const SettingsHomepage = () => {
  return (
    <section className="space-y-5 ">
      <div className=" w-full flex justify-between">
        <div className="flex items-center gap-2 w-full max-w-md">
          <Input placeholder="Search Admin by name..." className="flex-1" />
          <Button>
            <Search className="h-4 w-4 text-white" />
            Search
          </Button>
        </div>
        <div className="gap-5 flex">
          <CreateWebsiteTemplate />
          <AdminInvite />
        </div>
      </div>
      <div className="bg-white p-5 rounded-t-2xl">
        <CustomTable
          data={adminsData}
          columns={adminsTableColumns}
          loading={false}
          emptyState={{
            title: "No Admins Found",
            message: "No admins have being added yet",
          }}
        />
        <CustomPagination
          handleNextPage={() => {}}
          handlePreviousPage={() => {}}
        />
      </div>
    </section>
  );
};

export default SettingsHomepage;
