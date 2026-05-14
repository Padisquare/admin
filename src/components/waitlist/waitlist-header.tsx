"use client";

import { useEffect, useState } from "react";
import { ListFilter, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CustomSelect, CustomSelectOption } from "../common/custom-select"
import CustomButton from "@/components/common/custom-button";
import { useDebounce } from "@/hooks/useDebounce";
import { WaitlistFilters, WaitlistRole } from "@/types/waitlist.type";

interface Props {
    onFilterChange: (filters: Partial<WaitlistFilters>) => void;
    currentSearch?: string;
}
const roleOptions: CustomSelectOption[] = [
    {
        value: "vendor",
        label: "Vendor",
    },
    {
        value: "buyer",
        label: "Buyer",
    },
];

export default function WaitlistHeader({
    onFilterChange,
    currentSearch,
}: Props) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(currentSearch || "");
    const [roleFilter, setRoleFilter] = useState<CustomSelectOption>();
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        onFilterChange({ search: debouncedSearch })
    }, [debouncedSearch])

    const handleApplyFilters = () => {
        onFilterChange({
            role: roleFilter?.value as WaitlistRole,
        });
        setOpen(false);
    };

    const handleReset = () => {
        setSearch("");
        setRoleFilter(undefined);
        onFilterChange({ search: "", role: "" as WaitlistRole, });
        setOpen(false);
    };

    const hasFilters = !!search || !!roleFilter;
    const activeCount = [search, roleFilter].filter(Boolean).length;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or email..."
                        className="pl-10 h-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <button className="relative flex items-center gap-2 h-10 px-4 border rounded-md bg-white hover:bg-muted">
                            <ListFilter className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                                Filters {hasFilters && `(${activeCount})`}
                            </span>
                            {hasFilters && (
                                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500" />
                            )}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-5" align="end">
                        <div className="space-y-5">
                            <h4 className="text-sm font-semibold">Filter Waitlist</h4>
                            <CustomSelect
                                name="role"
                                label="Role"
                                options={roleOptions}
                                value={roleFilter}
                                onChange={(val) => setRoleFilter(val as CustomSelectOption)}
                            />
                            <CustomButton
                                type="button"
                                label="Apply Filters"
                                onClick={handleApplyFilters}
                                className="w-full"
                            />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            {hasFilters && (
                <div className="flex items-center gap-2 flex-wrap">
                    {search && (
                        <FilterChip
                            label={`Search: ${search}`}
                            onRemove={() => {
                                setSearch("");
                                onFilterChange({ search: "", })
                            }}
                        />
                    )}

                    {roleFilter && (
                        <FilterChip
                            label={roleFilter.label}
                            onRemove={() => {
                                setRoleFilter(undefined);
                                onFilterChange({ role: "" as WaitlistRole, });
                            }}
                        />
                    )}
                    <button
                        onClick={handleReset}
                        className="text-xs text-red-500 font-medium ml-2"
                    >
                        Clear all
                    </button>
                </div>
            )}
        </div>
    );
}

function FilterChip({ label, onRemove, }: { label: string; onRemove: () => void; }) {
    return (
        <div className="flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded-md">
            {label}
            <button onClick={onRemove}>
                <X className="h-3 w-3" />
            </button>
        </div>
    );
}
