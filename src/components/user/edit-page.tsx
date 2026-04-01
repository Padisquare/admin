"use client";

import { useUserByIdQuery, useUsersQuery } from "@/hooks/useUser";
import UserForm from "@/components/user/user-form";
import { UserType } from "@/types/user.type";

export default function EditUserClient({ userId }: { userId: string }) {
    const { data: usersData } = useUsersQuery(1);
    const cachedUser = usersData?.entity?.items?.find(
        (u: UserType) => u.id === userId
    );
    const { data, isPending } = useUserByIdQuery(userId);
    const user = cachedUser || data?.entity;

    if (!user && isPending) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <div>User not found</div>;
    }

    const defaultValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
    };

    return (
        <div className="bg-white p-6 rounded-lg space-y-6 max-w-lg w-full place-self-center">
            <div>
                <h1 className="text-xl font-semibold">Edit User</h1>
                <p className="text-sm text-muted-foreground"> Update user information </p>
            </div>
            <UserForm mode="edit" userId={userId} defaultValues={defaultValues} />
        </div>
    );
}