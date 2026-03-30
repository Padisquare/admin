"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUserType } from "@/types/user.type";
import {
  checkUsernameAvailabilityRequest,
  createUserRequest,
  updateUserRequest,
} from "@/services/user.service";
import { useDebounce } from "@/hooks/useDebounce";
import { createUserSchema } from "@/validation/user.validation";

export const useUserForm = (
  mode: "create" | "edit",
  userId?: string,
  defaultValues?: Partial<CreateUserType>,
) => {
  const router = useRouter();
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema),
    defaultValues,
  });

  const username = watch("username");
  const debouncedUsername = useDebounce(username, 500);
  const queryClient = useQueryClient();

  const { data: usernameCheck, isFetching: isCheckingUsername } = useQuery({
    queryKey: ["username-check", debouncedUsername],
    queryFn: () => checkUsernameAvailabilityRequest(debouncedUsername),
    enabled: !!debouncedUsername && !isEdit,
    staleTime: 1000 * 60 * 5,
  });
  const isUsernameTaken = usernameCheck?.entity?.username === debouncedUsername;

  const createMutation = useMutation({
    mutationFn: createUserRequest,
    onSuccess: (response: any) => {
      toast.success(response?.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.push("/users");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: CreateUserType }) =>
      updateUserRequest(userId, data),

    onSuccess: (response: any) => {
      toast.success(response?.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.push("/users");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to update user");
    },
  });

  const onSubmit = useCallback(
    async (data: CreateUserType) => {
      if (isUsernameTaken) {
        toast.error("Username already taken");
        return;
      }
      if (isEdit && userId) {
        await updateMutation.mutateAsync({ userId, data });
      } else {
        await createMutation.mutateAsync(data);
      }
    },
    [isEdit, userId, isUsernameTaken, createMutation, updateMutation],
  );
  const handleCancel = () => router.back();
  const isLoading =
    isSubmitting || createMutation.isPending || updateMutation.isPending;
  return {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    onSubmit,
    handleCancel,
    isEdit,
    isCheckingUsername,
    isUsernameTaken,
    isLoading,
  };
};
