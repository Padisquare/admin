export type WebsiteTemplate = "minimal" | "modern" | "classic";

export type WebsiteFormType = {
  title: string;
  subdomain: string;
  template: WebsiteTemplate;
  logo: string;
  heroImage: string;
};
