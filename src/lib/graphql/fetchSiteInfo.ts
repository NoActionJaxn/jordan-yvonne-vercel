import { gql } from "@apollo/client";
import type { MediaAsset } from "../../types/strapi";

export interface SiteInfo {
  createdAt: string;
  favicon?: MediaAsset;
  logo?: MediaAsset;
  logo_alt?: MediaAsset;
  publishedAt: string;
  title?: string;
  under_construction: boolean;
  updatedAt: string;
}

export interface SiteInfoQueryData {
  siteInfo: SiteInfo;
}

export const fetchSiteInfoQuery = gql`
query SiteInfo {
  siteInfo {
    createdAt
    favicon {
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
    logo {
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
    logo_alt {
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
    publishedAt
    title
    under_construction
    updatedAt
  }
}`;
