"use client";

import { useCallback, useEffect } from "react";
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
    const currentSearch = searchParams.get("search") || "";

    const { data, isPending } = useUsersQuery(currentPage, currentSearch);

    const users = data?.entity?.items || [];
    const totalPages = data?.entity?.pages || 1;
    const hasNextPage = currentPage < totalPages;

    useEffect(() => {
        if (hasNextPage) {
            queryClient.prefetchQuery({
                queryKey: ["users", currentPage + 1, currentSearch],
                queryFn: () => fetchAllUsers(currentPage + 1, 25, currentSearch),
            });
        }
    }, [currentPage, hasNextPage, currentSearch, queryClient]);

    const handleSearch = useCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term === (searchParams.get("search") || "")) return;
        if (term) {
            params.set("search", term);
            params.set("page", "1");
        } else {
            params.delete("search");
        }
        router.push(`${pathname}?${params.toString()}`);
    }, [searchParams, pathname, router]);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="space-y-6 bg-white p-3 sm:p-6 rounded-lg">
            <UserHeader onSearch={handleSearch} />
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