"use client"
import { useState } from "react"
import { ListFilter, RotateCcw } from "lucide-react"
import { Input } from "../ui/input"
import CustomButton from "../common/custom-button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CustomSelect, CustomSelectOption } from "../common/custom-select"
import { MOCK_REQUESTS } from "@/app/(dashboard)/product-requests/page"

export default function ProductRequestHeader() {
    const [open, setOpen] = useState(false)
    const [stateFilter, setStateFilter] = useState<CustomSelectOption | undefined>(undefined)
    const [statusFilter, setStatusFilter] = useState<CustomSelectOption | undefined>(undefined)
    const [categoryFilter, setCategoryFilter] = useState<CustomSelectOption | undefined>(undefined)
    const uniqueStates = Array.from(new Set(MOCK_REQUESTS.map(r => r.state)))
    const stateOptions: CustomSelectOption[] = uniqueStates.map(state => ({
        value: state,
        label: state
    }))
    const uniqueCategories = Array.from(new Set(MOCK_REQUESTS.map(r => r.category)))
    const categoryOptions: CustomSelectOption[] = uniqueCategories.map(cat => ({
        value: cat,
        label: cat
    }))
    const statusOptions: CustomSelectOption[] = [
        { value: "pending", label: "Pending" },
        { value: "in-progress", label: "In Progress" },
        { value: "fulfilled", label: "Fulfilled" },
        { value: "canceled", label: "Canceled" },
    ]
    const handleApplyFilters = () => {
        console.log("Filters applied:", { stateFilter, statusFilter, categoryFilter })
        setOpen(false)
    }
    const handleReset = () => {
        setStateFilter(undefined)
        setStatusFilter(undefined)
        setCategoryFilter(undefined)
        setOpen(false)
    }
    return (
        <div className="flex items-center justify-between gap-5 mb-8">
            <Input
                placeholder="Search product requests..."
                className="w-65 h-10 border-[#D0D5DD]"
            />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 h-10 px-4 border border-[#D0D5DD] rounded-md hover:bg-gray-50 bg-white transition-colors">
                        <ListFilter className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Filters</span>
                        {(stateFilter || statusFilter || categoryFilter) && (
                            <div className="h-1.5 w-1.5 rounded-full bg-brand-main" />
                        )}
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-5 shadow-lg" align="end">
                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm text-gray-900">Filter Requests</h4>
                            <button
                                onClick={handleReset}
                                className="flex items-center text-xs text-red-500 hover:text-red-600 font-medium"
                            >
                                <RotateCcw className="mr-1.5 h-3 w-3" />
                                Reset
                            </button>
                        </div>
                        <CustomSelect
                            name="category"
                            label="Category"
                            options={categoryOptions}
                            value={categoryFilter}
                            onChange={(val) => setCategoryFilter(val as CustomSelectOption)}
                            height="20px"
                        />
                        <CustomSelect
                            name="state"
                            label="State"
                            options={stateOptions}
                            value={stateFilter}
                            onChange={(val) => setStateFilter(val as CustomSelectOption)}
                            height="20px"
                        />
                        <CustomSelect
                            name="status"
                            label="Status"
                            options={statusOptions}
                            value={statusFilter}
                            onChange={(val) => setStatusFilter(val as CustomSelectOption)}
                            height="20px"
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
    )
}