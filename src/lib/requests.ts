import { MENU_ITEMS_QUERY, SOCIAL_LINKS_QUERY, DEFAULT_SEO_QUERY, SITE_SETTINGS_QUERY, LANDING_PAGE_QUERY } from "./constants/requests";
import type { SanityCallToAction, SanitySEO } from "../types/sanity";
import { client } from "./client";
import { handleRequestError } from "./util/handleRequestError";
import type { LandingPage, SiteSettings } from "../types/requests";

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
