"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllUsers,
  fetchUserByIdRequest,
  deleteUserByIdRequest,
  deactivateUserByIdRequest,
  activateUserByIdRequest,
  recheckUserVerificationRequest,
} from "@/services/user.service";
import { toast } from "sonner";
import {
  DeleteUserResponse,
  RecheckVerificationResponse,
  UserResponse,
} from "@/types/user.type";

export const useUsersQuery = (page: number, search?: string) => {
  return useQuery({
    queryKey: ["users", page, search],
    queryFn: () => fetchAllUsers(page, 25, search),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUserByIdQuery = (userId: string) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUserByIdRequest(userId),
    enabled: !!userId,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserByIdRequest,
    onSuccess: (response: DeleteUserResponse) => {
      toast.success(response?.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete user");
    },
  });
};

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deactivateUserByIdRequest,

    onSuccess: (response: UserResponse) => {
      toast.success(response?.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to deactivate user");
    },
  });
};

export const useReactivateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateUserByIdRequest,

    onSuccess: (response: UserResponse) => {
      toast.success(response?.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to reactivate user");
    },
  });
};

export const useRecheckVerification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: recheckUserVerificationRequest,

    onSuccess: (response: RecheckVerificationResponse) => {
      toast.success(response?.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to recheck verification");
    },
  });
};
