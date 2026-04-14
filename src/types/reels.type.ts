import { CategoryType } from "./category.type";
import { ApiResponse, UserType } from "./user.type";

export type ProductCondition = "brand_new" | "used" | "refurbished";

export interface Reel {
  _id: string;
  name: string;
  description: string;
  condition: ProductCondition;
  unitPrice: number;
  lga: string;
  state: string;
  videoUrl: string;
  seller: UserType;
  category: CategoryType;
  closedAt: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
export type ReelFilters = {
  page?: number;
  limit?: number;
  search?: string;
  seller?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: ProductCondition;
};
export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
export type ReelsResponse = ApiResponse<PaginatedData<Reel>>;
