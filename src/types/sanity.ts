import type { SanityImageSource } from "@sanity/image-url";

export interface SanityFontAwesomeIcon {
  _key: string;
  _type: string;
  iconName: string;
  iconStyle: string;
}

export interface SanityCallToAction {
  _key: string;
  _type: string;
  label: string;
  url: string;
  prefix: string;
  icon?: SanityFontAwesomeIcon
}

export interface SanitySEO {
  _type: string;
  canonicalURL?: string;
  metaAuthor?: string;
  metaDescription: string;
  metaKeywords?: string[];
  metaImage?: SanityImageSource;
  metaLanguage?: string;
  metaCharset?: string;
  metaRobots?: string;
  metaTitle?: string;
  metaViewport?: string;
  openGraph?: SanityOpenGraph;
  structuredData?: JSON;
}

export interface SanityOpenGraph {
  _type: string;
  ogDescription?: string;
  ogImage?: SanityImageSource;
  ogSiteName?: string;
  ogTitle?: string;
  ogType?: string;
  ogUrl?: string;
}
