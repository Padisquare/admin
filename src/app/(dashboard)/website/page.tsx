"use client";
import { CustomTable } from "@/components/common/custom-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { websitesTableColumns } from "@/components/website/website-column";
import WebsitesOverview from "@/components/website/website-overview";
import { websitesDummyData } from "@/constants/data";
import { Search } from "lucide-react";

const WebsiteHomepage = () => {
  return (
    <section className="space-y-5">
      <WebsitesOverview />
      <div className="bg-white p-5 rounded-t-2xl">
        <div className="flex items-center gap-2 w-full max-w-md">
          <Input
            placeholder="Search websites by title, URL, or owner..."
            className="flex-1"
          />
          <Button>
            <Search className="h-4 w-4 text-muted-foreground text-white" />
            Search
          </Button>
        </div>
        <CustomTable
          data={websitesDummyData}
          columns={websitesTableColumns}
          loading={false}
          emptyState={{
            title: "No Website Found",
            message: "No website add yet. Add one Now",
          }}
        />
      </div>
    </section>
  );
};

export default WebsiteHomepage;
