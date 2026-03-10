import { CreateCommentDto, LikeFeedDto } from "@/types/feed.type";
import { requestHandler } from "@/utils/requestHandler";
import { cache } from "react";

export const fetchFeedsRequest = cache(
  async (page: number, limit: number, isRequest = false) => {
    return await requestHandler(
      "get",
      `/feed?page=${page}&limit=${limit}${
        isRequest ? "&type=product_request" : ""
      }`
    );
  }
);

export const fetchProductRequestsFeedsRequest = cache(
  async (page: number, limit: number) => {
    return await requestHandler(
      "get",
      `/product-requests?page=${page}&limit=${limit}`
    );
  }
);

export const fetchComments = cache(
  async (
    feedId: string,
    type: "product" | "product_request",
    page: number,
    limit: number
  ) => {
    return await requestHandler(
      "get",
      `/engagement/comments/${type}/${feedId}?page=${page}&limit=${limit}`
    );
  }
);

export const likeFeedRequest = cache(async (data: LikeFeedDto) => {
  return await requestHandler("post", "/engagement/like", data);
});

export const createComment = cache(async (data: CreateCommentDto) => {
  return await requestHandler("post", "/engagement/comment", data);
});

export const deleteComment = async (commentId: string) => {
  return await requestHandler("delete", `/engagement/comment/${commentId}`);
};
