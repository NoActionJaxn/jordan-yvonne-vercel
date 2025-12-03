import type { StrapiImage, StrapiSeo } from "./strapi";

export interface SiteInfo {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title?: string;
  seo?: StrapiSeo;
  favicon?: StrapiImage;
  logo?: StrapiImage;
  logo_alt?: StrapiImage;
};
