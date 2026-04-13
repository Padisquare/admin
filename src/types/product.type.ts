import { UserType } from "./user.type";

export type ProductsQuery = {
  condition?: string;
  lga?: string;
  minPrice?: number;
  maxPrice?: number;
  state?: string;
  search?: string;
};

export type UseGetProductsProps = {
  params?: {
    condition?: string;
    lga?: string;
    state?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
  };
  page?: number;
  limit?: number;
};

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

type Category = {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  parentCategory?: Category;
};

type Seller = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  condition: "brand_new" | "used";
  unitPrice: number;

  state: string;
  lga: string;

  packshots: string[];

  averageRating: number;
  ratingCount: number;
  commentCount: number;
  likeCount: number;
  repostCount: number;
  isLiked: boolean;

  category: Category;
  seller: Seller;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProductsResponse = {
  entity: {
    items: Product[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: string;
    page: string;
    pages: string;
    total: number;
  };
};

export type ProductResponse = {
  entity: Product;
};
