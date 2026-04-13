export type WebsiteTemplate = "minimal" | "modern" | "classic";

export type WebsiteFormType = {
  title: string;
  subdomain: string;
  template: WebsiteTemplate;
  logo: string;
  heroImage: string;
};

export type Website = {
  id: string;
  _id: string;
  userId: string;
  title: string;
  subdomain: string;
  url: string;
  template: string;
  logo: string;
  heroImage: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type WebsiteResponse = {
  items: Website[];
  total: number;
  page: number;
  pages: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type WebsiteFilters = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  state?: string;
  lga?: string;
};
