"use client";

import CustomPagination from "@/components/common/custom-pagination";
import { CustomTable } from "@/components/common/custom-table";
import {
  adminsTableColumns,
  type Admin,
} from "@/components/setting/admin-column";
import AdminInvite from "@/components/setting/admin-invite";

const ManageAdminHomepage = () => {
  const admins: Admin[] = [];

  return (
    <div className="bg-white w-full">
      <div className="flex justify-between items-center p-5">
        <div className="space-y-1">
          <p>System access control and permissions overview.</p>
          <p className="text-sm text-muted-foreground">
            Connect an admins API to list team members here.
          </p>
        </div>
        <AdminInvite />
      </div>
      <CustomTable
        data={admins}
        columns={adminsTableColumns}
        loading={false}
        emptyState={{
          title: "No admins",
          message: "There are no administrators to display yet.",
        }}
      />
      <div className="flex justify-between items-center w-full bg-[#F0F5F2] p-2">
        <p className="w-full text-sm text-muted-foreground">
          {admins.length === 0 ? "No admins to show" : `Showing ${admins.length} admins`}
        </p>
        <CustomPagination handleNextPage={() => {}} handlePreviousPage={() => {}} />
      </div>
    </div>
  );
};

export default ManageAdminHomepage;
