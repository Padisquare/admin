import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllWebsites,
  deleteWebsite,
  restoreWebsite,
} from "@/services/website.service";
import { WebsiteFilters, WebsiteResponse } from "@/types/website.type";
import { toast } from "sonner";

export const useWebsites = (filters: WebsiteFilters = {}) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, isFetching } = useQuery<WebsiteResponse>({
    queryKey: ["websites", filters.page, filters.limit, filters.search],
    queryFn: () => fetchAllWebsites(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { mutateAsync: removeWebsite, isPending: isDeleting } = useMutation({
    mutationFn: deleteWebsite,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["websites"] });
      toast.success(res?.message);
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });

  const { mutateAsync: recoverWebsite, isPending: isRestoring } = useMutation({
    mutationFn: restoreWebsite,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["websites"] });
      toast.success(res?.message);
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });

  return {
    websites: data?.items || [],
    pagination: {
      total: data?.total || 0,
      pages: data?.pages || 1,
      page: data?.page || 1,
      hasNextPage: data?.hasNextPage,
      hasPrevPage: data?.hasPrevPage,
    },
    isLoading,
    isFetching,
    isDeleting,
    isRestoring,
    error,
    removeWebsite,
    recoverWebsite,
  };
};
