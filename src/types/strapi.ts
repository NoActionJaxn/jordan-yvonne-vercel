export interface StrapiSeo {
  id: number;
  canonicalURL?: string;
  keywords?: string;
  metaDescription: string;
  metaRobots?: string;
  metaTitle: string;
  metaViewport?: string;
  metaImage?: StrapiAsset;
  structuredData?: Record<string, unknown>;
  openGraph?: StrapiOpenGraph;
};

export interface StrapiOpenGraph {
  id: number;
  ogDescription: string;
  ogTitle: string;
  ogType?: string;
  ogURL?: string;
  ogImage?: StrapiAsset;
};

export interface StrapiAsset {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats: string | string[];
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export interface StrapiCallToAction {
  id: number;
  label?: string;
  url?: string;
  icon?: StrapiFontAwesomeIcon;
};

export interface StrapiFontAwesomeIcon {
  id: number;
  pack?: string;
  name?: string;
};

export interface StrapiMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};
