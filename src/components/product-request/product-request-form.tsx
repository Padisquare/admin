"use client"
import { useRouter } from "next/navigation"
import { ProductRequest, RequestStatus } from "@/app/(dashboard)/product-requests/page"
import { CustomSelect, CustomSelectOption } from "../common/custom-select"
import CustomInput from "../common/custom-input"
import CustomButton from "../common/custom-button"
import { useState } from "react"

export default function ProductRequestForm({ defaultValues }: { defaultValues: ProductRequest }) {
    const router = useRouter()
    const statusOptions: (CustomSelectOption & { value: RequestStatus })[] = [
        { value: "pending", label: "Pending Review" },
        { value: "in-progress", label: "Processing" },
        { value: "fulfilled", label: "Fulfilled" },
        { value: "canceled", label: "Canceled" },
    ]
    const [status, setStatus] = useState<{ value: RequestStatus; label: string } | undefined>(
        statusOptions.find((opt) => opt.value === defaultValues.status)
    )
    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        console.log("Updating to:", status?.value)
        router.push("/product-requests")
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <CustomSelect
                name="status"
                label="Request Status"
                options={statusOptions}
                value={status}
                onChange={(newValue) => setStatus(newValue as { value: RequestStatus; label: string })}
                height="45px"
                required
            />
            <CustomInput
                name="description"
                label="Product Description"
                placeholder="Describe the item"
                type="text"
                defaultValue={defaultValues.description}
                required
            />
            <div className="grid grid-cols-2 gap-4">
                <CustomInput
                    name="state"
                    label="State"
                    placeholder="Enter state"
                    type="text"
                    defaultValue={defaultValues.state}
                    required
                />
                <CustomInput
                    name="lga"
                    label="LGA"
                    placeholder="Enter LGA"
                    type="text"
                    defaultValue={defaultValues.lga}
                    required
                />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border flex items-center gap-4">
                <img
                    src={defaultValues.image}
                    className="h-16 w-16 object-cover rounded border bg-white"
                    alt="Current product"
                />
                <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-semibold uppercase text-gray-500">Image Reference</p>
                    <p className="text-xs text-gray-400 truncate">
                        {defaultValues.image}
                    </p>
                </div>
            </div>
            <CustomButton type="submit" label="Save Changes" className="w-full" />
        </form>
    )
}