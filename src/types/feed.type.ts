import { ProductType } from "./product.type";
import { UserType } from "./user.type";

export type FeedType = {
  _id: string;
  item: ProductType;
  itemType: string;
  itemId: string;
};

export type CommentType = {
  _id: string;
  userId: Partial<UserType>;
  content: string;
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
  replies: CommentType[];
  createdAt: string;
  updatedAt: string;
};

export type LikeFeedDto = {
  targetType: "product" | "product_request" | "comment";
  targetId: string;
};

export type CreateCommentDto = {
  entityType: "product" | "product_request";
  entityId: string;
  content: string;
  parentId?: string;
};
