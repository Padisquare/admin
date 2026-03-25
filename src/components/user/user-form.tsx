"use client"
import { useRouter } from "next/navigation"
import CustomButton from "../common/custom-button"
import CustomInput from "../common/custom-input"

type UserFormProps = {
    mode: "create" | "edit"
    defaultValues?: {
        firstname?: string
        lastname?: string
        username?: string
        email?: string
    }
}

export default function UserForm({ mode, defaultValues }: UserFormProps) {
    const isEdit = mode === "edit"
    const router = useRouter()

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        router.push("/users")
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 pb-4">
            <CustomInput
                name="firstname"
                label="First Name"
                placeholder="Enter first name"
                type="text"
                defaultValue={defaultValues?.firstname}
                required
            />
            <CustomInput
                name="lastname"
                label="Last Name"
                placeholder="Enter last name"
                type="text"
                defaultValue={defaultValues?.lastname}
                required
            />
            <CustomInput
                name="username"
                label="Username"
                placeholder="Enter username"
                type="text"
                defaultValue={defaultValues?.username}
                required
            />
            <CustomInput
                name="email"
                label="Email"
                placeholder="Enter email"
                type="email"
                defaultValue={defaultValues?.email}
                required
            />
            <CustomButton
                type="submit"
                label={isEdit ? "Update User" : "Create User"}
                className="w-full"
            />
        </form>
    )
}