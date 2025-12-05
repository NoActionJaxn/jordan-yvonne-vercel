import type { LoaderFunctionArgs } from "react-router";
import type { SiteInfo, Socials, Menu, LandingPage, CostumePage, ActorPage, IllustratorPage, CostumeList, CostumeItem } from "../types/requests";
import { fetchLandingPage, fetchMenu, fetchSiteInfo, fetchSocials, fetchCostumePage, fetchActorPage, fetchIllustratorPage, fetchCostumeList, fetchCostumeItem } from "./requests";

export interface DefaultLayoutData {
  siteInfo: SiteInfo | null;
  menu: Menu | null;
  socials: Socials | null;
};

export const defaultLayoutLoader = async (): Promise<DefaultLayoutData> => {
  return {
    siteInfo: fetchSiteInfo,
    menu: fetchMenu,
    socials: fetchSocials,
  };
};

export interface LandingPageData {
  siteInfo: SiteInfo | null;
  landingPage: LandingPage | null;
};

export const landingPageLoader = async (): Promise<LandingPageData> => {
  return {
    siteInfo: fetchSiteInfo,
    landingPage: fetchLandingPage,
  };
};

export interface CostumingPageData {
  siteInfo: SiteInfo | null;
  costumePage: CostumePage | null;
  costumeList: CostumeList | null;
};

export const costumePageLoader = async ({ request }: LoaderFunctionArgs<any>): Promise<CostumingPageData> => {
  const url = new URL(request.url);
  const pageCount = url.searchParams.get("pageCount") ?? 1;

  return {
    siteInfo: fetchSiteInfo,
    costumePage: fetchCostumePage,
    costumeList: await fetchCostumeList(Number(pageCount)),
  };
};

export interface CostumeItemPageData {
  siteInfo: SiteInfo | null;
  costumeItem: CostumeItem | null;
};

export const costumeItemLoader = async ({ params }: LoaderFunctionArgs<any>): Promise<unknown> => {
  const { slug } = params;

  return {
    siteInfo: fetchSiteInfo,
    costumeItem: await fetchCostumeItem(slug ?? ""),
  };
};

export interface ActorPageData {
  siteInfo: SiteInfo | null;
  actorPage: ActorPage | null;
};

export const actorPageLoader = async (): Promise<ActorPageData> => {
  return {
    siteInfo: fetchSiteInfo,
    actorPage: fetchActorPage,
  };
};

export interface IllustratorPageData {
  siteInfo: SiteInfo | null;
  illustratorPage: IllustratorPage | null;
};

export const illustratorPageLoader = async (): Promise<IllustratorPageData> => {
  return {
    siteInfo: fetchSiteInfo,
    illustratorPage: fetchIllustratorPage,
  };
};