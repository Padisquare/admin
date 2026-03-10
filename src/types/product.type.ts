import { UserType } from "./user.type";

export type ProductType = {
  _id: string;
  name: string;
  description: string;
  condition: string;
  unitPrice?: number;
  lga: string;
  state: string;
  packshots: string[];
  seller?: UserType;
  requester?: UserType;
  category?: null | CategoryType;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  averageRating: number;
  ratingCount: number;
  shareCount: number;
  createdAt: string;
  updatedAt: string;
  closedAt: string;
};

export type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  parentCategory?: null | CategoryType | string;
  childCategories?: null | CategoryType[];
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductRatingType = {
  _id: string;
  product: string;
  user: UserType;
  score: number;
  review: string;
  createdAt: string;
  updatedAt: string;
};

export type UploadProductRequestDto = {
  name: string;
  description: string;
  state: string;
  lga: string;
  condition: string;
  packshots: string[];
};

export type UploadProductDto = UploadProductRequestDto & {
  categoryId: string;
  unitPrice: number;
};
