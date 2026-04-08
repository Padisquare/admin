export interface WebsiteTemplate {
  _id: string;
  id: string;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  slug: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteTemplateResponse {
  title: string;
  message: string;
  entity: WebsiteTemplate[];
}

export type CreateTemplatePayload = Pick<
  WebsiteTemplate,
  "name" | "description" | "image" | "isActive"
>;

export type UpdateTemplatePayload = Partial<CreateTemplatePayload> & {
  isActive?: boolean;
};
