export type CategoryType = {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  parentCategory: string;
  childCategories: CategoryType[];
  productCount: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
};
