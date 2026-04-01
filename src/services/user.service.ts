import {
  ChangeUserPasswordType,
  CreateUserType,
  UpdateUserType,
} from "@/types/user.type";
import { requestHandler } from "@/utils/requestHandler";
import { cache } from "react";

export const createUserRequest = async (data: CreateUserType) => {
  return await requestHandler("post", "/admin/users", data);
};
export const updateUserRequest = async (
  userId: string,
  data: CreateUserType,
) => {
  return await requestHandler("patch", `admin/users/${userId}`, data);
};
export const fetchUserByIdRequest = async (userId: string) => {
  return await requestHandler("get", `/users/${userId}`);
};
export const checkUsernameAvailabilityRequest = cache(
  async (username: string) => {
    return await requestHandler("get", `/users/username/${username}`);
  },
);
export const fetchAllUsers = async (page = 1, limit = 25, search?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) {
    params.append("search", search);
  }
  return await requestHandler("get", `/users?${params.toString()}`);
};
export const deleteUserByIdRequest = async (userId: string) => {
  return await requestHandler("delete", `/admin/users/${userId}`);
};
export const deactivateUserByIdRequest = async (userId: string) => {
  return await requestHandler("post", `/admin/users/${userId}/deactivate`);
};
export const activateUserByIdRequest = async (userId: string) => {
  return await requestHandler("post", `/admin/users/${userId}/activate`);
};
export const searchUsersRequest = cache(async (q: string) => {
  return await requestHandler("get", `/users?search=${encodeURIComponent(q)}`);
});

export const fetchUserProfileViaUsernameRequest = cache(
  async (username: string) => {
    return await requestHandler("get", `/users/username/${username}`);
  },
);

export const fetchUserFeedsRequest = cache(
  async (
    userId: string,
    page: number,
    limit: number,
    type = "all",
    focus = "active",
  ) => {
    return await requestHandler(
      "get",
      `/feed/for/${userId}?page=${page}&limit=${limit}${
        type === "all" ? "" : `&type=${type}`
      }${focus ? `&focus=${focus}` : ""}`,
    );
  },
);

export const followUserRequest = async (userId: string) => {
  return await requestHandler("post", `/users/${userId}/follow`, {});
};

export const unfollowUserRequest = async (userId: string) => {
  return await requestHandler("post", `/users/${userId}/unfollow`, {});
};

export const uploadUserImageRequest = async (userId: string, image: string) => {
  return await requestHandler("put", `/users/${userId}/avatar`, {
    avatarUrl: image,
  });
};

export const changeUserPasswordRequest = async (
  userId: string,
  passwordData: ChangeUserPasswordType,
) => {
  return await requestHandler("put", `/users/${userId}/password`, passwordData);
};
