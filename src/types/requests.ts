import type { BlocksContent } from "@strapi/blocks-react-renderer";
import type { StrapiSeo, StrapiAsset, StrapiCallToAction, StrapiMeta } from "./strapi";

export interface SiteInfo {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title?: string;
  seo?: StrapiSeo;
  favicon?: StrapiAsset;
  logo?: StrapiAsset;
  logo_alt?: StrapiAsset;
};

export interface Menu {
  id: number;
  menu_items: StrapiCallToAction[];
};

export interface Socials {
  id: number;
  menu_items: StrapiCallToAction[];
};

export interface LandingPage {
  id: number;
  documentId: string;
  page_title: string;
  title: string;
  description?: BlocksContent;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo?: StrapiSeo;
};

export interface CostumePage {
  id: number;
  documentId: string;
  page_title: string;
  title: string;
  description?: BlocksContent;
  resume?: StrapiAsset;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo?: StrapiSeo;
}

export interface CostumeList {
  data: CostumeItem[];
  meta: StrapiMeta;
}

export interface CostumeItem {
  id: number;
  documentId: string;
  title: string
  slug: string;
  description?: BlocksContent;
  media?: StrapiAsset[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo?: StrapiSeo;
}

export interface ActorPage {
  id: number;
  documentId: string;
  page_title: string;
  title: string;
  description?: BlocksContent;
  resume?: StrapiAsset;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo?: StrapiSeo;
}

export interface IllustratorPage {
  id: number;
  documentId: string;
  page_title: string;
  title: string;
  description?: BlocksContent;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo?: StrapiSeo;
}