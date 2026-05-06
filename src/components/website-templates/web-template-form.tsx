"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TemplateFormData, templateSchema } from "@/validation/webtemp.validation";
import CustomInput from "../common/custom-input";
import CustomButton from "../common/custom-button";
import CustomTextArea from "../common/custom-textarea";
import { CustomSelect, type CustomSelectOption } from "../common/custom-select";
import SingleImageUpload from "../common/single-image-upload";

interface TemplateFormProps {
    initialData?: TemplateFormData;
    onSubmit: (data: TemplateFormData) => void;
    isLoading: boolean;
    buttonLabel: string;
}
const statusOptions: CustomSelectOption[] = [
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
];

export default function TemplateForm({
    initialData,
    onSubmit,
    isLoading,
    buttonLabel,
}: TemplateFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TemplateFormData>({
        resolver: zodResolver(templateSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            image: "",
            isActive: true,
        },
    });

    const isActiveValue = watch("isActive");
    const currentStatusOption = statusOptions.find(
        (opt) => opt.value === String(isActiveValue)
    );

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-4 w-full">
            <CustomInput
                name="name"
                label="Template Name"
                type="text"
                placeholder="e.g. Modern E-commerce"
                register={register}
                error={errors.name?.message}
            />

            <CustomTextArea
                name="description"
                label="Description"
                placeholder="Describe the layout and key features..."
                register={register}
                error={errors.description?.message}
            />

            <SingleImageUpload
                label="Preview Image URL"
                name="image"
                value={watch("image")}
                width={"100%"}
                onChange={(url) => setValue("image", url)}
                error={errors?.image?.message}
                className="rounded-2xl border-dashed border-2"
            />

            <CustomSelect
                label="Template Status"
                name="isActive"
                options={statusOptions}
                value={currentStatusOption}
                onChange={(newValue) => {
                    const selected = newValue as CustomSelectOption;
                    setValue("isActive", selected.value === "true", {
                        shouldValidate: true,
                        shouldDirty: true
                    });
                }}
                error={errors.isActive?.message}
                height="50px"
            />

            <CustomButton
                type="submit"
                label={buttonLabel}
                isLoading={isLoading}
                className="w-full h-12.5 mt-2"
            />
        </form>
    );
}