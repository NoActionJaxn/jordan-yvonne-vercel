import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import type { SanitySEO } from "./sanity";

export interface SiteSettings {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  logo: SanityImageSource;
  alternateLogo: SanityImageSource;
  favicon: SanityImageSource;
}

export interface LandingPage {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  page_title: string;
  description: PortableTextBlock[];
  seo: SanitySEO;
  favicon: SanityImageSource
}