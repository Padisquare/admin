"use client";
import CustomButton from "@/components/common/custom-button";
import CustomPagination from "@/components/common/custom-pagination";
import { CustomTable } from "@/components/common/custom-table";
import { adminsTableColumns } from "@/components/setting/admin-column";
import AdminInvite from "@/components/setting/admin-invite";
import CreateWebsiteTemplate from "@/components/setting/create-website-template";
import { Input } from "@/components/ui/input";
import { adminsData } from "@/constants/data";
import { Search } from "lucide-react";

const SettingsHomepage = () => {
  return (
    <section className="space-y-5 ">
      <div className=" w-full flex justify-between">
        <div className="flex items-center gap-2 w-full max-w-md">
          <Input placeholder="Search Admin by name..." className="flex-1" />
          <CustomButton label="Search" leftIcon={<Search />} type="button" />
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
