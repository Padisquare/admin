import { ChangeUserPasswordType, UpdateUserType } from "@/types/user.type";
import { requestHandler } from "@/utils/requestHandler";
import { cache } from "react";

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

export const updateUserRequest = async (
  userId: string,
  data: UpdateUserType,
) => {
  return await requestHandler("put", `/users/${userId}`, data);
};

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
