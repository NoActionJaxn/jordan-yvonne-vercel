import {
  MENU_ITEMS_QUERY,
  SOCIAL_LINKS_QUERY,
  DEFAULT_SEO_QUERY,
  SITE_SETTINGS_QUERY,
  LANDING_PAGE_QUERY,
  COSTUME_PAGE_QUERY,
  COSTUMES_QUERY,
  TOTAL_COSTUMES_QUERY,
  COSTUME_BY_SLUG_QUERY,
  COSTUME_PAGE_SEO_QUERY
} from "./constants/requests";
import type { SanityCallToAction, SanitySEO } from "../types/sanity";
import { client } from "./client";
import { handleRequestError } from "./util/handleRequestError";
import type { Costume, CostumePage, LandingPage, SiteSettings } from "../types/requests";

export async function fetchMenuItems() {
  return await client.fetch<SanityCallToAction[]>(MENU_ITEMS_QUERY).catch(handleRequestError);
}

export async function fetchSocialLinks() {
  return await client.fetch<SanityCallToAction[]>(SOCIAL_LINKS_QUERY).catch(handleRequestError);
}

export async function fetchDefaultSEO() {
  return await client.fetch<SanitySEO>(DEFAULT_SEO_QUERY).catch(handleRequestError);
}

export async function fetchSiteSettings() {
  return await client.fetch<SiteSettings>(SITE_SETTINGS_QUERY).catch(handleRequestError);
}

export async function fetchLandingPage() {
  return await client.fetch<LandingPage>(LANDING_PAGE_QUERY).catch(handleRequestError);
}

export async function fetchCostumePage() {
  return await client.fetch<CostumePage>(COSTUME_PAGE_QUERY).catch(handleRequestError);
}

export async function fetchCostumes() {
  const url = new URLSearchParams(window.location.search);
  const pageCount = Math.max(1, Number(url?.get("pageCount") ?? "1"));
  const limit = Math.max(1, Number(url?.get("limit") ?? "5"))

  return await client.fetch<Costume[]>(COSTUMES_QUERY, { limit: pageCount * limit }).catch(handleRequestError);
}

export async function fetchCostumeCount() {
  return await client.fetch<number>(TOTAL_COSTUMES_QUERY).catch(handleRequestError);
}

export async function fetchCostumePageSEO() {
  return await client.fetch<SanitySEO>(COSTUME_PAGE_SEO_QUERY).catch(handleRequestError);
}

export async function fetchCostumeBySlug(slug: string) {
  return await client.fetch<Costume>(COSTUME_BY_SLUG_QUERY, { slug }).catch(handleRequestError);
}
