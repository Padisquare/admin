import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCategoriesRequest,
  createCategoryRequest,
  updateCategoryRequest,
  deleteCategoryRequest,
} from "@/services/category.service";
import { toast } from "sonner";

export const useCategories = () => {
  const queryClient = useQueryClient();
  const { data, isPending: isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoriesRequest,
  });
  const categories = data?.entity || [];

  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: createCategoryRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: deleteCategoryRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(data?.message);
    },
    onError: (error: any) => toast.error(error.message),
  });

  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: updateCategoryRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(data?.message);
    },
    onError: (error: any) => toast.error(error.message || "Update failed"),
  });

  return {
    categories,
    isLoading,
    createCategory,
    isCreating,
    deleteCategory,
    isDeleting,
    updateCategory,
    isUpdating,
  };
};
