"use client";
import { User } from "@/app/(dashboard)/users/page";
import { CustomTable } from "@/components/common/custom-table";
import { usersColumns } from "./users-column";
interface Props {
    users: User[];
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