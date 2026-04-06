"use client";
import { Plus, Search } from "lucide-react";
import CustomButton from "../common/custom-button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const UserHeader = ({ onSearch }: { onSearch: (term: string) => void }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search by name, email, LGA..."
          className="pl-10 h-11 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <CustomButton
        type="button"
        leftIcon={<Plus className="h-4 w-4" />}
        label="Create User"
        className="rounded-xl shadow-sm"
        onClick={() => router.push("/users/create")}
      />
    </div>
  );
};

export default UserHeader;