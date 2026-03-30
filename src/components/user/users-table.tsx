"use client";
import { CustomTable } from "@/components/common/custom-table";
import { usersColumns } from "./users-column";
import { UserType } from "@/types/user.type";
interface Props {
    users: UserType[];
    loading?: boolean;
}
export default function UsersTable({ users, loading }: Props) {
    return (
        <CustomTable
            data={users}
            columns={usersColumns}
            loading={loading}
            emptyState={{
                title: "No Users Found",
                message: "There are currently no users on the platform.",
            }}
        />
    );
}