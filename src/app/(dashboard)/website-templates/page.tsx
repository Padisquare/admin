"use client";
import { useState, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/common/custom-button";
import { CustomTable } from "@/components/common/custom-table";
import { Input } from "@/components/ui/input";
import { websitesTableColumns } from "@/components/website-templates/website-column";
// import WebsitesOverview from "@/components/website/website-overview";
import { useDebounce } from "@/hooks/useDebounce";
import { useWebsiteTemplates } from "@/hooks/useWebTemplates";

const WebsiteHomepage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { templates, isLoading, error } = useWebsiteTemplates();

  const filteredTemplates = useMemo(() => {
    if (!debouncedSearch.trim()) return templates;
    const lowerSearch = debouncedSearch.toLowerCase();
    return templates.filter(
      (t) =>
        t.name.toLowerCase().includes(lowerSearch) ||
        t.description.toLowerCase().includes(lowerSearch),
    );
  }, [templates, debouncedSearch]);

  return (
    <section className="space-y-6 bg-white p-3 sm:p-6 rounded-lg">
      {/* <WebsitesOverview /> */}
      <div className="flex items-center justify-between gap-5 mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search Templates..."
            className="pl-10 h-11 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <CustomButton
          type="button"
          leftIcon={<Plus className="h-4 w-4" />}
          label="Create Template"
          className="rounded-xl shadow-sm"
          onClick={() => router.push("/website-templates/create")}
        />
      </div>

      <CustomTable
        data={filteredTemplates}
        columns={websitesTableColumns}
        loading={isLoading}
        emptyState={
          error
            ? {
              title: "Error Loading Templates",
              message: error?.message,
            }
            : {
              title: searchTerm ? "No Results Found" : "No Templates Found",
              message: searchTerm
                ? `No templates match "${searchTerm}"`
                : "No website templates added yet.",
            }
        }
      />
    </section>
  );
};

export default WebsiteHomepage;
