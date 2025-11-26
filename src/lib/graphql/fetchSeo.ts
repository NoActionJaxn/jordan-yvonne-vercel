import { gql } from "@apollo/client";
import type { Seo } from "../../types/strapi";

export type FetchSeoQueryVariables = Record<string, never>;

export interface SiteInfo {
  seo?: Seo;
}

export interface SeoQueryData {
  siteInfo?: SiteInfo;
}

export const fetchSeoQuery = gql`
query Seo {
  siteInfo {
    seo {
      canonicalURL
      id
      keywords
      metaDescription
      metaImage {
        alternativeText
        caption
        createdAt
        ext
        height
        name
        publishedAt
        updatedAt
        url
        width
      }
      metaRobots
      metaTitle
      metaViewport
      openGraph {
        id
        ogDescription
        ogImage {
          alternativeText
          caption
          createdAt
          ext
          height
          name
          publishedAt
          updatedAt
          url
          width
        }
      }
      structuredData
    }
  }
}`;
