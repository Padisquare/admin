"use client"

import { useState, useEffect } from "react"
import { ListFilter, RotateCcw, Search, X } from "lucide-react"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CustomSelect, CustomSelectOption } from "../common/custom-select"
import { ProductRequestFilters } from "@/types/product-request.type"
import CustomButton from "../common/custom-button"
import { useDebounce } from "@/hooks/useDebounce"

interface Props {
    onFilterChange: (filters: Partial<ProductRequestFilters>) => void
    currentSearch?: string
}

export default function ProductRequestHeader({ onFilterChange, currentSearch }: Props) {
    const [open, setOpen] = useState(false)

    const [search, setSearch] = useState(currentSearch || "")
    const debouncedSearch = useDebounce(search, 500)
    const [stateFilter, setStateFilter] = useState<CustomSelectOption>()

    useEffect(() => {
        onFilterChange({ search: debouncedSearch })
    }, [debouncedSearch])

    const handleApplyFilters = () => {
        onFilterChange({
            state: stateFilter?.value,
        })
        setOpen(false)
    }

    const handleReset = () => {
        setStateFilter(undefined)
        setSearch("")
        onFilterChange({ state: "", search: "" })
        setOpen(false)
    }

    const hasFilters = !!search || !!stateFilter
    const activeCount = [search, stateFilter].filter(Boolean).length

    return (
        <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between gap-4">
                <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search product requests..."
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
                    <PopoverContent className="w-80 p-5" align="end">
                        <div className="space-y-5">
                            <h4 className="text-sm font-semibold">Filter Requests</h4>
                            <CustomSelect
                                name="state"
                                label="State"
                                options={[
                                    { value: "Lagos", label: "Lagos" },
                                    { value: "Rivers", label: "Rivers" },
                                    { value: "Oyo", label: "Oyo" },
                                    { value: "Kano", label: "Kano" },
                                ]}
                                value={stateFilter}
                                onChange={(val) => setStateFilter(val as CustomSelectOption)}
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
                        <div className="flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded-md">
                            Search: {search}
                            <button
                                onClick={() => {
                                    setSearch("")
                                    onFilterChange({ search: "" })
                                }}
                            >
                                <X size={9} />
                            </button>
                        </div>
                    )}
                    {stateFilter && (
                        <div className="flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded-md">
                            {stateFilter.label}
                            <button
                                onClick={() => {
                                    setStateFilter(undefined)
                                    onFilterChange({ state: "" })
                                }}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
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
    )
}