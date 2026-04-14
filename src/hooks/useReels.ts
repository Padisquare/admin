import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteReel, fetchAllReels } from "@/services/reels.service";
import { ReelFilters, ReelsResponse } from "@/types/reels.type";
import { toast } from "sonner";

export const useReels = (filters: ReelFilters = {}) => {
  const queryClient = useQueryClient();
  const {
    data,
    isPending: isLoading,
    isError,
    error,
    isPlaceholderData,
  } = useQuery<ReelsResponse>({
    queryKey: ["reels", filters],
    queryFn: () => fetchAllReels(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const reels = data?.entity?.items || [];
  const pagination = data?.entity
    ? {
        total: data.entity.total,
        pages: data.entity.pages,
        page: data.entity.page,
        hasNextPage: data.entity.hasNextPage,
        hasPrevPage: data.entity.hasPrevPage,
      }
    : null;

  const { mutate: Delete, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => DeleteReel(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["reels"] });
      toast.success(res.message);
    },
    onError: (err: any) => {
      toast.error(err?.message);
    },
  });
  return {
    reels,
    pagination,
    isLoading,
    isError,
    error: error as any,
    isPlaceholderData,
    Delete,
    isDeleting,
  };
};
