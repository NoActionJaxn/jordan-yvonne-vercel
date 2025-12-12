import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import type { SanitySEO, SanitySlug } from "./sanity";
import type { SanityFileSource } from "../lib/util/documentBuilder";

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
  pageTitle: string;
  description: PortableTextBlock[];
  seo: SanitySEO;
}

export interface CostumePage {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  pageTitle: string;
  slug: string;
  description: PortableTextBlock[];
  resumeFile: SanityFileSource;
  seo: SanitySEO;
}

export interface Costume {
  _id: string;
  _createdAt: string;
  _publishedAt: string;
  title: string;
  slug: SanitySlug;
  description: PortableTextBlock[];
  galleryImages: SanityImageSource[];
  seo: SanitySEO;
}

export interface ActingPage {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  pageTitle: string;
  description: PortableTextBlock[];
  resumeFile: SanityFileSource;
  seo: SanitySEO;
}

export interface Actor {
  _id: string;
  _createdAt: string;
  _publishedAt: string;
  title: string;
  slug: SanitySlug;
  description: PortableTextBlock[];
  galleryImages: SanityImageSource[];
  seo: SanitySEO;
}

export interface IllustrationPage {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  pageTitle: string;
  description: PortableTextBlock[];
  seo: SanitySEO;
}

export interface Illustration {
  _id: string;
  _createdAt: string;
  _publishedAt: string;
  title: string;
  slug: SanitySlug;
  description: PortableTextBlock[];
  galleryImages: SanityImageSource[];
  seo: SanitySEO;
}
