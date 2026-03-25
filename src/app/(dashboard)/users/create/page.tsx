import UserForm from "@/components/user/user-form";

export default function CreateUserPage() {
    return (
        <div className="bg-white p-6 rounded-lg space-y-6 max-w-lg w-full place-self-center">
            <div>
                <h1 className="text-xl font-semibold">Create User</h1>
                <p className="text-sm text-muted-foreground">
                    Create new user
                </p>
            </div>
            <UserForm mode="create" />
        </div>
    )
}