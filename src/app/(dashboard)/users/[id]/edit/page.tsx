import UserForm from "@/components/user/user-form"
import { notFound } from "next/navigation"
import { MOCK_USERS } from "../../page"

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = MOCK_USERS.find((u) => u.id === id)
    if (!user) return notFound()

    return (
        <div className="bg-white p-6 rounded-lg space-y-6 max-w-lg w-full place-self-center">
            <div>
                <h1 className="text-xl font-semibold">Edit User</h1>
                <p className="text-sm text-muted-foreground">
                    Update user information
                </p>
            </div>

            <UserForm
                mode="edit"
                defaultValues={{
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                }}
            />
        </div>
    )
}