export interface MediaAsset {
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  ext: string | null;
  height: number | null;
  name: string;
  publishedAt: string;
  updatedAt: string;
  url: string;
  width: number | null;
}

export interface Seo {
  canonicalURL: string | null;
  id: string;
  keywords: string | null;
  metaDescription: string | null;
  metaImage: MediaAsset | null;
  metaRobots: string | null;
  metaTitle: string | null;
  metaViewport: string | null;
  openGraph: OpenGraph | null;
  structuredData: string | null;
}

export interface OpenGraph {
  ogDescription: string | null;
  ogImage: MediaAsset | null;
}
