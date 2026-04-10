import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteWebsiteTemplate,
  fetchAllWebsiteTemplates,
  createWebsiteTemplate,
  updateWebsiteTemplate,
  fetchWebsiteTemplateById,
} from "@/services/website-template.service";
import {
  WebsiteTemplateResponse,
  WebsiteTemplate,
} from "@/types/website-template.type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useWebsiteTemplates = (id?: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, error } = useQuery<WebsiteTemplateResponse>({
    queryKey: ["website-templates"],
    queryFn: fetchAllWebsiteTemplates,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: singleTemplateData, isLoading: isFetchingSingle } = useQuery({
    queryKey: ["website-template", id],
    queryFn: () => fetchWebsiteTemplateById(id!),
    enabled: !!id,
  });

  const { mutate: createTemplate, isPending: isCreating } = useMutation({
    mutationFn: createWebsiteTemplate,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["website-templates"] });
      toast.success(res.message);
      router.push("/website");
    },
    onError: (error: any) => toast.error(error?.message),
  });

  const { mutate: editTemplate, isPending: isUpdating } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<WebsiteTemplate>;
    }) => updateWebsiteTemplate(id, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["website-templates"] });
      queryClient.invalidateQueries({ queryKey: ["website-template", id] });
      toast.success(res.message);
      router.push("/website");
    },
    onError: (error: any) => toast.error(error?.message),
  });

  const { mutateAsync: deleteTemplate, isPending: isDeleting } = useMutation({
    mutationFn: deleteWebsiteTemplate,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["website-templates"] });
      toast.success(res.message);
    },
    onError: (error: any) => toast.error(error?.message),
  });

  return {
    templates: data?.entity || [],
    template: singleTemplateData?.entity,
    isLoading,
    isFetchingSingle,
    createTemplate,
    isCreating,
    editTemplate,
    isUpdating,
    deleteTemplate,
    isDeleting,
    error,
  };
};
