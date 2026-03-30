"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import UserHeader from "@/components/user/users-header";
import UsersTable from "@/components/user/users-table";
import CustomPagination from "@/components/common/custom-pagination";
import { useUsersQuery } from "@/hooks/useUser";
import { fetchAllUsers } from "@/services/user.service";

export default function UsersPageClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    const currentPage = Number(searchParams.get("page")) || 1;

    const { data, isPending } = useUsersQuery(currentPage);

    const users = data?.entity?.items || [];
    const totalPages = data?.entity?.pages || 1;
    const hasNextPage = currentPage < totalPages;

    useEffect(() => {
        if (hasNextPage) {
            queryClient.prefetchQuery({
                queryKey: ["users", currentPage + 1],
                queryFn: () => fetchAllUsers(currentPage + 1),
            });
        }
    }, [currentPage, hasNextPage, queryClient]);

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const handlePageChange = (newPage: number) => {
        router.push(createPageURL(newPage));
    };

    return (
        <div className="space-y-6 bg-white p-3 sm:p-6 rounded-lg">
            <UserHeader />
            <UsersTable users={users} loading={isPending} />
            <CustomPagination
                handlePreviousPage={() => {
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                handleNextPage={() => {
                    if (hasNextPage) handlePageChange(currentPage + 1);
                }}
            />
        </div>
    );
}