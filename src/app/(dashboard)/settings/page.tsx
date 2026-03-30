"use client";
import CustomButton from "@/components/common/custom-button";
import CustomPagination from "@/components/common/custom-pagination";
import { CustomTable } from "@/components/common/custom-table";
import { adminsTableColumns } from "@/components/setting/admin-column";
import AdminInvite from "@/components/setting/admin-invite";
import CreateWebsiteTemplate from "@/components/setting/create-website-template";
import SettingsHub from "@/components/setting/settings-hub";
import { Input } from "@/components/ui/input";
import { adminsData } from "@/constants/data";
import { Search } from "lucide-react";

const SettingsHomepage = () => {
  return (
    <section className="space-y-5 ">
      <SettingsHub />
    </section>
  );
};

export default SettingsHomepage;
