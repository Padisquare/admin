"use client";
import CustomPagination from "@/components/common/custom-pagination";
import { CustomTable } from "@/components/common/custom-table";
import { adminsTableColumns } from "@/components/setting/admin-column";
import AdminInvite from "@/components/setting/admin-invite";
import { Badge } from "@/components/ui/badge";
import { adminsData } from "@/constants/data";
import React from "react";

const ManageAdminHomepage = () => {
  return (
    <div className="bg-white w-full">
      <div className="flex justify-between items-center p-5">
        <div className="space-y-1">
          <p>System access control and permissions overview.</p>
          <div className="flex items-center gap-1">
            <Badge className="bg-[#006B2C1A] font-bold text-[#006B2C]">
              12 Active Admins
            </Badge>
            <Badge className="text-[#3E4A3E] bg-[#DFE4E1] font-bold">
              4 Roles Defined
            </Badge>
          </div>
        </div>
        <AdminInvite />
      </div>
      <CustomTable
        data={adminsData}
        columns={adminsTableColumns}
        loading={false}
      />
      <div className="flex justify-between items-center w-full bg-[#F0F5F2] p-2">
        <p className="w-full font-semibold">showing 5 of 12 admins</p>
        <CustomPagination
          handleNextPage={() => {}}
          handlePreviousPage={() => {}}
        />
      </div>
    </div>
  );
};

export default ManageAdminHomepage;
