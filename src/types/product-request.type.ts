import { UserType } from "./user.type";
export type ItemCondition = "brand_new" | "like_new" | "used"; // API uses underscores

export type ProductRequest = {
  _id: string;
  name: string;
  description: string;
  condition: ItemCondition;
  state: string;
  lga: string;
  packshots: string[];
  requester: UserType;
  likeCount: number;
  commentCount: number;
  repostCount: number;
  isLiked: boolean;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProductRequestFilters = {
  page?: number;
  limit?: number;
  search?: string;
  requester?: string;
  state?: string;
};

export type ProductRequestResponse = {
  title: string;
  message: string;
  entity: {
    items: ProductRequest[];
    page: string;
    limit: string;
    pages: number;
    total: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};
