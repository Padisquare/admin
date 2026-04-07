export type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  productCount: number;
  createdAt: string;
  updatedAt: string;
  childCategories: (CategoryType | string)[];
  description?: string;
  parentCategory?: CategoryType | string | null;
};

export type CategoriesResponse = {
  title: string;
  message: string;
  entity: CategoryType[];
};
