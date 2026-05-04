"use client"

import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import CustomInput from "@/components/common/custom-input"
import CustomTextArea from "@/components/common/custom-textarea"
import CustomButton from "@/components/common/custom-button"
import { CustomSelect, type CustomSelectOption } from "@/components/common/custom-select"
import { ProductRequest } from "@/types/product-request.type"
import { editProductRequest } from "@/services/product-request.service"

const conditionOptions: CustomSelectOption[] = [
    { value: "brand_new", label: "Brand new" },
    { value: "like_new", label: "Like new" },
    { value: "used", label: "Used" },
]

const productRequestEditSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    state: z.string().min(1, "State is required"),
    lga: z.string().min(1, "LGA is required"),
    condition: z.enum(["brand_new", "like_new", "used"]),
    packshotsText: z.string(),
})

type FormValues = z.infer<typeof productRequestEditSchema>

function packshotsFromText(text: string): string[] {
    return text
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
}

type Props = {
    requestId: string
    defaultValues: ProductRequest
}

export default function ProductRequestForm({ requestId, defaultValues }: Props) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const initialFormValues = useMemo<FormValues>(
        () => ({
            name: defaultValues.name,
            description: defaultValues.description,
            state: defaultValues.state,
            lga: defaultValues.lga,
            condition: defaultValues.condition,
            packshotsText: defaultValues.packshots?.join("\n") ?? "",
        }),
        [defaultValues],
    )

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(productRequestEditSchema),
        defaultValues: initialFormValues,
    })

    const conditionValue = watch("condition")
    const conditionOption = conditionOptions.find((o) => o.value === conditionValue)

    useEffect(() => {
        reset(initialFormValues)
    }, [initialFormValues, reset])

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true)
        try {
            const payload = {
                name: data.name,
                description: data.description,
                state: data.state,
                lga: data.lga,
                condition: data.condition,
                packshots: packshotsFromText(data.packshotsText),
            }
            const res = await editProductRequest(requestId, payload)
            toast.success(
                typeof res?.message === "string" ? res.message : "Request updated",
            )
            router.push("/product-requests")
        } catch (err: unknown) {
            const message =
                err && typeof err === "object" && "message" in err
                    ? String((err as { message: unknown }).message)
                    : "Failed to update request"
            toast.error(message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-4">
            <CustomInput
                name="name"
                label="Product name"
                type="text"
                placeholder="Product name"
                register={register}
                error={errors.name?.message}
                required
            />
            <CustomTextArea
                name="description"
                label="Description"
                placeholder="Describe the product request"
                register={register}
                error={errors.description?.message}
                required
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <CustomInput
                    name="state"
                    label="State"
                    type="text"
                    placeholder="State"
                    register={register}
                    error={errors.state?.message}
                    required
                />
                <CustomInput
                    name="lga"
                    label="LGA"
                    type="text"
                    placeholder="Local government area"
                    register={register}
                    error={errors.lga?.message}
                    required
                />
            </div>
            <CustomSelect
                label="Condition"
                name="condition"
                options={conditionOptions}
                value={conditionOption}
                onChange={(newValue) => {
                    const selected = newValue as CustomSelectOption
                    if (selected?.value) {
                        setValue("condition", selected.value as FormValues["condition"], {
                            shouldValidate: true,
                            shouldDirty: true,
                        })
                    }
                }}
                error={errors.condition?.message}
                height="50px"
            />
            <CustomTextArea
                name="packshotsText"
                label="Packshot URLs (one per line)"
                placeholder="https://..."
                register={register}
                error={errors.packshotsText?.message}
            />
            <CustomButton
                type="submit"
                label="Save changes"
                variant="primary"
                isLoading={isSubmitting}
                disabled={isSubmitting}
            />
        </form>
    )
}
