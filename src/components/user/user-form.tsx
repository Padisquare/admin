"use client"
import { CreateUserType } from "@/types/user.type"
import CustomButton from "../common/custom-button"
import CustomInput from "../common/custom-input"
import { useUserForm } from "@/hooks/useUserform"
import { CheckCircle, Loader2, UserIcon } from "lucide-react"

type UserFormProps = {
    mode: "create" | "edit"
    userId?: string
    defaultValues?: Partial<CreateUserType>;
}
export default function UserForm({ mode, userId, defaultValues }: UserFormProps) {
    const {
        register,
        handleSubmit,
        errors,
        onSubmit,
        isEdit,
        isCheckingUsername,
        isUsernameTaken,
        isLoading,
    } = useUserForm(mode, userId, defaultValues);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-4">
            <CustomInput
                name="firstName"
                label="First Name"
                type="text"
                placeholder="Enter first name "
                register={register}
                error={errors.firstName?.message}
                required
            />
            <CustomInput
                name="lastName"
                label="Last Name"
                type="text"
                placeholder="Enter last name"
                register={register}
                error={errors.lastName?.message}
            />
            <div>
                <CustomInput
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="Enter username"
                    register={register}
                    error={errors.username?.message}
                    icon={
                        isCheckingUsername ? (
                            <Loader2
                                className="h-4 w-4 text-brand-main animate-spin"
                                strokeWidth={3}
                            />
                        ) : !isUsernameTaken && !isCheckingUsername ? (
                            <CheckCircle className="h-4 w-4 text-brand-main" strokeWidth={3} />
                        ) : (
                            <UserIcon className="h-4 w-4 text-destructive" />
                        )
                    }
                />
            </div>
            <CustomInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter Email"
                register={register}
                error={errors.email?.message}
            />
            <CustomInput
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                placeholder="Enter Phone number"
                register={register}
                error={errors.phoneNumber?.message}
            />
            <CustomButton
                type="submit"
                label={isEdit ? "Update User" : "Create User"}
                isLoading={isLoading}
                className="w-full"
            />

        </form>
    )
}